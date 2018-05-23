route = '/asset/${asset_id}/summ${a}ary'
path = '/asset/sum/12/ma%@ry/summary'

function reverse(route, path) {
    // route = escapeRegExp(route)
    const object = {}
    const keys = []
    const regexpstr = route.replace(/\${([^{}]*)}/g, (match, keyword) => {
        if (keyword.length === 0) return match
        keys.push({ key: keyword })
        return '(.*)'
    })
    const regexp = new RegExp('^' + regexpstr + '$')
    console.log(regexp)

    const matchs = path.match(regexp)
    if (matchs)
        matchs.forEach((value, index) => {
            if (index > 0) keys[index - 1].value = value
        })

    keys.forEach(item => {
        if (item.value !== undefined) object[item.key] = item.value
    })

    return object
}

console.log(reverse(route, path))
