'use strict'

const User = use('App/Models/User')
const { validateAll } = use('Validator')
const Hash = use('Hash')

class LoginController {
    async login({ response, request, session, auth }) {
        const { email, password, remember } = request.all()

        const user = await User.query().where('email', email).first()

        console.log(email)

        if (user) {
            const passValidation = await Hash.verify(password, user.password)

            if (passValidation) {
                await auth.remember(!!remember).login(user)

                return response.redirect('dashboard')
            }
        }

        session.flash({
            notification: {
                type: 'error',
                text: 'Ocorreu um erro com seu login',
            }
        })

        return response.redirect('back')

    }

    async logoff({ auth, response }) {
        await auth.logout()
        return response.redirect('/login')
    }
}

module.exports = LoginController