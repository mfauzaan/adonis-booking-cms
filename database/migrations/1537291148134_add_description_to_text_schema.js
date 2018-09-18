'use strict'

const Schema = use('Schema')

class AddDescriptionToTextSchema extends Schema {
  up () {
    this.table('rooms', (table) => {
      table.dropColumn('description')
      // alter table
    })
  }

  up() {
    this.table('activities', (table) => {
      table.dropColumn('description')
      // alter table
    })
  }

  down () {
    this.table('rooms', (table) => {
      // reverse alternations
    })
  }

  down() {
    this.table('activities', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddDescriptionToTextSchema
