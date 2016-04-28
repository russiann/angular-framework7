var modalsConfig = function ($F7RouterProvider) {
  $F7RouterProvider
  .when('#/modals', {
    name: 'Modals',
    controller: 'ModalsController',
    controllerAs: 'vm',
    templateUrls: {
      android: 'pages/modals/modals.view.android.html',
      ios: 'pages/modals/modals.view.ios.html',
    }
  });
}

angular.module('app.modals', [])
  .config(modalsConfig);
