'use strict'

class RedirectIfAuthenticated {
  async handle({ auth, request, response }, next) {
    /**
     * Verify if user logged in.
     */
    try {
      await auth.check()
     
      return response.route('Admin/DashboardController.index') //Authendicated users redirected to Admin dashboard
    } catch (e) { }

    await next()
  }
}

module.exports = RedirectIfAuthenticated
