'use strict'

const Model = use('Model')

class Activity extends Model {
  photo() {
    return this.hasOne('App/Models/Photo', 'id', 'parent_id')
  }
}


module.exports = Activity
