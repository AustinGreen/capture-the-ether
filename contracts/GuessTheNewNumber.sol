//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract GuessTheNewNumber {
    function isComplete() public view returns (bool) {
        return address(this).balance == 1;
    }

    function guess(uint8 n) public payable {
        console.log("Guess is made:");
        console.log(n);
        require(msg.value == 1 ether);
        uint8 answer = uint8(
            uint256(
                keccak256(
                    abi.encodePacked(
                        blockhash(block.number - 1),
                        block.timestamp
                    )
                )
            )
        );
        console.log("Answer is:");
        console.log(answer);
        if (n == answer) {
            payable(msg.sender).transfer(1 ether);
        }
    }
}
