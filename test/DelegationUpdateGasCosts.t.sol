// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console2} from "forge-std/Test.sol";
import {DelegationRegistry} from "../src/DelegationRegistry.sol";

contract DelegationUpdateGasCostsTest is Test {
    DelegationRegistry public registry;
    
    address public owner = makeAddr("owner");
    address public user = makeAddr("user");
    address public alice = makeAddr("alice");
    address public bob = makeAddr("bob");
    address public carol = makeAddr("carol");
    address public dave = makeAddr("dave");
    address public eve = makeAddr("eve");
    address public frank = makeAddr("frank");
    address public grace = makeAddr("grace");
    
    bytes32 public constant TEST_LIST = keccak256("testList");

    function setUp() public {
        registry = new DelegationRegistry();
        
        // Create initial list with 5 delegates
        address[] memory initialDelegates = new address[](5);
        initialDelegates[0] = alice;
        initialDelegates[1] = bob;
        initialDelegates[2] = carol;
        initialDelegates[3] = dave;
        initialDelegates[4] = eve;
        
        vm.prank(owner);
        registry.setDelegationList(TEST_LIST, initialDelegates);
    }

    function test_FullOverwriteVsIncrementalUpdates() public {
        console2.log("=== Full Overwrite vs Incremental Updates ===");
        
        // Test 1: Full overwrite to add 2 new delegates
        address[] memory newList = new address[](7);
        newList[0] = alice;
        newList[1] = bob;
        newList[2] = carol;
        newList[3] = dave;
        newList[4] = eve;
        newList[5] = frank;
        newList[6] = grace;
        
        vm.prank(owner);
        uint256 overwriteGas = gasleft();
        registry.setDelegationList(TEST_LIST, newList);
        uint256 overwriteUsed = overwriteGas - gasleft();
        console2.log("Full overwrite (5->7 delegates):", overwriteUsed, "gas");
        
        // Reset to original list
        address[] memory originalList = new address[](5);
        originalList[0] = alice;
        originalList[1] = bob;
        originalList[2] = carol;
        originalList[3] = dave;
        originalList[4] = eve;
        
        vm.prank(owner);
        registry.setDelegationList(TEST_LIST, originalList);
        
        // Test 2: Incremental additions
        vm.startPrank(owner);
        uint256 incrementalGas = gasleft();
        registry.addDelegate(TEST_LIST, frank, 5); // Add at end
        registry.addDelegate(TEST_LIST, grace, 6); // Add at end
        uint256 incrementalUsed = incrementalGas - gasleft();
        vm.stopPrank();
        console2.log("Incremental add (2 delegates):", incrementalUsed, "gas");
        
        uint256 savings = incrementalUsed > overwriteUsed ? incrementalUsed - overwriteUsed : overwriteUsed - incrementalUsed;
        string memory winner = incrementalUsed < overwriteUsed ? "Incremental" : "Full overwrite";
        console2.log(winner, "is cheaper by", savings, "gas");
        console2.log("");
    }

    function test_AddDelegatePositions() public {
        console2.log("=== Add Delegate at Different Positions ===");
        
        // Test adding at beginning (most expensive - shifts all elements)
        vm.prank(owner);
        uint256 beginningGas = gasleft();
        registry.addDelegate(TEST_LIST, frank, 0);
        uint256 beginningUsed = beginningGas - gasleft();
        console2.log("Add at beginning (position 0):", beginningUsed, "gas");
        
        // Test adding at middle
        vm.prank(owner);
        uint256 middleGas = gasleft();
        registry.addDelegate(TEST_LIST, grace, 3);
        uint256 middleUsed = middleGas - gasleft();
        console2.log("Add at middle (position 3):", middleUsed, "gas");
        
        // Test adding at end (cheapest - no shifts)
        address newDelegate = makeAddr("newDelegate");
        vm.prank(owner);
        uint256 endGas = gasleft();
        registry.addDelegate(TEST_LIST, newDelegate, 7); // Current length is 7
        uint256 endUsed = endGas - gasleft();
        console2.log("Add at end (position 7):", endUsed, "gas");
        console2.log("");
    }

    function test_RemoveDelegatePositions() public {
        console2.log("=== Remove Delegate at Different Positions ===");
        
        // First add some delegates to have a bigger list
        vm.startPrank(owner);
        registry.addDelegate(TEST_LIST, frank, 5);
        registry.addDelegate(TEST_LIST, grace, 6);
        vm.stopPrank();
        
        // Test removing from beginning (most expensive - shifts all elements)
        vm.prank(owner);
        uint256 beginningGas = gasleft();
        registry.removeDelegate(TEST_LIST, alice); // Remove first element
        uint256 beginningUsed = beginningGas - gasleft();
        console2.log("Remove from beginning:", beginningUsed, "gas");
        
        // Test removing from middle
        vm.prank(owner);
        uint256 middleGas = gasleft();
        registry.removeDelegate(TEST_LIST, carol); // Remove middle element
        uint256 middleUsed = middleGas - gasleft();
        console2.log("Remove from middle:", middleUsed, "gas");
        
        // Test removing from end (cheapest - no shifts)
        vm.prank(owner);
        uint256 endGas = gasleft();
        registry.removeDelegate(TEST_LIST, grace); // Remove last element
        uint256 endUsed = endGas - gasleft();
        console2.log("Remove from end:", endUsed, "gas");
        console2.log("");
    }

    function test_OverwriteVsMultipleOperations() public {
        console2.log("=== Overwrite vs Multiple Add/Remove Operations ===");
        
        // Scenario: Change 3 out of 5 delegates
        address[] memory modifiedList = new address[](5);
        modifiedList[0] = frank;  // Changed from alice
        modifiedList[1] = bob;    // Same
        modifiedList[2] = grace;  // Changed from carol
        modifiedList[3] = dave;   // Same
        modifiedList[4] = alice;  // Changed from eve
        
        // Test 1: Full overwrite
        vm.prank(owner);
        uint256 overwriteGas = gasleft();
        registry.setDelegationList(TEST_LIST, modifiedList);
        uint256 overwriteUsed = overwriteGas - gasleft();
        console2.log("Full overwrite (3 changes):", overwriteUsed, "gas");
        
        // Reset to original
        address[] memory originalList = new address[](5);
        originalList[0] = alice;
        originalList[1] = bob;
        originalList[2] = carol;
        originalList[3] = dave;
        originalList[4] = eve;
        
        vm.prank(owner);
        registry.setDelegationList(TEST_LIST, originalList);
        
        // Test 2: Multiple operations
        vm.startPrank(owner);
        uint256 operationsGas = gasleft();
        registry.removeDelegate(TEST_LIST, alice);  // Remove alice
        registry.removeDelegate(TEST_LIST, carol); // Remove carol  
        registry.removeDelegate(TEST_LIST, eve);   // Remove eve
        registry.addDelegate(TEST_LIST, frank, 0); // Add frank at beginning
        registry.addDelegate(TEST_LIST, grace, 2); // Add grace at position 2
        registry.addDelegate(TEST_LIST, alice, 4); // Add alice at end
        uint256 operationsUsed = operationsGas - gasleft();
        vm.stopPrank();
        console2.log("Multiple operations (3 removes + 3 adds):", operationsUsed, "gas");
        
        uint256 savings = operationsUsed > overwriteUsed ? operationsUsed - overwriteUsed : overwriteUsed - operationsUsed;
        string memory winner = operationsUsed < overwriteUsed ? "Multiple operations" : "Full overwrite";
        console2.log(winner, "is cheaper by", savings, "gas");
        console2.log("");
    }

    function test_ListSizeImpactOnOperations() public {
        console2.log("=== List Size Impact on Operations ===");
        
        // Create lists of different sizes and test add/remove costs
        uint256[] memory sizes = new uint256[](3);
        sizes[0] = 10;
        sizes[1] = 25;
        sizes[2] = 50;
        
        for (uint256 i = 0; i < sizes.length; i++) {
            bytes32 listId = keccak256(abi.encodePacked("sizeTest", i));
            
            // Create list of specified size
            address[] memory delegates = new address[](sizes[i]);
            for (uint256 j = 0; j < sizes[i]; j++) {
                delegates[j] = makeAddr(string(abi.encodePacked("delegate", i, "_", j)));
            }
            
            vm.prank(owner);
            registry.setDelegationList(listId, delegates);
            
            // Test add at beginning (worst case)
            address newDelegate = makeAddr(string(abi.encodePacked("new", i)));
            vm.prank(owner);
            uint256 addGas = gasleft();
            registry.addDelegate(listId, newDelegate, 0);
            uint256 addUsed = addGas - gasleft();
            
            // Test remove from beginning (worst case)
            vm.prank(owner);
            uint256 removeGas = gasleft();
            registry.removeDelegate(listId, newDelegate);
            uint256 removeUsed = removeGas - gasleft();
            
            console2.log("List size:", sizes[i]);
            console2.log("Add at start:", addUsed, "gas");
            console2.log("Remove from start:", removeUsed, "gas");
        }
        console2.log("");
    }

    function test_PublicListSharing() public {
        console2.log("=== Public List Sharing Gas Costs ===");
        
        // Test user pointing to owner's list
        vm.prank(user);
        uint256 pointGas = gasleft();
        registry.pointToDelegationList(owner, TEST_LIST);
        uint256 pointUsed = pointGas - gasleft();
        console2.log("Point to delegation list:", pointUsed, "gas");
        
        // Test resolving user's delegation
        uint256 resolveGas = gasleft();
        address[] memory resolved = registry.resolveUserDelegationList(user, owner);
        uint256 resolveUsed = resolveGas - gasleft();
        console2.log("Resolve user delegation:", resolveUsed, "gas");
        console2.log("Resolved to", resolved.length, "delegates");
        console2.log("");
    }

    function test_BreakEvenAnalysis() public {
        console2.log("=== Break-even Analysis: When to Use Each Method ===");
        
        // Test different numbers of changes
        for (uint256 changes = 1; changes <= 5; changes++) {
            // Create modified list
            address[] memory modifiedList = new address[](5);
            modifiedList[0] = changes >= 1 ? frank : alice;
            modifiedList[1] = changes >= 2 ? grace : bob;
            modifiedList[2] = changes >= 3 ? makeAddr("newDelegate1") : carol;
            modifiedList[3] = changes >= 4 ? makeAddr("newDelegate2") : dave;
            modifiedList[4] = changes >= 5 ? makeAddr("newDelegate3") : eve;
            
            // Test overwrite
            vm.prank(owner);
            uint256 overwriteGas = gasleft();
            registry.setDelegationList(TEST_LIST, modifiedList);
            uint256 overwriteUsed = overwriteGas - gasleft();
            
            // Reset
            address[] memory originalList = new address[](5);
            originalList[0] = alice;
            originalList[1] = bob;
            originalList[2] = carol;
            originalList[3] = dave;
            originalList[4] = eve;
            
            vm.prank(owner);
            registry.setDelegationList(TEST_LIST, originalList);
            
            // Test individual operations (simplified - just removes and adds at end)
            vm.startPrank(owner);
            uint256 operationsGas = gasleft();
            
            for (uint256 i = 0; i < changes; i++) {
                // Remove old delegate (worst case - from beginning)
                if (i == 0 && changes >= 1) registry.removeDelegate(TEST_LIST, alice);
                if (i == 1 && changes >= 2) registry.removeDelegate(TEST_LIST, bob);
                if (i == 2 && changes >= 3) registry.removeDelegate(TEST_LIST, carol);
                if (i == 3 && changes >= 4) registry.removeDelegate(TEST_LIST, dave);
                if (i == 4 && changes >= 5) registry.removeDelegate(TEST_LIST, eve);
            }
            
            // Add new delegates at end (best case)
            uint256 currentLength = 5 - changes;
            for (uint256 i = 0; i < changes; i++) {
                if (i == 0 && changes >= 1) registry.addDelegate(TEST_LIST, frank, currentLength + i);
                if (i == 1 && changes >= 2) registry.addDelegate(TEST_LIST, grace, currentLength + i);
                if (i == 2 && changes >= 3) registry.addDelegate(TEST_LIST, makeAddr("newDelegate1"), currentLength + i);
                if (i == 3 && changes >= 4) registry.addDelegate(TEST_LIST, makeAddr("newDelegate2"), currentLength + i);
                if (i == 4 && changes >= 5) registry.addDelegate(TEST_LIST, makeAddr("newDelegate3"), currentLength + i);
            }
            
            uint256 operationsUsed = operationsGas - gasleft();
            vm.stopPrank();
            
            string memory winner = operationsUsed < overwriteUsed ? "Operations" : "Overwrite";
            uint256 savings = operationsUsed < overwriteUsed ? overwriteUsed - operationsUsed : operationsUsed - overwriteUsed;
            
            console2.log("Changes:", changes);
            console2.log("Overwrite:", overwriteUsed, "gas");
            console2.log("Operations:", operationsUsed, "gas");
            console2.log(winner, "wins by", savings, "gas");
            
            // Reset for next iteration
            vm.prank(owner);
            registry.setDelegationList(TEST_LIST, originalList);
        }
        console2.log("");
    }
}