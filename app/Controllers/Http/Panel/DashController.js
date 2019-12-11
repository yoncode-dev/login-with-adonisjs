'use strict'

class DashController {
    async index({ view, auth }) {
        return view.render('dash.dashboard')
    }
}

module.exports = DashController