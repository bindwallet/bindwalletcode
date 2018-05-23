const { createERC20 } = require('./ERC20')

module.exports = createERC20({
    symbol: 'BBC',
    name: 'BitBancoCoin',
    color: '#2159EC',
    contract_address: '0x31B566a89CEF7962aA647ae6766Ea8Fb1DD6cCDb',
    labels: 'BBC ethereum token erc20 ecr20',
    coin_decimals: 9,
    price_decimals: 2
})
