'use strict'

const Schema = use('Schema')

class ActivitiesSchema extends Schema {
  up () {
    this.create('activities', (table) => {
      table.increments()
      table.string('name')
      table.string('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('activities')
  }
}

module.exports = ActivitiesSchema
