const { createERC20 } = require('./ERC20')

module.exports = createERC20({
    symbol: 'CBT',
    name: 'Cibus World',
    color: '#2159EC',
    contract_address: '0xBBCA7197c4BF733d8fD38751733864B70851CB87',
    labels: 'CBT ethereum token erc20 ecr20',
    coin_decimals: 10,
    price_decimals: 2
})
