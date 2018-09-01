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
const Option = use('App/Models/Option')
const Photo = use('App/Models/Photo')

class MasterSeeder {
  async run() {
    await User.create({ username: 'magiclife', password: 'Magiclife$1122', email: 'magiclifeguesthouse@gmail.com' })

    await Option.createMany([{
      name: 'number',
      description: '955755'
    },
    {
      name: 'email',
      description: '955755'
    },
    {
      name: 'address',
      description: '955755'
    },
    {
      name: 'facebook',
      description: 'https://fb.com/magiclifeGH'
    },
    {
      name: 'twitter',
      description: '#'
    },
    {
      name: 'instagram',
      description: '#'
    }
    ])

    await Photo.createMany([{
      name: 'Image 1',
      description: '955755',
      type: 'Header',
      path: '/assets/images/default/header_1.jpg'
    },
    {
      name: 'Image 2',
      description: '955755',
      type: 'Header',
      path: 'assets/images/default/header_2.jpg'
    },
    {
      name: 'Image 3',
      description: '955755',
      type: 'Header',
      path: '/assets/images/default/header_3.jpg'
    }])
  }

}

module.exports = MasterSeeder
