const countView = (value) => {
    if (value >= 1000 && value < 1000000) {
        return `${parseInt(value / 1000)}K`
    } else if (value >= 1000000 && value < 1000000000) {
        return `${parseInt(value / 1000000)}M`
    }  else if (value >= 1000000000) {
        return `${parseInt(value / 1000000000)}T`
    }
    return value
}
export default countView