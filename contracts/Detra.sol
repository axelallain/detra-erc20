// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Detra is ERC20, Ownable {
    constructor() ERC20("Detra", "DETRA") {
        _mint(msg.sender, 500);
        _mint(address(this), 500);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}