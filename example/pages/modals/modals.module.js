angular.module('app.modals', [])
  .config(function($F7RouterProvider){
    $F7RouterProvider
    .when('#/modals', {
      name: 'Modals',
      controller: 'ModalsController',
      controllerAs: 'vm',
      templateUrl: 'pages/modals/modals.view.html'
    });
  })
