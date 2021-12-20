import { ethers } from 'hardhat'

async function main() {
  const [owner] = await ethers.getSigners()
  const CallGuess = await ethers.getContractFactory('GuessTheNumber')
  const callGuess = await CallGuess.deploy()
  await callGuess.deployed()
  const guessTheNumberAddress = callGuess.address
  const guessTheNumberInterface = ['function drain() payable']
  const guessTheNumberContract = await ethers.getContractAt(guessTheNumberInterface, guessTheNumberAddress, owner)
  console.log(guessTheNumberContract)
  await guessTheNumberContract.drain({
    value: ethers.utils.parseEther('1.0'),
  })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
