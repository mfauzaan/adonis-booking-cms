'use strict'

/*
|--------------------------------------------------------------------------
| MasterSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const User = use('App/Models/User')

class MasterSeeder {
  async run () {
    await User.create({ username: 'magiclife', password: 'Magiclife$1122', email: 'magiclifeguesthouse@gmail.com' })
  }
}

module.exports = MasterSeeder
