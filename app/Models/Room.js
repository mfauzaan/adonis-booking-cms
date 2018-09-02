'use strict'

const Model = use('Model')

class Room extends Model {
  photos() {
    return this.hasMany('App/Models/Photo', 'id', 'parent_id')
  }
}

module.exports = Room
