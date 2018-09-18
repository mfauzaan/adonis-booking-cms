'use strict'

const Schema = use('Schema')

class AddDescriptionAsTextSchema extends Schema {
  up() {
    this.table('rooms', (table) => {
      table.text('description')
      // alter table
    })
  }

  up() {
    this.table('activities', (table) => {
      table.text('description')
      // alter table
    })
  }


  down () {
    this.table('add_description_as_texts', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddDescriptionAsTextSchema
