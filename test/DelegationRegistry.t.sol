// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console2} from "forge-std/Test.sol";
import {DelegationRegistry} from "../src/DelegationRegistry.sol";

contract DelegationRegistryTest is Test {
    DelegationRegistry public registry;
    
    // Test accounts
    address public alice = makeAddr("alice");
    address public bob = makeAddr("bob");
    address public carol = makeAddr("carol");
    address public dave = makeAddr("dave");
    address public eve = makeAddr("eve");
    address public user = makeAddr("user");

    // List IDs
    bytes32 public constant DEFAULT_LIST = keccak256("default");
    bytes32 public constant LIST_DEFI = keccak256("defi");
    bytes32 public constant LIST_GAMING = keccak256("gaming");
    bytes32 public constant LIST_CLONED = keccak256("cloned");

    // Events for testing
    event DelegationListSet(address indexed account, bytes32 indexed listId, address[] delegates);

    function setUp() public {
        registry = new DelegationRegistry();
    }

    // =============================================================
    //                        BASIC FUNCTIONALITY
    // =============================================================

    function test_SetDelegationList() public {
        address[] memory delegates = new address[](3);
        delegates[0] = alice;
        delegates[1] = bob;
        delegates[2] = carol;

        vm.prank(user);
        vm.expectEmit(true, true, false, true);
        emit DelegationListSet(user, DEFAULT_LIST, delegates);
        
        registry.setDelegationList(DEFAULT_LIST, delegates);

        address[] memory storedDelegates = registry.getDelegationList(user, DEFAULT_LIST);
        assertEq(storedDelegates.length, 3);
        assertEq(storedDelegates[0], alice);
        assertEq(storedDelegates[1], bob);
        assertEq(storedDelegates[2], carol);
    }

    function test_DelegateRanking() public {
        address[] memory delegates = new address[](3);
        delegates[0] = alice;
        delegates[1] = bob;
        delegates[2] = carol;

        vm.prank(user);
        registry.setDelegationList(DEFAULT_LIST, delegates);

        assertEq(registry.getDelegateRanking(user, DEFAULT_LIST, alice), 0);
        assertEq(registry.getDelegateRanking(user, DEFAULT_LIST, bob), 1);
        assertEq(registry.getDelegateRanking(user, DEFAULT_LIST, carol), 2);
        assertEq(registry.getDelegateRanking(user, DEFAULT_LIST, dave), type(uint256).max);
    }

    function test_MultipleLists() public {
        address[] memory defiDelegates = new address[](2);
        defiDelegates[0] = alice;
        defiDelegates[1] = bob;

        address[] memory gamingDelegates = new address[](2);
        gamingDelegates[0] = carol;
        gamingDelegates[1] = dave;

        vm.startPrank(user);
        registry.setDelegationList(LIST_DEFI, defiDelegates);
        registry.setDelegationList(LIST_GAMING, gamingDelegates);
        vm.stopPrank();

        // Verify both lists exist independently
        address[] memory storedDefi = registry.getDelegationList(user, LIST_DEFI);
        address[] memory storedGaming = registry.getDelegationList(user, LIST_GAMING);

        assertEq(storedDefi.length, 2);
        assertEq(storedDefi[0], alice);
        assertEq(storedDefi[1], bob);

        assertEq(storedGaming.length, 2);
        assertEq(storedGaming[0], carol);
        assertEq(storedGaming[1], dave);

        // Verify list tracking
        assertEq(registry.getUserListCount(user), 2);
        assertTrue(registry.doesListExist(user, LIST_DEFI));
        assertTrue(registry.doesListExist(user, LIST_GAMING));
    }

    // =============================================================
    //                    GAS ANALYSIS TESTS
    // =============================================================

    function test_GasAnalysis_ListCreation() public {
        console2.log("=== Delegation List Creation Gas Cost ===");
        
        // Test different list sizes
        uint256[] memory sizes = new uint256[](4);
        sizes[0] = 5;
        sizes[1] = 10;
        sizes[2] = 20;
        sizes[3] = 30;

        for (uint256 j = 0; j < sizes.length; j++) {
            address[] memory delegates = new address[](sizes[j]);
            for (uint256 i = 0; i < sizes[j]; i++) {
                delegates[i] = makeAddr(string(abi.encodePacked("delegate", j, "_", i)));
            }

            vm.prank(user);
            uint256 gasStart = gasleft();
            registry.setDelegationList(keccak256(abi.encodePacked("list", j)), delegates);
            uint256 gasUsed = gasStart - gasleft();
            
            console2.log("Delegates:", sizes[j], "Gas:", gasUsed);
        }
        console2.log("");
    }

    function test_CalldataAnalysis() public view {
        console2.log("=== Calldata Analysis ===");
        
        uint256 baseCalldata = 4 + 32 + 32; // selector + listId + array length
        uint256 delegateSize = 32; // each address
        
        console2.log("Base calldata (selector + listId + array length):", baseCalldata, "bytes");
        console2.log("Per delegate:", delegateSize, "bytes");
        console2.log("");
        
        for (uint256 count = 5; count <= 25; count += 10) {
            uint256 totalCalldata = baseCalldata + (count * delegateSize);
            console2.log("Delegates:", count);
            console2.log("Total calldata:", totalCalldata, "bytes");
        }
        console2.log("");
    }

    // =============================================================
    //                        FUZZ TESTING
    // =============================================================

    function testFuzz_ListOperations(uint8 delegateCount) public {
        delegateCount = uint8(bound(delegateCount, 1, 50));
        
        address[] memory delegates = new address[](delegateCount);
        for (uint256 i = 0; i < delegateCount; i++) {
            delegates[i] = makeAddr(string(abi.encodePacked("del", i)));
        }
        
        vm.prank(user);
        registry.setDelegationList(LIST_DEFI, delegates);
        
        // Verify list was set correctly
        address[] memory stored = registry.getDelegationList(user, LIST_DEFI);
        assertEq(stored.length, delegateCount);
        
        for (uint256 i = 0; i < delegateCount; i++) {
            assertEq(stored[i], delegates[i]);
            assertEq(registry.getDelegateRanking(user, LIST_DEFI, delegates[i]), i);
        }
        
        assertEq(registry.getDelegationListLength(user, LIST_DEFI), delegateCount);
        assertTrue(registry.doesListExist(user, LIST_DEFI));
    }
}