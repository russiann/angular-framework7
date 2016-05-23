(function () {

  var config = function ($F7RouterProvider) {
    $F7RouterProvider
    .when('#/popups', {
      name: 'Popups',
      controller: 'PopupsController',
      controllerAs: 'vm',
      templateUrl: {
        android: 'pages/popups/popups.view.android.html',
        ios: 'pages/popups/popups.view.ios.html',
      }
    });
  }

  angular.module('app.popups', [])
  .config(config);
})()
