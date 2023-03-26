import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect, assert } from "chai";
import { ethers } from "hardhat";
import { Detra } from "../typechain-types/contracts/Detra";

describe("Detra", function () {
  let token: Detra;

  before(async function() {
    [this.owner, this.addr1, ...this.addrs] = await ethers.getSigners();
    const Detra = await ethers.getContractFactory("Detra");
    token = await Detra.deploy();
  })

  describe("Deployment verifications", function() {
    it("should get the balanceOf owner", async function() {
      let balancerOfOwner = await (await token.balanceOf(this.owner.address)).toString();
      let awaitedBalanceOfOwner = ethers.BigNumber.from("500").toString();
      assert.equal(balancerOfOwner, awaitedBalanceOfOwner);
    })
  })

  describe("Minting tokens function verifications", function() {
    it("should mint X tokens if Owner of the smart contract", async function() {
      let transaction = await token.mint(this.owner.address, ethers.BigNumber.from("500"));
      await transaction.wait(1);
      let balanceOfOwner = await (await token.balanceOf(this.owner.address)).toString();
      let awaitedBalanceOfOwner = ethers.BigNumber.from('1000').toString();
      assert.equal(balanceOfOwner, awaitedBalanceOfOwner);
    });

    it("should NOT mint X tokens if NOT the Owner of the smart contract", async function() {
      await expect(token.connect(this.addr1).mint(this.addr1.address, ethers.BigNumber.from('1000')))
      .to.be.revertedWith("Ownable: caller is not the owner");
    })
  })
});
