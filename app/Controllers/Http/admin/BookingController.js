'use strict'
const Booking = use('App/Models/Booking')

class BookingController {
  async index({ view }) {
    const bookings = await Booking.query().with('room').fetch()
    return view.render('admin.bookings.index', { bookings: bookings.toJSON()})
  }

  async store({ request, response, session }) {
    const formData = request.except('_csrf')

    const booking = await Booking.create(formData)

    session.flash({ notification: 'Booked' })

    response.route('back')
  }
}

module.exports = BookingController
