import { DeployFunction } from 'hardhat-deploy/types'

export function getDeploymentParameters() {
  const RECOVERY_PERIOD = 14 * 24 * 60 * 60 // 14 days

  const { DEPLOYMENT_RECOVERY_PERIOD } = process.env

  return {
    recoveryPeriod: DEPLOYMENT_RECOVERY_PERIOD || RECOVERY_PERIOD,
  }
}

const deploy: DeployFunction = async ({ deployments, getNamedAccounts }) => {
  const { deployer } = await getNamedAccounts()
  const { deploy } = deployments

  const { recoveryPeriod } = getDeploymentParameters()

  try {
    await deploy('SocialRecoveryModule', {
      from: deployer,
      args: [recoveryPeriod],
      log: true,
      deterministicDeployment: true,
    })
  } catch (error) {
    console.error('Error deploying SocialRecoveryModule:', error)
    throw error
  }
}

export default deploy
