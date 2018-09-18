'use strict'
const Room = use('App/Models/Room')
const Photo = use('App/Models/Photo')
const Helpers = use('Helpers')
const moment = use('moment')
const Drive = use('Drive')

class RoomController {
  async index({ view }) {
    const rooms = await Room.query().orderBy('id', 'asc').fetch()
    return view.render('admin.rooms.index', { rooms: rooms.toJSON() })
  }

  async create({ view }) {
    return view.render('admin.rooms.create')
  }

  async store({ request, response }) {
    const { name, description, type, price, breakfast, max_occupancy, room_amenities } = request.all()
    const featuredImage = request.file('featured_image')
    const featuredImage_2 = request.file('featured_image_2')
    const featuredImage_3 = request.file('featured_image_3')
    const featuredImage_4 = request.file('featured_image_4')

    const room = await Room.create({
      name,
      description,
      type,
      price,
      breakfast,
      max_occupancy,
      room_amenities
    })

    // Move Image to Uploads
    await featuredImage.move(Helpers.publicPath(), {
      name: `/assets/images/uploads/${moment().unix()}_1.${featuredImage.subtype}`
    })
    await Photo.create({ name: 'featured_image', type: 'Room', path: featuredImage.fileName, parent_id: room.id })

    // Move Image to Uploads
    await featuredImage_2.move(Helpers.publicPath(), {
      name: `/assets/images/uploads/${moment().unix()}_2.${featuredImage_2.subtype}`
    })

    await Photo.create({ name: 'featured_image_2', type: 'Room', path: featuredImage_2.fileName, parent_id: room.id })

    // Move Image to Uploads
    await featuredImage_3.move(Helpers.publicPath(), {
      name: `/assets/images/uploads/${moment().unix()}_3.${featuredImage_3.subtype}`
    })

    await Photo.create({ name: 'featured_image_3', type: 'Room', path: featuredImage_3.fileName, parent_id: room.id })

    // Move Image to Uploads
    await featuredImage_4.move(Helpers.publicPath(), {
      name: `/assets/images/uploads/${moment().unix()}_4.${featuredImage_4.subtype}`
    })

    await Photo.create({ name: 'featured_image_4', type: 'Room', path: featuredImage_4.fileName, parent_id: room.id })

    response.route('rooms.index')
  }

  async edit({ view, params }) {
    const room = await Room.find(params.id)
    const featured_image = await Photo.query().where({ parent_id: room.id, type: 'Room', name: 'featured_image' }).first()
    const featured_image_2 = await Photo.query().where({ parent_id: room.id, type: 'Room', name: 'featured_image_2' }).first()
    const featured_image_3 = await Photo.query().where({ parent_id: room.id, type: 'Room', name: 'featured_image_3' }).first()
    const featured_image_4 = await Photo.query().where({ parent_id: room.id, type: 'Room', name: 'featured_image_4' }).first()
    return view.render('admin.rooms.edit', { room: room.toJSON(), featured_image: featured_image.toJSON(), featured_image_2: featured_image_2.toJSON(), featured_image_3: featured_image_3.toJSON(), featured_image_4: featured_image_4.toJSON() })
  }

  async update({ params, request, response }) {
    const room = await Room.find(params.id)
    const featuredImage = request.file('featured_image')
    const featuredImage_2 = request.file('featured_image_2')
    const featuredImage_3 = request.file('featured_image_3')
    const featuredImage_4 = request.file('featured_image_4')

    const featured_image = await Photo.query().where({ parent_id: room.id, type: 'Room', name: 'featured_image' }).first()
    const featured_image_2 = await Photo.query().where({ parent_id: room.id, type: 'Room', name: 'featured_image_2' }).first()
    const featured_image_3 = await Photo.query().where({ parent_id: room.id, type: 'Room', name: 'featured_image_3' }).first()
    const featured_image_4 = await Photo.query().where({ parent_id: room.id, type: 'Room', name: 'featured_image_4' }).first()

    const { name, description, type, price, breakfast, max_occupancy, room_amenities } = request.all()

    room.merge({
      name, description, type, price, breakfast, max_occupancy, room_amenities
    })

    await room.save()

    if (featuredImage.size !== 0) {
      if (featured_image.path) {
        await Drive.delete(Helpers.publicPath(featured_image.path))
      }
      // Move Image to Uploads
      await featuredImage.move(Helpers.publicPath(), {
        name: featured_image.path
      })
    }

    if (featuredImage_2.size !== 0) {
      if (featured_image_2.path) {
        await Drive.delete(Helpers.publicPath(featured_image_2.path))
      }
      // Move Image to Uploads
      await featuredImage_2.move(Helpers.publicPath(), {
        name: featured_image_2.path
      })
    }

    if (featuredImage_3.size !== 0) {
      if (featured_image_3.path) {
        await Drive.delete(Helpers.publicPath(featured_image_3.path))
      }
      // Move Image to Uploads
      await featuredImage_3.move(Helpers.publicPath(), {
        name: featured_image_3.path
      })
    }

    if (featuredImage_4.size !== 0) {
      if (featured_image_4.path) {
        await Drive.delete(Helpers.publicPath(featured_image_4.path))
      }
      // Move Image to Uploads
      await featuredImage_4.move(Helpers.publicPath(), {
        name: featured_image_4.path
      })
    }
  

    response.route('rooms.index')
  }

  async destroy({ params, response }) {
    const room = await Room.find(params.id)

    await room.delete()

    response.route('back')
  }
}

module.exports = RoomController
