// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title DelegationRegistry
 * @dev Registry contract for managing delegation lists without deploying individual contracts
 */
contract DelegationRegistry {
    /// @notice Emitted when a delegation list is set
    event DelegationListSet(address indexed account, bytes32 indexed listId, address[] delegates);

    /// @notice Mapping from global key to delegation list
    mapping(bytes32 => address[]) public delegationList;
    
    /// @notice Mapping from account to their list keys
    mapping(address => bytes32[]) public userListKeys;

    /**
     * @notice Creates or updates a delegation list for the calling account
     * @param listId Unique identifier for the delegation list
     * @param delegates Array of delegate addresses in priority order (highest to lowest priority)
     */
    function setDelegationList(bytes32 listId, address[] calldata delegates) external {
        address account = msg.sender;
        
        // Create global key: keccak256(account + listId)
        bytes32 globalKey = keccak256(abi.encodePacked(account, listId));
        
        // If this is a new list, add to user's list keys
        if (delegationList[globalKey].length == 0 && delegates.length > 0) {
            userListKeys[account].push(globalKey);
        }
        
        // Set new delegation list (array order determines priority)
        delegationList[globalKey] = delegates;
        
        emit DelegationListSet(account, listId, delegates);
    }


    /**
     * @notice Gets the delegation list for a specific account and list ID
     * @param account The account to query
     * @param listId The list ID to query
     * @return delegates Array of delegate addresses in priority order
     */
    function getDelegationList(address account, bytes32 listId) external view returns (address[] memory delegates) {
        bytes32 globalKey = keccak256(abi.encodePacked(account, listId));
        return delegationList[globalKey];
    }


    /**
     * @notice Gets the ranking of a specific delegate for an account and list
     * @param account The account to query
     * @param listId The list ID to query
     * @param delegate The delegate address to check
     * @return ranking The ranking position (0-based index), or type(uint256).max if not in list
     */
    function getDelegateRanking(address account, bytes32 listId, address delegate) external view returns (uint256 ranking) {
        bytes32 globalKey = keccak256(abi.encodePacked(account, listId));
        address[] memory delegates = delegationList[globalKey];
        
        for (uint256 i = 0; i < delegates.length; i++) {
            if (delegates[i] == delegate) {
                return i; // Return 0-based index (0 = highest priority)
            }
        }
        return type(uint256).max; // Not found
    }

    /**
     * @notice Gets the number of delegates in an account's specific delegation list
     * @param account The account to query
     * @param listId The list ID to query
     * @return count The number of delegates
     */
    function getDelegationListLength(address account, bytes32 listId) external view returns (uint256 count) {
        bytes32 globalKey = keccak256(abi.encodePacked(account, listId));
        return delegationList[globalKey].length;
    }

    /**
     * @notice Gets all global list keys for a specific account
     * @param account The account to query
     * @return listKeys Array of global list keys owned by the account
     */
    function getUserListKeys(address account) external view returns (bytes32[] memory listKeys) {
        return userListKeys[account];
    }

    /**
     * @notice Gets the number of delegation lists for an account
     * @param account The account to query
     * @return count The number of lists
     */
    function getUserListCount(address account) external view returns (uint256 count) {
        return userListKeys[account].length;
    }

    /**
     * @notice Checks if a delegation list exists for an account
     * @param account The account to query
     * @param listId The list ID to check
     * @return exists True if the list exists
     */
    function doesListExist(address account, bytes32 listId) external view returns (bool exists) {
        bytes32 globalKey = keccak256(abi.encodePacked(account, listId));
        return delegationList[globalKey].length > 0;
    }
}