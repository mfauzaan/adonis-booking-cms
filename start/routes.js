'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use('Route')

Route.get('/', 'HomeController.index')
Route.get('login', 'Admin/UserController.show')
Route.post('login', 'Admin/UserController.login')

// Protected Routes
Route.group(() => {
  Route.get('dashboard', 'Admin/DashboardController.index')
 // Route.get('images/:id/delete', 'Admin/ImageController.destroy')

  Route.resource('rooms', 'Admin/RoomController')
  Route.resource('reviews', 'Admin/ReviewController')
  Route.resource('activities', 'Admin/ActivityController')
  Route.resource('options', 'Admin/OptionController')
  Route.resource('bookings', 'Admin/BookingController').only(['store', 'index', 'edit'])
  Route.get('logout', 'Admin/UserController.logout')
}).middleware('auth').prefix('admin')

