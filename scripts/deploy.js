const { ethers, run, network } = require("hardhat")

//async main
async function main() {


    //ethers 6.6.0
    const simpleStorage = await ethers.deployContract("SimpleStorage")
    console.log("deploying contract ..............")

    await simpleStorage.waitForDeployment()

    const CAddress = await simpleStorage.getAddress()

    console.log(
        "SimpleStorage CA :",
        CAddress
    )
        
    //what happens when we deploy to our hardhat network ?
    //for breaking Type error no matching argument found; deployment receipt to deployment trx
    //const deploymentReceipt = await contract.deploymentTransaction().wait(2)

    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {

        console.log("waiting for block confirmations....")
        //await simpleStorage.deployTransaction.wait(6) //verification raises typeError because this function is wrong
        await verify(CAddress, [])
    }

    //1. get value currently stored in the deployed simpleStorage contract
    const currentValue = await simpleStorage.retrieve()
    console.log(`current value is:  ${currentValue}`)

    //2. update the currenvalue
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)

    //3. retrieve updated value
    const updatedValue = await simpleStorage.retrieve()
    console.log(`updated value is:  ${updatedValue}`)
}

//function for contract verification
async function verify(contractAddress, args) {
    console.log("verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("already verified")
        } else {
            console.log(e)
        }
    }
}

main()
    .then(() => process.exit(1))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
