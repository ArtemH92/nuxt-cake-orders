import * as yup from 'yup'

export const schemaLogin = yup.object({
  username: yup.string().required('Это обязательное поле'),
  password: yup.string().required('Это обязательное поле')
})

export const schemaUser = yup.object({
  id: yup.string(),
  username: yup.string().required('Это обязательное поле'),
  password: yup
    .string()
    .required('Это обязательное поле')
    .min(6, 'Пароль должен содержать не менее 6 символов'),
  confirmPassword: yup
    .string()
    .required('Это обязательное поле')
    .oneOf([yup.ref('password')], 'Пароли не совпадают'),
  administrator: yup.boolean(),
  phone: yup.string()
})

export const schemaOrder = yup.object({
  dessert: yup.string().required('Это обязательное поле'),
  cakeType: yup.string().required('Это обязательное поле').when('dessert', {
    is: (dessert: string) => dessert === 'cake',
    then: () => yup.string().required('Это обязательное поле'),
    otherwise: () => yup.string().nullable(),
  }),
  cupcakesType: yup.string().required('Это обязательное поле').when('dessert', {
    is: (dessert: string) => dessert === 'cupcake',
    then: () => yup.string().required('Это обязательное поле'),
    otherwise: () => yup.string().nullable(),
  }),
  filling: yup.string().required('Это обязательное поле').when('dessert', {
    is: (dessert: string) => dessert === 'cupcake',
    then: () => yup.string().required('Это обязательное поле'),
    otherwise: () => yup.string().nullable(),
  }),
  quantity: yup.number().required('Это обязательное поле').when('dessert', {
    is: (dessert: string) => dessert === 'cupcake',
    then: () => yup.number().required('Это обязательное поле').min(9, 'Минимальное кольчество 9'),
    otherwise: () => yup.number().nullable(),
  }).default(null),
  dateTime: yup.date().required('Это обязательное поле'),
  status: yup.string(),
  notes: yup.string(),
});