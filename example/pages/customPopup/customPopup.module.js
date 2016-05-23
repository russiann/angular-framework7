(function () {

  var config = function ($F7PopupProvider) {
    $F7PopupProvider
    .add({
      name: 'Custom',
      controller: 'CustomPopupController',
      controllerAs: 'vm',
      templateUrl: {
        android: 'pages/customPopup/customPopup.view.android.html',
        ios: 'pages/customPopup/customPopup.view.ios.html',
      }
    });
  }

  angular.module('app.customPopup', [])
  .config(config);
})()
