export function getDateUsLocale(value: string) {
  const splittedDate = value.split('/')

  return `${splittedDate[2]}-${splittedDate[1]}-${splittedDate[0]}`
}
