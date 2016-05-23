function FoodAppController () {
    this.text = "Angular Framework7 Rocks!";

}

angular.module('app.foodApp')
.controller('FoodAppController', FoodAppController)
