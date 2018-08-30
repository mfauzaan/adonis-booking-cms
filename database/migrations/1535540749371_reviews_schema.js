'use strict'

const Schema = use('Schema')

class ReviewsSchema extends Schema {
  up () {
    this.create('reviews', (table) => {
      table.increments()
      table.string('name')
      table.string('description')
      table.string('customer_name')
      table.string('rating')
      table.timestamps()
    })
  }

  down () {
    this.drop('reviews')
  }
}

module.exports = ReviewsSchema
