'use strict'

const Schema = use('Schema')

class ChangeDescTypeInReviewSchema extends Schema {
  up () {
    this.table('reviews', (table) => {
      // alter table
      table.dropColumn('description')
    //  table.text('description')
    })
  }

  down () {
    this.table('reviews', (table) => {
   //   this.dropColumn('description')
      // reverse alternations
    })
  }
}

module.exports = ChangeDescTypeInReviewSchema
