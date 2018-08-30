'use strict'
const Activity = use('App/Models/Activity')

class ActivityController {
  async index({ view }) {
    const activities = await Activity.all()
    return view.render('admin.activities.index', { activities: activities.toJSON() })
  }

  async create({ view }) {
    return view.render('admin.activities.create')
  }

  async store({ request, response }) {
    const { name, description } = request.all()

    await Activity.create({
      name, description
    })

    response.route('activities.index')
  }

  async edit({ view, params }) {
    const activity = await Activity.find(params.id)
    return view.render('admin.activities.edit', { activity: activity.toJSON() })
  }

  async update({ params, request, response }) {
    const activity = await Activity.find(params.id)
    const { name, description } = request.all()

    activity.merge({
      name, description
    })

    await activity.save()

    response.route('activities.index')
  }

  async destroy({ params, response }) {
    const activity = await Activity.find(params.id)

    await activity.delete()

    response.route('back')
  }
}

module.exports = ActivityController
