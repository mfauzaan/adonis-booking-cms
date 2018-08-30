'use strict'

class DashboardController {
  async index({ view }) {
    return view.render('admin.dashboard')
  }
}

module.exports = DashboardController
