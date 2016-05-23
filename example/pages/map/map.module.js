var homeConfig = function ($F7RouterProvider) {
  $F7RouterProvider
  .when('#/map', {
    name: 'Map',
    controller: 'MapController',
    controllerAs: 'vm',
    templateUrl: {
      android: 'pages/map/map.view.android.html',
      ios: 'pages/map/map.view.ios.html',
    }
  });
}

angular.module('app.map', [])
  .config(homeConfig)
