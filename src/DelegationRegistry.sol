// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title DelegationRegistry
 * @dev Registry contract for managing delegation lists that can be shared across tokens
 */
contract DelegationRegistry {
    using Counters for Counters.Counter;

    /// @notice Emitted when a delegation list is created or updated
    event DelegationListSet(address indexed owner, uint256 indexed listId, address[] delegates);
    
    /// @notice Emitted when a user points their tokens to a delegation list
    event DelegationPointer(address indexed user, address indexed listOwner, uint256 indexed listId);

    /// @notice Counter for auto-incrementing list IDs
    Counters.Counter private _listIdCounter;

    /// @notice Mapping from owner to their list IDs
    mapping(address => uint256[]) public listIds;
    
    /// @notice Mapping from list ID to delegate addresses
    mapping(uint256 => address[]) public delegates;
    
    /// @notice Mapping from list ID to owner address for O(1) ownership lookup
    mapping(uint256 => address) public owners;

    /**
     * @notice Creates a new delegation list with auto-generated ID
     * @param delegates Array of delegate addresses in priority order (highest to lowest priority)
     * @return listId The auto-generated list ID
     */
    function create(address[] calldata _delegates) external returns (uint256 listId) {
        require(_delegates.length > 0, "Cannot create empty list");
        
        _listIdCounter.increment();
        listId = _listIdCounter.current();
        
        listIds[msg.sender].push(listId);
        delegates[listId] = _delegates;
        owners[listId] = msg.sender;
        
        emit DelegationListSet(msg.sender, listId, _delegates);
        return listId;
    }

    /**
     * @notice Updates an existing delegation list (only owner can update)
     * @param listId The list ID to update
     * @param delegates Array of delegate addresses in priority order (highest to lowest priority)
     */
    function update(uint256 listId, address[] calldata _delegates) external {
        require(_delegates.length > 0, "Cannot set empty list");
        require(owners[listId] == msg.sender, "Only list owner can update");
        
        delegates[listId] = _delegates;
        
        emit DelegationListSet(msg.sender, listId, _delegates);
    }

    /**
     * @notice Point your tokens to someone else's delegation list
     * @param listOwnerAddr The owner of the delegation list
     * @param listId The list ID to point to
     */
    function pointToDelegationList(address listOwnerAddr, uint256 listId) external {
        require(delegates[listId].length > 0, "List does not exist");
        require(owners[listId] == listOwnerAddr, "Specified owner does not own this list");
        
        emit DelegationPointer(msg.sender, listOwnerAddr, listId);
    }



    /**
     * @notice Gets the delegation list for a specific list ID
     * @param listId The list ID to query
     * @return delegates Array of delegate addresses in priority order
     */
    function getDelegationList(uint256 listId) external view returns (address[] memory) {
        return delegates[listId];
    }


    /**
     * @notice Gets the ranking of a specific delegate in a list
     * @param listId The list ID to query
     * @param delegate The delegate address to check
     * @return ranking The ranking position (0-based index), or type(uint256).max if not in list
     */
    function getDelegateRanking(uint256 listId, address delegate) external view returns (uint256 ranking) {
        address[] memory _delegates = delegates[listId];
        
        for (uint256 i = 0; i < _delegates.length; i++) {
            if (_delegates[i] == delegate) {
                return i; // Return 0-based index (0 = highest priority)
            }
        }
        return type(uint256).max; // Not found
    }

    /**
     * @notice Gets the number of delegates in a delegation list
     * @param listId The list ID to query
     * @return count The number of delegates
     */
    function getDelegationListLength(uint256 listId) external view returns (uint256 count) {
        return delegates[listId].length;
    }

    /**
     * @notice Gets all list IDs owned by a specific account
     * @param account The account to query
     * @return listIds Array of list IDs owned by the account
     */
    function getOwnerListIds(address account) external view returns (uint256[] memory) {
        return listIds[account];
    }

    /**
     * @notice Gets the number of delegation lists owned by an account
     * @param account The account to query
     * @return count The number of owned lists
     */
    function getOwnerListCount(address account) external view returns (uint256 count) {
        return listIds[account].length;
    }

    /**
     * @notice Checks if a delegation list exists
     * @param listId The list ID to check
     * @return exists True if the list exists
     */
    function listExists(uint256 listId) external view returns (bool exists) {
        return delegates[listId].length > 0;
    }

    /**
     * @notice Gets the current counter value (next list ID that will be assigned)
     * @return current The current counter value
     */
    function getCurrentListId() external view returns (uint256 current) {
        return _listIdCounter.current();
    }

    /**
     * @notice Gets the owner of a specific delegation list
     * @param listId The list ID
     * @return owner The owner address (or address(0) if not found)
     */
    function getListOwner(uint256 listId) external view returns (address owner) {
        return owners[listId];
    }
}