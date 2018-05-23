const { createERC20 } = require('./ERC20')

module.exports = createERC20({
    symbol: 'RARE',
    name: 'RareToken',
    color: '#2159EC',
    contract_address: '0x89EaBF14687cF22D170bE29A920A6Bad38dEd732',
    labels: 'RARE ethereum token erc20 ecr20',
    coin_decimals: 2,
    price_decimals: 2
})
