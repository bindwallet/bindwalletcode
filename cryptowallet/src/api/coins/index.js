const Coins = {}
const list = [
    'BTC',
    'ETH',
    'INV',
	'ANT',
    'ZRX',
    'QTUM',
    'TRX',
    'EOS',
    'OMG',
    'BNB',
    'MKR',
    'SNT',
    'REP',
    'SALT',
    'QASH',
    'BAT',
    'GNT',
    'ETHOS',
    'FUN',
    'REQ',
    'KNC',
	'CBT',
	'BBC',
	'TPI',
	'CRGO',
	'SENSE',
	'KSS',
	'RARE',
	'BNST'
]

exports.Coins = Coins

list.forEach(symbol => {
    const coin = require('./' + symbol)
    Coins[symbol] = coin
    exports[symbol] = coin
})

// const CoinsCopy = Object.assign({}, Coins)
// delete CoinsCopy.Coins
// Coins.Coins = CoinsCopy
