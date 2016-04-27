function goTo ($F7Router) {

  function link (scope, element, attr) {
    element.bind('click', () => {
      $F7Router.state(attr.goTo);
    })
  }

  return {
    restrict: 'A',
    link: link
  }
}

angular.module('framework7.directive.goTo', [])
  .directive('goTo', goTo);
