import { ethers, network } from "hardhat";
import { verify } from "../utils/verify";

async function main() {
  const DetraToken = await ethers.getContractFactory("Detra");
  const detraToken = await DetraToken.deploy();

  await detraToken.deployed();
  console.log(`Deployed smart contract at address ${detraToken.address}`);

  if (network.name === "goerli") {
    console.log("Verifying the smart contract...");
    await detraToken.deployTransaction.wait(6);
    await verify(detraToken.address, []);
  } 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
