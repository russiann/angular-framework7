const homeConfig = function ($F7RouterProvider) {
  $F7RouterProvider
  .when('#/', {
    name: 'Home',
    controller: 'HomeController',
    controllerAs: 'vm',
    templateUrl: 'pages/home/home.view.html'
  });
}

angular.module('app.home', [])
  .config(homeConfig)
