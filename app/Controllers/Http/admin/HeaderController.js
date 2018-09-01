'use strict'
const Photo = use('App/Models/Photo')
const Drive = use('Drive')
const Helpers = use('Helpers')

class HeaderController {
  async index({ view }) {
    const photos = await Photo.query().where({ type: 'Header' }).orderBy('id', 'asc').fetch()
    return view.render('admin.header_images.index', { photos: photos.toJSON() })
  }

  async edit({ params, view }) {
    const photo = await Photo.find(params.id)
    return view.render('admin.header_images.edit', { photo: photo.toJSON() })
  }

  async update({ request,params,response }) {
    const photo = await Photo.find(params.id)
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

    response.route('header_images.index')
  }
}

module.exports = HeaderController
