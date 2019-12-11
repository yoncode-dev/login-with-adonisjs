'use strict'

const User = use('App/Models/User')
const { validateAll } = use('Validator')

class UserController {
    async store({ response, request, session }) {
        try {

            const msgError = {
                'username.required': 'Informe seu nome.',
                'email.required': 'Informe um e-mail valido',
                'email.email': 'Informe um e-mail valido',
                'email.unique': 'Esse e-mail já está cadastrado',
                'password.required': 'Informe uma senha'
            }

            const validation = await validateAll(request.all(), {
                username: 'required',
                email: 'required|email|unique:users,email',
                password: 'required'
            }, msgError)

            if (validation.fails()) {
                session.withErrors(validation.messages()).flashAll()
                return response.redirect('back')
            }

            const data = request.only(['username', 'email', 'password'])

            const user = await User.create(data)

            console.log('gravou')

            session.flash({
                notification: {
                    type: 'success',
                    text: 'Você foi cadastrado com sucesso!',
                }
            })

            return response.redirect('/login')


        } catch (err) {
            console.log('errou')
            session.flash({
                notification: {
                    type: 'error',
                    text: 'Ocorreu um erro com seu cadastro!',
                }
            })
        }
    }
}

module.exports = UserController