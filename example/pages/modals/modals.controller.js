angular.module('app.modals')
.controller('ModalsController', function($F7Modal, $scope){

  this.alert = function() {
    $F7Modal.alert('Hello there!', 'Hey')
    .then(() => {
      console.log('Ok Clicked');
    })
  }
  this.confirm = function() {
    $F7Modal.confirm('Do you wanna Milk?', 'Question')
    .then(() => {
      console.log('No, I don\'t');
    })
    .catch(() => {
      console.log('Yes, sure!');
    })
  }
  this.prompt = function() {
    $F7Modal.prompt('What is your email?', 'Question', $scope)
    .then((res) => {
      $F7Modal.alert(`My email is ${res}.`, 'Answer')
    })
    .catch(() => {
      console.log('Canceled!');
    })
  }
  this.custom = function() {
    $F7Modal.custom({
      title: 'Awesome Photos?',
      text: 'What do you think about my photos?',
      afterText:  '<input type="text", ng:model="vm.text">',
      buttons: [
        {
          text: 'Bad :('
        },
        {
          text: 'Awesome!',
          bold: true,
          onClick: function () {
            myApp.alert('Thanks! I know you like it!')
          }
        },
      ]
    }, $scope)
  }

})
