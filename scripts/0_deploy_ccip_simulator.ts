import { network }  from "hardhat";
import {developmentChains,networksConfig} from "../helper-hardhat-config.js"
 const hr = await network.connect();
if (developmentChains.includes(hr.networkName)) {
 
    console.log("Deploy network name:",hr.networkName);
    const [deployer] = await hr.ethers.getSigners();
    console.log("Deployer:", deployer.address);

      //Deploy CCIPSimulator
    const CCIPSimulator = await hr.ethers.getContractFactory("CCIPSimulator");
    const ccipSimulator = await CCIPSimulator.deploy();
    await ccipSimulator.waitForDeployment();

    console.log("CCIPSimulator deployed to:", await ccipSimulator.getAddress());
}
