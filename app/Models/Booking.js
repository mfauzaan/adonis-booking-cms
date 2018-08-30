'use strict'

const Model = use('Model')

class Booking extends Model {
  room() {
    return this.hasOne('App/Models/Room', 'room_id', 'id')
  }

  static get dates() {
    return super.dates.concat(['arrival_date', 'departure_date'])
  }

  static castDates(field, value) {
    if (field === 'arrival_date') {
      return value.format('YYYY-MM-DD')
    }

    if (field === 'departure_date') {
      return value.format('YYYY-MM-DD')
    }
    return super.formatDates(field, value)
  }
}

module.exports = Booking
