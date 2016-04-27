function goBack ($F7Router) {

  function link (scope, element) {
    element.bind('click', () => {
      $F7Router.back();
    })
  }

  return {
    restrict: 'A',
    link: link
  }
}

angular.module('framework7.directive.goBack', [])
  .directive('goBack', goBack);
