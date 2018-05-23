const { createERC20 } = require('./ERC20')

module.exports = createERC20({
    symbol: 'KSS',
    name: 'Krosscoin',
    color: '#2159EC',
    contract_address: '0xf94e44D8EA46CCd8451D7E15264C6C4A78d3E10f',
    labels: 'KSS ethereum token erc20 ecr20',
    coin_decimals: 18,
    price_decimals: 2
})
