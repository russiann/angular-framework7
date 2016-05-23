(function (angular) {

  function PopupsController ($scope, $F7Popup) {
    this.text = "Angular Framework7 Rocks!"

    this.openPopup = function () {
      $F7Popup.new({
        name: 'about',
        scope: $scope,
        hooks: {
          open: function (popup) {
            console.log(popup);
          }
        }
      });
    }

    this.openIsolatedPopup = function () {
      $F7Popup.open('Custom');
    }
  }

  angular.module('app.popups')
  .controller('PopupsController', PopupsController)

})(angular);
