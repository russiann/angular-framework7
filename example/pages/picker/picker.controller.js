(function (angular) {

  function PickerController ($scope, $F7Picker) {
    this.text = "Angular Framework7 Rocks!"

    this.openPicker = function () {
      $F7Picker.open({
        name: 'about',
        scope: $scope,
        hooks: {
          open: function (popup) {
            console.log(popup);
          }
        }
      }).then(function() {
        console.log('Picker Closed');
      });
    }
  }

  angular.module('app.picker')
  .controller('PickerController', PickerController)

})(angular);
