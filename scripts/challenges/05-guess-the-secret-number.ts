import { ethers } from 'hardhat'

async function main() {
  const [owner] = await ethers.getSigners()
  const guessTheNumberAddress = '0x4326Ddcf2df8039198F59dAc8C89E6B4Ec4698ae'
  const guessTheNumberInterface = ['function guess(uint8 n) payable']
  const secretHash = '0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365'
  const arr: number[] = [...Array(256).keys()]
  const secretNumber = arr.reduce((prev, curr) => prev + (ethers.utils.keccak256([curr]) === secretHash ? curr : 0), 0)
  const guessTheNumberContract = await ethers.getContractAt(guessTheNumberInterface, guessTheNumberAddress, owner)
  const guessTheNumberCallData = ethers.utils.defaultAbiCoder.encode(['uint8'], [secretNumber])

  await guessTheNumberContract.guess(guessTheNumberCallData, {
    value: ethers.utils.parseEther('1.0'),
  })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
