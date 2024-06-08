import * as Yup from 'yup'

export const identitySchema = Yup.object().shape({
    email: Yup.string().email().nullable(),
    phoneNumber: Yup.number().nullable()
})