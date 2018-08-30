'use strict'

const Schema = use('Schema')

class RoomSchema extends Schema {
  up () {
    this.create('rooms', (table) => {
      table.increments()
      table.string('name')
      table.float('price')
      table.string('type')
      table.string('description')
      table.string('max_occupancy')
      table.string('room_amenities')
      table.boolean('breakfast')
      table.timestamps()
    })
  }

  down () {
    this.drop('rooms')
  }
}

module.exports = RoomSchema
