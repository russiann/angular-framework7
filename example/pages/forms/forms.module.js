var homeConfig = function ($F7RouterProvider) {
  $F7RouterProvider
  .when('#/forms', {
    name: 'Forms',
    controller: 'FormsController',
    controllerAs: 'vm',
    templateUrl: {
      android: 'pages/forms/forms.view.android.html',
      ios: 'pages/forms/forms.view.ios.html',
    }
  });
}

angular.module('app.forms', [])
  .config(homeConfig)
