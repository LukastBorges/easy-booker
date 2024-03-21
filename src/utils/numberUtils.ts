const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
}).format

export function moneyFormatter(value: string | number) {
  return currencyFormatter(+value)
}
