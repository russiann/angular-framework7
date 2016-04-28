angular.module('pages', ['app.modals', 'app.home'])
angular.module('app', ['framework7', 'pages'])
  .config(function($F7Provider, $F7RouterProvider){

    $F7Provider.init({
      swipePanel: 'left',
      materialRipple: false
    }, true);

    $F7Provider.addView('main', '.view-main', {
      dynamicNavbar: true
    }, true);

  })
