export const dateMask = (value: string) => {
  const formattedValue = value.replace(/\D/g, '').slice(0, 10)

  if (formattedValue.length >= 5) {
    return `${formattedValue.slice(0, 2)}/${formattedValue.slice(
      2,
      4,
    )}/${formattedValue.slice(4)}`
  }

  if (formattedValue.length >= 3) {
    return `${formattedValue.slice(0, 2)}/${formattedValue.slice(2)}`
  }

  return formattedValue
}
