const {task }= require("hardhat/config")

task("block-number", "prints the current block number")
.setAction(
    //create anonymous function
    async(taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`current block number: ${blockNumber}`)
    }
)

module.exports = {}