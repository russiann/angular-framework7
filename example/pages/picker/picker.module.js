(function () {

  var config = function ($F7RouterProvider) {
    $F7RouterProvider
    .when('#/picker', {
      name: 'Picker',
      controller: 'PickerController',
      controllerAs: 'vm',
      templateUrl: {
        android: 'pages/picker/picker.view.android.html',
        ios: 'pages/picker/picker.view.ios.html',
      }
    });
  }

  angular.module('app.picker', [])
  .config(config);
})()
