'use strict'
const { validate } = use('Validator')
const Hash = use('Hash')
const User = use('App/Models/User')

class ProfileController {
  async index({ view }) {
    return view.render('admin.profiles.index')
  }

  async store({ request, response, session, auth }) {
    // Get required params
    const { current_password, new_password } = request.all()

    // Confirm password
    const rules = {
      confirm_password: 'same:new_password'
    }

    const validation = await validate(request.all(), rules)

    const isSame = await Hash.verify(current_password, auth.user.password)

    if (isSame) {
      const user = await User.find(auth.user.id)

      user.merge({
        password: new_password
      })

      await user.save()

      session.flash({ success: 'Password Changed Successfully' })

      return response.route('back')
    }

    if (validation.fails()) {
      session.flash({ error: 'Confirmation password did not match.' })
      return response.route('back')
    }

    session.flash({ error: 'Old password did not match.' })
    return response.route('back')
  }
}

module.exports = ProfileController
