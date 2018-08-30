'use strict'

const _ = require('lodash')

module.exports = function registerViewGlobals() {
  const View = use('Adonis/Src/View')
  const Env = use('Env')
  var moment = use('moment')

  View.global('navbarAnchor', function (meta) {
    /////////////////////
    // For single item //
    /////////////////////
    if (!meta.childs) {
      const attributes = _.map(meta, (value, key) => key !== 'title' ? `${key}="${value}"` : '')

      /**
       * Add required classes to the anchor tag. Note, he detect the current url
       * and add active class to anchor
       */
      attributes.push(`class="${this.resolve('url').startsWith(meta.href) ? 'nav-item--active' : ''} nav-item"`)
      /**
       * Set target to _blank for external urls
       */
      if (meta.href && meta.href.startsWith('http')) {
        attributes.push('target="_blank"')
      }

      return this.safe(`<li ${attributes.join(' ')}> <a href="${meta.href}">${meta.title}</a></li>`)
    }

    //////////////////
    // For dropdown //
    //////////////////
    let isChildItem = false

    const childs = _.map(meta.childs, (child) => {
      const attributes = _.map(child, (value, key) => key !== 'title' ? `${key}="${value}"` : '')

      /**
       * Set parent active when any child url is open
       */
      if (!isChildItem && child.href && this.resolve('url').startsWith(child.href)) {
        isChildItem = true
      }


      attributes.push('class="nav-item--active"')
      /**
       * Set target to _blank for external urls
       */
      if (child.href && child.href.startsWith('http')) {
        attributes.push('target="_blank"')
      }
      return `<li class="nav-item"><a ${attributes.join(' ')}> ${child.title} </a></li>`
    }).join('\n')

    return this.safe(`
    <li class="nav-item has-dropdown ${isChildItem ? 'nav-item--active ' : ''}">
        <a href="#">${meta.title}</a>
        <div class="drop-down--wrap">
          <ul class="drop-down--menu">
            ${childs}
          </ul>
        </div>
      </li >
    `)
  })
}