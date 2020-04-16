let orderId
const orders = await dvf.getOrders('ETH:USDT')

console.log('orders', orders)

if (orders.length == 0) {
  console.log('submitting new order')
  
  // Submit an order to buy 0.5 Eth for USDT at 200 USDT for 1 Eth
  const symbol = 'ETH:USDT'
  const amount = 0.5
  const price = 200
  const validFor = '0'
  const feeRate = ''

  const submitOrderResponse = await dvf.submitOrder({
    symbol,
    amount,
    price,
    starkPrivateKey: starkPrivKey,
    validFor,           // Optional
    feeRate,            // Optional
    gid: '1',           // Optional
    cid: '1',           // Optional
    partnerId: 'P1',    // Optional
    dynamicFeeRate: '0' // Optional
  })

  console.log('submitOrder response ->', submitOrderResponse)

  orderId = submitOrderResponse.orderId
}
else {
  orderId = orders[0]._id
}

console.log('cancelling orderId', orderId)

const response = await dvf.cancelOrder(orderId)

console.log("cancelOrder response ->", response)
