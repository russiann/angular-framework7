function goTo ($F7Router, $timeout) {

  function link (scope, element, attr) {
    element.bind('click', () => {
      $timeout(function () {
        $F7Router.state(attr.goTo);
      })
    })
  }

  return {
    restrict: 'A',
    link: link
  }
}

angular.module('framework7.directive.goTo', [])
  .directive('goTo', goTo);
