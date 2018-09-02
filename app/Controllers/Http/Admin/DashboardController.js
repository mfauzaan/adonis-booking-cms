'use strict'
const Booking = use('App/Models/Booking')

class DashboardController {
  async index({ view }) {
    const bookings = await Booking.query().limit(5).fetch()
    return view.render('admin.dashboard', { bookings: bookings.toJSON()})
  }
}

module.exports = DashboardController
