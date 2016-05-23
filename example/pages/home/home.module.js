var homeConfig = function ($F7RouterProvider) {
  $F7RouterProvider
  .when('#/', {
    name: 'Home',
    controller: 'HomeController',
    controllerAs: 'vm',
    templateUrl: {
      android: 'pages/home/home.view.android.html',
      ios: 'pages/home/home.view.ios.html',
    }
  });
}

angular.module('app.home', [])
  .config(homeConfig)
