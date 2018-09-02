'use strict'

const Schema = use('Schema')

class AddDescriptionSchema extends Schema {
  up () {
    this.table('reviews', (table) => {
      table.text('description')
    })
  }

  down () {
    this.table('reviews')
  }
}

module.exports = AddDescriptionSchema
