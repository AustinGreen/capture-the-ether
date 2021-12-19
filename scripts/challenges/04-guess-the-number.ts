import { ethers } from 'hardhat'

async function main() {
  const [owner] = await ethers.getSigners()
  const guessTheNumberAddress = '0x290600A6c8e14d0Ea64BaF23dB04fBAD6E34d18F'
  const guessTheNumberInterface = ['function guess(uint8 n) payable']
  const guessTheNumberContract = await ethers.getContractAt(guessTheNumberInterface, guessTheNumberAddress, owner)
  const guessTheNumberCallData = ethers.utils.defaultAbiCoder.encode(['uint8'], [42])

  await guessTheNumberContract.guess(guessTheNumberCallData, {
    value: ethers.utils.parseEther('1.0'),
  })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
