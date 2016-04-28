function HomeController () {
    this.text = "Angular Framework7 Rocks!"
}

angular.module('app.home')
.controller('HomeController', HomeController)
