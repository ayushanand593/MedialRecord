const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("medicalRecord", () => {
    let medical, user1, transactionResponse, transactionReceipt;

    beforeEach(async () => {
        // Get signer accounts
        const accounts = await ethers.getSigners();
        // Assuming the first account is used for deployment
        user1 = accounts[1];
        // Deploy the contract using user1's account
        const Medical = await ethers.getContractFactory("MedicalRecord");
        medical = await Medical.connect(user1).deploy();
    });

    describe("Deployed", () => {
        it("The contract is deployed successfully", async () => {
            // Assert that the contract address is not equal to 0
            expect(await medical.address).to.not.equal(0);
        });
    });

    describe("Add record", () => {
        beforeEach(async () => {
         
          transactionResponse = await medical.addRecord(
            "Wastron",
            22,
            "Male",
            "B positive",
            "Dengue",
            "Dengue",
            "Dengue"
          );
          transactionReceipt = await transactionResponse.wait();
          
        });

        it("Emits a add record event", async () => {
            // const receipt = await transactionResponse.wait();
            const event = await transactionReceipt.events[0];
      expect(event.event).to.equal("MedicalRecord__AddRecord");
      const args = event.args;
            expect(args.name).to.equal("Wastron");
            expect(args.timestamp).to.not.equal(0);
            expect(args.age).to.equal(22);
            expect(args.gender).to.equal("Male");
            expect(args.bloodType).to.equal("B positive");
            expect(args.allergies).to.equal("Dengue");
            expect(args.diagnosis).to.equal("Dengue");
            expect(args.treatment).to.equal("Dengue");
        });
        it("The getRecords function is working", async () => {
            const [
              timestamp,
              name,
              age,
              gender,
              bloodType,
              allergies,
              diagnosis,
              treatment,
            ] = await medical.getRecord(await medical.getRecordId());
            expect(await medical.getRecordId()).to.equal(1);
            expect(timestamp).to.not.equal(0);
            expect(name).to.equal("Wastron");
            expect(age).to.equal(22);
            expect(gender).to.equal("Male");
            expect(bloodType).to.equal("B positive");
            expect(allergies).to.equal("Dengue");
            expect(diagnosis).to.equal("Dengue");
            expect(treatment).to.equal("Dengue");
          });
       
    });
    describe("The delete function is working", () => {
      beforeEach(async () => {
        transactionResponse = await medical.addRecord(
          "Wastron",
          22,
          "Male",
          "B positive",
          "Dengue",
          "Dengue",
          "Dengue"
        );
        transactionReceipt = await transactionResponse.wait();
        transactionResponse = await medical.deleteRecord(1);
        transactionReceipt = await transactionResponse.wait();
      });
      it("The record is deleted ", async () => {
        expect(await medical.getDeleted(1)).to.be.equal(true);
      });
      it("Emits a delete event", async () => {
        const event = await transactionReceipt.events[0];
        const args = event.args;
        expect(event.event).to.equal("MedicalRecord__DeleteRecord");
        expect(args.timestamp).to.not.equal(0);
        expect(args.name).to.equal("Wastron");
        expect(args.age).to.equal(22);
        expect(args.gender).to.equal("Male");
        expect(args.bloodType).to.equal("B positive");
        expect(args.allergies).to.equal("Dengue");
        expect(args.diagnosis).to.equal("Dengue");
        expect(args.treatment).to.equal("Dengue");
      });
    });
});