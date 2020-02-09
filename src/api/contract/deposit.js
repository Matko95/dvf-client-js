const BigNumber = require('bignumber.js')

module.exports = async (dvf, vaultId, token, amount, ethAddress) => {
  const currency = dvf.token.getTokenInfo(token)

  let value
  if (token === 'ETH') {
    value = dvf.token.toBaseUnit(token, amount)
  } else {
    value = dvf.token.toQuantizedUnit(token, amount)
  }

  const args = [dvf.token.getTokenInfo(token).starkTokenId, vaultId, value]
  const action = 'deposit'
  // In order to lock ETH we simply send ETH to the lockerAddress
  if (token === 'ETH') {
    args.pop()
    return dvf.eth.send(
      dvf.contract.abi.StarkEx,
      dvf.config.DVF.starkExContractAddress,
      action,
      args,
      value // send ETH to the contract
    )
  }

  try {
    return dvf.eth.send(
      dvf.contract.abi.StarkEx,
      dvf.config.DVF.starkExContractAddress,
      action,
      args
    )
  } catch (e) {
    if (!dvf.contract.isApproved(token)) {
      return {
        error: 'ERR_CORE_ETHFX_NEEDS_APPROVAL',
        reason: reasons.ERR_CORE_ETHFX_NEEDS_APPROVAL.trim(),
        originalError: e
      }
    } else {
      throw e
    }
  }
}
