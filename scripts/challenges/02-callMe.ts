import { ethers } from 'hardhat'

async function main() {
  const [owner] = await ethers.getSigners()
  const callMeAddress = '0xd1aA2930d54516969710d18E4611Fc2B2C06425A'
  const callMeInterface = ['function callme()', 'function isComplete()']
  const callMeContract = await ethers.getContractAt(callMeInterface, callMeAddress, owner)

  await callMeContract.callme()
  const isSuccessful = await callMeContract.isComplete()
  console.log('CallMe was called:', isSuccessful)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
