'use strict'
const Review = use('App/Models/Review')

class ReviewController {
  async index({ view }) {
    const reviews = await Review.all()
    return view.render('admin.reviews.index', { reviews: reviews.toJSON() })
  }

  async create({ view }) {
    return view.render('admin.reviews.create')
  }

  async store({ request, response }) {
    const { name, description, customer_name, rating } = request.all()

    await Review.create({
      name, description, customer_name, rating
    })

    response.route('reviews.index')
  }

  async edit({ view, params }) {
    const review = await Review.find(params.id)
    return view.render('admin.reviews.edit', { review: review.toJSON() })
  }

  async update({ params, request, response }) {
    const review = await Review.find(params.id)
    const { name, description, customer_name, rating } = request.all()

    review.merge({
      name, description, customer_name, rating
    })

    await review.save()

    response.route('reviews.index')
  }

  async destroy({ params, response }) {
    const review = await Review.find(params.id)

    await review.delete()

    response.route('back')
  }
}

module.exports = ReviewController
