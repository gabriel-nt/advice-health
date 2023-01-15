import * as yup from 'yup'

yup.setLocale({
  mixed: {
    required: 'Campo obrigatório',
  },
  string: {
    email: 'Email inválido',
  },

  date: {
    min: 'Data inválida',
    max: 'Data inválida',
  },
})
