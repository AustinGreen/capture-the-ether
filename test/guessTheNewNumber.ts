import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('GuessTheNewNumber', function () {
  it('should call guess successfully', async function () {
    const [owner] = await ethers.getSigners()
    const GuessTheNewNumber = await ethers.getContractFactory('GuessTheNewNumber')
    const guessTheNewNumber = await GuessTheNewNumber.deploy()
    await guessTheNewNumber.deployed()

    const GuessTheNewNumberExploit = await ethers.getContractFactory('GuessTheNewNumberExploit')
    const guessTheNewNumberExploit = await GuessTheNewNumberExploit.deploy(guessTheNewNumber.address)
    await guessTheNewNumberExploit.deployed()

    expect(await guessTheNewNumber.isComplete()).to.equal(false)

    const guessTheNumberExploitInterface = ['function drain() payable']
    const guessTheNumberContract = await ethers.getContractAt(
      guessTheNumberExploitInterface,
      guessTheNewNumberExploit.address,
      owner
    )

    await guessTheNumberContract.drain({
      value: ethers.utils.parseEther('1.0'),
    })
  })
})
