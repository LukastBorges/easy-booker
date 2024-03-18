export function fullNameFormatter(firstName: string, lastName: string) {
  return `${firstName} ${lastName}`
}

export function capitalize(string: string) {
  return string
    .split(' ')
    .map((item) => (item[0] || '').toUpperCase() + item.substring(1))
    .join(' ')
}
