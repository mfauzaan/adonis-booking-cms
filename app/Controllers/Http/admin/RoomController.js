'use strict'
const Room = use('App/Models/Room')

class RoomController {
  async index ({ view }) {
    const rooms = await Room.all()
    return view.render('admin.rooms.index', { rooms: rooms.toJSON() })
  }

  async create ({ view }) {
    return view.render('admin.rooms.create')
  }

  async store ({ request, response }) {
    const { name, description, type, price, breakfast }  = request.all()

    await Room.create({
      name,
      description,
      type,
      price,
      breakfast
    })

    response.route('rooms.index')
  }

  async edit ({ view, params }) {
    const room = await Room.find(params.id)
    return view.render('admin.rooms.edit', { room: room.toJSON() })
  }

  async update ({ params, request, response}) {
    const room = await Room.find(params.id)
    const { name, description, type, price, breakfast } = request.all()

    room.merge({
      name, description, type, price, breakfast
    })

    await room.save()

    response.route('rooms.index')
  }

  async destroy ({ params, response }) {
    const room = await Room.find(params.id)

    await room.delete()

    response.route('back')
  }
}

module.exports = RoomController
