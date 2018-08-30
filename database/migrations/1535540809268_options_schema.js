'use strict'

const Schema = use('Schema')

class OptionsSchema extends Schema {
  up () {
    this.create('options', (table) => {
      table.increments()
      table.string('name')
      table.string('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('options')
  }
}

module.exports = OptionsSchema
