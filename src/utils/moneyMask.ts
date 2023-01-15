export const moneyMask = (value: string) => {
  if (!value.replace(/\D/g, '')) return 'R$ 0,00'

  const newValue = value.replace('.', '').replace(',', '').replace(/\D/g, '')

  const options = { minimumFractionDigits: 2 }

  const formattedValue = new Intl.NumberFormat('pt-BR', options).format(
    parseFloat(newValue) / 100,
  )

  return `R$ ${formattedValue}`
}
