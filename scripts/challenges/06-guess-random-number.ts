import { ethers } from 'hardhat'

async function main() {
  const [owner] = await ethers.getSigners()
  const guessTheNumberAddress = '0x27DdCe91198e1D9D957Af414D613c194C88B1Fca'
  const guessTheNumberInterface = ['function guess(uint8 n) payable']
  const guessTheNumberContract = await ethers.getContractAt(guessTheNumberInterface, guessTheNumberAddress, owner)
  const secretNumber = ethers.BigNumber.from(await ethers.provider.getStorageAt(guessTheNumberContract.address, 0))
  const guessTheNumberCallData = ethers.utils.defaultAbiCoder.encode(['uint8'], [secretNumber])

  await guessTheNumberContract.guess(guessTheNumberCallData, {
    value: ethers.utils.parseEther('1.0'),
  })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
