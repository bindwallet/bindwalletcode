const { createERC20 } = require('./ERC20')

module.exports = createERC20({
    symbol: 'TPI',
    name: 'ThaneCoin ',
    color: '#2159EC',
    contract_address: '0x8C8cCB81D436B0f3017664441C39cbeFbD64650F',
    labels: 'TPI ethereum token erc20 ecr20',
    coin_decimals: 18,
    price_decimals: 2
})
