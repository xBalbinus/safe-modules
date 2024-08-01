import SafeModuleSetup from '@safe-global/safe-4337/build/artifacts/contracts/SafeModuleSetup.sol/SafeModuleSetup.json'
import { DeployFunction } from 'hardhat-deploy/types'

const deploy: DeployFunction = async ({ deployments, getNamedAccounts, network }) => {
  if (!network.tags.safe) {
    return
  }

  const { deployer } = await getNamedAccounts()
  const { deploy } = deployments

  await deploy('SafeModuleSetup', {
    from: deployer,
    contract: SafeModuleSetup,
    args: [],
    log: true,
    deterministicDeployment: true,
  })
}

export default deploy
