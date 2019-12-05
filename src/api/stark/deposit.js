const {post} = require('request-promise');
const sw = require('starkware_crypto');

module.exports = async (efx, token, amount) => {
  const userAddress = efx.get('account');
  const startKey = '0x234';

  // Basic validation
  if (!token) {
    throw new Error('tokenId is required')
  }

  if (!amount) {
    throw new Error('amount is required')
  }

  // Create quantized amount
  amount = 100

  //get token id for config
  tokenId=12345;

  // tempVault will be available to the client via config
  const tempVaultId = 1 // default DeversiFi vault id
  const vaultId = 2 // users vault id for the tokens that have been deposited

  // Deposit to contract
  const depositStatus = await efx.contract.deposit(tempVaultId, amount, userAddress);
  await depositStatus.then(receipt => {
    // create stark message and signature using stark crypto library
    // replace get_order_msg with deposit and transfer message when its available

    const starkMessage = sw.get_transfer_msg(
      amount, // amount (uint63 decimal str)
      order_id, // order_id (uint31)
      sender_vault_id, // temp vault id or sender_vault_id (uint31)
      tokenId, // token (hex str with 0x prefix < prime)
      receiver_vault_id, // user vault or receiver_vault_id (uint31)
      receiver_public_key, // receiver_public_key (hex str with 0x prefix < prime)
      expiration_timestamp // expiration_timestamp (uint22)
    );
  
    //sign using stark crypto library
    const starkSignature = sw.sign(starkMessage, key_pair);
    
    }, e => {
      // Error handling, user corrections
      throw new Error('deposit not happened. something went wrong')
  })

  // Call dvf pub api
  const url = efx.config.api + '/stark/deposit';
  const data = {
    userAddress,
    starkKey,
    tempVaultId,
    vaultId,
    tokenId,
    amount,
    starkMessage,
    starkSignature
  };

  return post(url, {json: data})
}
