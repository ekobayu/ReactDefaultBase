export default (value) => {
  if (isNaN(value) || value === null) {
    return '-'
  }

  if (value >= 1000000000000) {
    return parseFloat((value / 1000000000000).toFixed(2)).toLocaleString() + ' T'
  }

  if (value >= 1000000000) {
    return parseFloat((value / 1000000000).toFixed(2)).toLocaleString() + ' B'
  }

  if (value >= 1000000) {
    return parseFloat((value / 1000000).toFixed(2)).toLocaleString() + ' M'
  }

  if (value >= 1000) {
    return parseFloat((value / 1000).toFixed(2)).toLocaleString() + ' K'
  }

  return value.toLocaleString()
}
