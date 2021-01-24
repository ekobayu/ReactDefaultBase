export default (value) => {
  return value.toLocaleString('en-US', { minimumFractionDigits: 2 })
}
