export function getMoneyInCents(value: string) {
  return (
    Number(value.replace('.', '').replace(',', '.').replace('R$ ', '')) * 60
  ) // 60 cents
}
