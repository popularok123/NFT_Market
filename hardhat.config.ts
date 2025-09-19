import type { HardhatUserConfig } from "hardhat/config";

import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import hardhatEthers  from "@nomicfoundation/hardhat-ethers"
import { configVariable } from "hardhat/config";
import { localhost } from "viem/chains";

const config: HardhatUserConfig = {
  plugins: [hardhatEthers],
  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  networks: {
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },
    localhost: {
      type: "http",
      chainType: "l1",
      url: "http://localhost:8545",
    },
    sepolia: {
      type: "http",
      chainType: "l1",
      url: configVariable("SEPOLIA_RPC_URL"),
      accounts: [configVariable("SEPOLIA_PRIVATE_KEY")],
    },
    numbai: {
      type: "http",
      chainType: "l1",
      url: configVariable("NUMA_RPC_URL"),
      accounts: [configVariable("NUMA_PRIVATE_KEY")],
    },
  },
};

export default config;
