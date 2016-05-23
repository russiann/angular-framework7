var homeConfig = function ($F7RouterProvider) {
  $F7RouterProvider
  .when('#/foodApp', {
    name: 'FoodApp',
    controller: 'FoodAppController',
    controllerAs: 'vm',
    templateUrl: {
      android: 'pages/foodApp/foodApp.view.android.html',
      ios: 'pages/foodApp/foodApp.view.ios.html',
    }
  });
}

angular.module('app.foodApp', [])
  .config(homeConfig)
