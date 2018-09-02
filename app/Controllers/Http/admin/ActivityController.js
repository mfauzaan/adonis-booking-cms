'use strict'
const Activity = use('App/Models/Activity')
const Photo = use('App/Models/Photo')
var moment = use('moment')
var Helpers = use('Helpers')
var Drive = use('Drive')

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
    const featuredImage = request.file('featured_image')

    const activity = await Activity.create({
      name, description
    })

    // Move Image to Uploads
    await featuredImage.move(Helpers.publicPath(), {
      name: `/assets/images/uploads/${moment().unix()}.${featuredImage.subtype}`
    })

    await Photo.create({
      name: featuredImage.fileName,
      type: 'Activity',
      path: featuredImage.fileName,
      parent_id: activity.id 
    })

    response.route('activities.index')
  }

  async edit({ view, params }) {
    const activity = await Activity.find(params.id)
    const photo = await activity.photo().where({ type: 'Activity' }).first()
    return view.render('admin.activities.edit', { activity: activity.toJSON(), photo: photo.toJSON() })
  }

  async update({ params, request, response }) {
    const activity = await Activity.find(params.id)
    const photo = await activity.photo().where({ type: 'Activity' }).first()

    const { name, description } = request.all()

    activity.merge({
      name, description
    })

    
    await activity.save()

    const featuredImage = request.file('featured_image')
    if (featuredImage.size !== 0) {
      if (photo.path) {
        await Drive.delete(Helpers.publicPath(photo.path))
      }
      // Move Image to Uploads
      await featuredImage.move(Helpers.publicPath(), {
        name: photo.path
      })
    }

    response.route('activities.index')
  }

  async destroy({ params, response }) {
    const activity = await Activity.find(params.id)

    await activity.delete()

    response.route('back')
  }
}

module.exports = ActivityController
