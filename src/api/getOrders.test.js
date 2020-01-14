const nock = require('nock')
const instance = require('./test/helpers/instance')
const _ = require('lodash')

const mockGetConf = require('./test/fixtures/getConf')
const mockGetUserConf = require('./test/fixtures/getUserConf')

let dvf

describe('getOrder', () => {
  beforeAll(async () => {
    mockGetConf()
    mockGetUserConf()
    dvf = await instance()
  })

  it('Fetching orders from the API', async done => {
    const apiResponse = { id: '408231' }

    nock('https://app.stg.deversifi.com/')
      .post('/v1/trading/r/openOrders', body => {
        return (
          _.isMatch(body, {
            symbol: 'ETH:USDT'
          }) &&
          body.nonce &&
          body.signature
        )
      })
      .reply(200, apiResponse)

    const response = await dvf.getOrders('ETH:USDT')
    expect(response.id).toEqual(apiResponse.id)

    done()
  })

  it('GetOrder checks for orderId....', async done => {
    const orders = await dvf.getOrders(null)
    expect(orders.error).toEqual('ERR_INVALID_SYMBOL')

    done()
  })
})
