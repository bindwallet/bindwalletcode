const { createERC20 } = require('./ERC20')

module.exports = createERC20({
    symbol: 'ETU',
    name: 'ETHERUP',
    color: '#2159EC',
    contract_address: '0x3eE016cDcaAB16Ebf4ec1Eda758606F6Fd874a57',
    labels: 'ETU ethereum token erc20 ecr20',
    coin_decimals: 18,
    price_decimals: 2
})
