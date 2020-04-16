let withdrawalId
const withdrawals = await dvf.getWithdrawals()

if (withdrawals.length == 0) {
  console.log('creating a new withdrawal')

  const token = 'ETH'
  const amount = 0.05

  const withdrawalResponse = await dvf.withdraw(
    token,
    amount,
    starkPrivKey
  )

  console.log('withdrawalResponse', withdrawalResponse)
  withdrawalId = withdrawalResponse._id
}
else {
  withdrawalId = withdrawals[0]._id
}

const getWithdrawalResponse = await dvf.getWithdrawal(withdrawalId)

console.log('getWithdrawal response ->', getWithdrawalResponse)
