const instance = require('../../../api/test/helpers/instance')

let dvf

describe('dvf.stark.ledger.getPath', () => {
  beforeAll(async () => {
    
    dvf = await instance()
  })

  it('gets stark path for ledger', async () => {
    const address = '0x7d92F2d76cd93DA39066f9B695adc33e4dc08a54'
    const derivedStarkPath = `2645'/579218131'/1393043894'/1304463956'/727418492'/0`

    const starkPath = await dvf.stark.ledger.getPath(address)

    // console.log({starkPath})
    expect(starkPath).toMatch(derivedStarkPath)

  })
})
