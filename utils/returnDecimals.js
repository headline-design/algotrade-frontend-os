const ReturnDecimals = (value) => {
    let decimals = value == 1 && 10 || 
    value == 2 && 100 ||
    value == 3 && 1000 ||
    value == 4 && 10000 ||
    value == 5 && 100000 ||
    value == 6 && 1000000 ||
    value == 7 && 10000000 ||
    value == 8 && 100000000 ||
    value == 9 && 1000000000 ||
    value == 10 && 10000000000 ||
    value == 11 && 100000000000 ||
    value == 12 && 1000000000000
    return decimals
}


export default ReturnDecimals