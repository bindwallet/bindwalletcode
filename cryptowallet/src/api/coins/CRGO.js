const { createERC20 } = require('./ERC20')

module.exports = createERC20({
    symbol: 'CRGO',
    name: 'CargoCoin',
    color: '#2159EC',
    contract_address: '0xf49CDD50aD408d387d611F88A647179C3de3492b',
    labels: 'CRGO ethereum token erc20 ecr20',
    coin_decimals: 18,
    price_decimals: 2
})
