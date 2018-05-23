const { createERC20 } = require('./ERC20')

module.exports = createERC20({
    symbol: 'SENSE',
    name: 'Sense',
    color: '#2159EC',
    contract_address: '0x6745fAB6801e376cD24F03572B9C9B0D4EdDDCcf',
    labels: 'SENSE ethereum token erc20 ecr20',
    coin_decimals: 8,
    price_decimals: 2
})
