'use strict'

const Schema = use('Schema')

class PhotosSchema extends Schema {
  up () {
    this.create('photos', (table) => {
      table.increments()
      table.string('name')
      table.string('path')
      table.integer('parent_id')
      table.string('type')
      table.timestamps()
    })
  }

  down () {
    this.drop('photos')
  }
}

module.exports = PhotosSchema
