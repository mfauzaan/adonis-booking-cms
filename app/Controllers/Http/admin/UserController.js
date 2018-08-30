'use strict'

class UserController {
  async show({ view }) {
    return view.render('admin.login')
  }

  async login({ request, response, auth }) {
    // Retrieve username & Password
    const { username, password } = request.all()

    // Wrapping up collected data to validate the user
    await auth.attempt(username, password)

    return response.route('Admin/DashboardController.index')
  }


  async logout({ auth, response }) {
    // Logout Current user
    await auth.logout()
    return response.route('Admin/UserController.show')
  }
}

module.exports = UserController
