const { createERC20 } = require('./ERC20')

module.exports = createERC20({
    symbol: 'INV',
    name: 'Investacoin',
    color: '#2159EC',
    contract_address: '0xB0FE24dc6222e9d9d0E43AB67F40c578Af810D21',
    labels: 'INV ethereum token erc20 ecr20',
    coin_decimals: 8,
    price_decimals: 2
})
