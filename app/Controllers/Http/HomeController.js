'use strict'
const Option = use('App/Models/Option')
const Room = use('App/Models/Room')
const Review = use('App/Models/Review')
const Activity = use('App/Models/Activity')

class HomeController {
  async index({ view }) {
    // Contact Dertails
    const number = await Option.findBy({ name: 'number' })
    const email = await Option.findBy({ name: 'email' })
    const address = await Option.findBy({ name: 'address' })
    const facebook = await Option.findBy({ name: 'facebook' })
    const twitter = await Option.findBy({ name: 'twitter' })
    const instagram = await Option.findBy({ name: 'instagram' })

    //Rooms
    const rooms = await Room.all()
    const reviews = await Review.all()
    const activities = await Activity.all()

    return view.render('master', {
      number,
      email,
      address,
      facebook,
      twitter,
      instagram,
      rooms: rooms.toJSON(),
      reviews: reviews.toJSON(),
      activities: activities.toJSON()
    })
  }
}

module.exports = HomeController
