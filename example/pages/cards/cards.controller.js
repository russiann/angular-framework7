function CardsController () {
    this.text = "Angular Framework7 Rocks!";

    this.posts = [];
    for (var i = 0; i < 100; i++) {
      this.posts.push({
        image: 'http://lorempixel.com/300/'+220+i
      })
    }

}

angular.module('app.cards')
.controller('CardsController', CardsController)
