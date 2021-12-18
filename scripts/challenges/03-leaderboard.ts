import { ethers } from 'hardhat'

async function main() {
  const [owner] = await ethers.getSigners()
  const cteAddress = '0x71c46Ed333C35e4E6c62D32dc7C8F00D125b4fee'
  const cteInterface = ['function setNickname(bytes32 nickname)']
  const cteContract = await ethers.getContractAt(cteInterface, cteAddress, owner)
  const nickname = ethers.utils.formatBytes32String('localhost3000')

  await cteContract.setNickname(nickname)
  console.log('cte was called with:', nickname)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
