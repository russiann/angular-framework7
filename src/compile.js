class Compile {
  constructor($compile, $timeout, $controller, $rootScope, $F7Router) {
    this.$compile = $compile;
    this.$timeout = $timeout;
    this.$controller = $controller;
    this.$rootScope = $rootScope;
    this.$F7Router = $F7Router;
  }

  init() {
    this.$rootScope.$on('f7:pageBeforeInit', (e, data) => {
      const pageData = data.detail.pageData;
      this.$F7Router.findRouteByUrl(pageData.url)
        .then((route) => {
          const config = route.config;
          const navbar = data.detail.pageData.navbarInnerContainer;
          const $scope = this.$rootScope.$new();
          this.$controller(config.controller, {$scope}, null, config.controllerAs);
          this.$timeout(() => {
            var template = angular.element(pageData.container);
            this.$compile(template)($scope);
            if (navbar) {
              var navbarElement = angular.element(navbar);
              this.$compile(navbarElement)($scope);
            }
          });
        })
        .catch((err) => {
          console.warn(err);
        })

    });
  }

  element(element, $scope) {
    this.$timeout(() => {
      var template = angular.element(element);
      this.$compile(template)($scope);
    });
  }
}

angular.module('framework7')
  .factory('$F7Compile', Compile)
