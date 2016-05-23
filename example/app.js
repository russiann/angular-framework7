angular.module('pages', [
  'uiGmapgoogle-maps',
  'app.home',
  'app.modals',
  'app.popups',
  'app.customPopup',
  'app.picker',
  'app.list',
  'app.forms',
  'app.cards',
  'app.map',
  'app.foodApp'
])
angular.module('app', ['framework7', 'pages'])
  .config(function($F7Provider, $F7RouterProvider){

    $F7Provider.init({
      swipePanel: 'left',
      materialRipple: false,
      animateNavBackIcon: true,
      cache: false
    }, true);

    $F7Provider.addView('main', '.view-main', {
      domCache: true,
      dynamicNavbar: true,
    }, true);

  })
