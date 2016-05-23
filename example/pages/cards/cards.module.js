var homeConfig = function ($F7RouterProvider) {
  $F7RouterProvider
  .when('#/cards', {
    name: 'Cards',
    controller: 'CardsController',
    controllerAs: 'vm',
    templateUrl: {
      android: 'pages/cards/cards.view.android.html',
      ios: 'pages/cards/cards.view.ios.html',
    }
  });
}

angular.module('app.cards', [])
  .config(homeConfig)
