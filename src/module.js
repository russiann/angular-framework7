angular.module('framework7', [
  'framework7.instance',
  'framework7.directives',
  'framework7.services',
])
  .run(function ($F7Compile, $F7Hooks, HashRouter) {
    $F7Hooks.init()
    $F7Compile.init();
    HashRouter.init();
  })
