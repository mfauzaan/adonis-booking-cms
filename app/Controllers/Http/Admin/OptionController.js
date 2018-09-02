'use strict'
const Option = use('App/Models/Option')

class OptionController {
  async index({ view }) {
    const options = await Option.query().orderBy('id', 'asc').fetch()
    return view.render('admin.options.index', { options: options.toJSON() })
  }

  async create({ view }) {
    return view.render('admin.options.create')
  }

  async store({ request, response }) {
    const { name, description } = request.all()

    await Option.create({
      name,
      description,
    })

    response.route('options.index')
  }

  async edit({ view, params }) {
    const option = await Option.find(params.id)
    return view.render('admin.options.edit', { option: option.toJSON() })
  }

  async update({ params, request, response }) {
    const option = await Option.find(params.id)
    const { name, description } = request.all()

    option.merge({
      description
    })

    await option.save()

    response.route('options.index')
  }

  async destroy({ params, response }) {
    const option = await Option.find(params.id)

    await option.delete()

    response.route('back')
  }
}

module.exports = OptionController
