const hre = require("hardhat");

async function main() {
    await hre.run('compile');

    // Fetch the contract to deploy (replace 'MyContract' with your contract name)
    const MyContract = await hre.ethers.getContractFactory("Twitter");

    // Deploy the contract
    const myContract = await MyContract.deploy();

    console.log("Contract deployed to address:", await myContract.getAddress()); //0x5FbDB2315678afecb367f032d93F642f64180aa3
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});