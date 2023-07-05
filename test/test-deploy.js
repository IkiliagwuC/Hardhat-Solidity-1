const { ethers } = require("hardhat")
const { assert, expect } = require("chai") //to have access to the assert and expect

describe("SimpleStorage", () => {
    let simpleStorage, simpleStorageFactory

    beforeEach(async function () {
        //deploy the contract beforeEach test
        simpleStorageFactory = await ethers.deployContract("SimpleStorage")

        simpleStorage = await simpleStorageFactory.waitForDeployment()
    })

    //alternative for BeforeEach used

    //getContractFactory --> deployContract
    //deploy --> waitForDeployment

    // const simpleStorage = await ethers.deployContract("SimpleStorage")
    // console.log("deploying contract ..............")

    // await simpleStorage.waitForDeployment()

    //this is where you run tests
    //1.it, description of test, function to run
    it("should start with a favoriteNumber of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = 0
        //assert or expect keyword
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("should update when we call store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("should add person and retrieve the value", async function () {
        let personName = "Alice"
        let favoriteNumber = 42
        //add person(name & number) and check if name equals that pushed to mapping
        await simpleStorage.addPerson(personName, favoriteNumber)
        // await transactionResponse.wait(2)
        const person = await simpleStorage.people(0)
        const storedFavoriteNumber = await simpleStorage.nameToFavoriteNum(
            personName
        )
        assert.equal(person.favoriteNumber, favoriteNumber)
        assert.equal(person.name, personName)
        assert.equal(storedFavoriteNumber, favoriteNumber)
        // const firstPerson = await simpleStorage.people

        // assert.equal("favor", 20, firstPerson)

        //function reference
        // function addPerson(string memory _name, uint _favoriteNumber) public {
        //     people.push(People(_favoriteNumber, _name));
        //     nameToFavoriteNum[_name] = _favoriteNumber;
        // const lengthOfPeopleArray = await simpleStorage.person.length()
        // assert.equal(lengthOfPeopleArray, 1)
        // const lastPersonInArray = await simpleStorage.person(
        //     lengthOfPeopleArray - 1
        // )
        // assert.equal(lastPersonInArray.favoriteNumber, favoriteNumber)
        // assert.equal(lastPersonInArray.name, personName)
    })
})
