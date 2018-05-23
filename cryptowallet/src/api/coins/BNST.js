const { createERC20 } = require('./ERC20')

module.exports = createERC20({
    symbol: 'BNST',
    name: 'Basis Neuro System Token',
    color: '#2159EC',
    contract_address: '0xf58a6e83c11487d5c702eec6e401cab463c2cd20',
    labels: 'BNST ethereum token erc20 ecr20',
    coin_decimals: 18,
    price_decimals: 2
})
