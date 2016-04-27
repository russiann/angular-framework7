angular.module('framework7', [
  'framework7.directives',
  'framework7.services',
])
  .run(function ($F7Compile, $F7Hooks) {
    $F7Hooks.init()
    $F7Compile.init();
  })
