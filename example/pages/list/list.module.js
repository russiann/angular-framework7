var homeConfig = function ($F7RouterProvider) {
  $F7RouterProvider
  .when('#/list', {
    name: 'List',
    controller: 'ListController',
    controllerAs: 'vm',
    templateUrl: {
      android: 'pages/list/list.view.android.html',
      ios: 'pages/list/list.view.ios.html',
    }
  });
}

angular.module('app.list', [])
  .config(homeConfig)
