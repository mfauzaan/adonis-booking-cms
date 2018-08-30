'use strict'

const Schema = use('Schema')

class BookingSchema extends Schema {
  up () {
    this.create('bookings', (table) => {
      table.increments()
      table.string('first_name')
      table.string('last_name')
      table.string('email')
      table.string('mobile_number')
      table.timestamp('arrival_date')
      table.timestamp('departure_date')
      table.integer('adult')
      table.integer('child')
      table.integer('room_id')
      table.boolean('breakfast')
      table.string('special_request')
      table.string('status')
      table.timestamps()
    })
  }

  down () {
    this.drop('bookings')
  }
}

module.exports = BookingSchema
