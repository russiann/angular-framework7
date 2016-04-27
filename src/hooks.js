function F7Hooks ($rootScope) {

  function init() {
    Dom7(window).on('f7:appInit', (data) => {
      $rootScope.$emit('f7:appInit', data);
    });
    Dom7(window).on('f7:navbarInit', (data) => {
      $rootScope.$emit('f7:navbarInit', data);
    });
    Dom7(window).on('f7:pageInit', (data) => {
      $rootScope.$emit('f7:pageInit', data);
    });
    Dom7(window).on('f7:pageBeforeInit', (data) => {
      $rootScope.$emit('f7:pageBeforeInit', data);
    });
    Dom7(window).on('f7:pageBeforeAnimation', (data) => {
      $rootScope.$emit('f7:pageBeforeAnimation', data);
    });
    Dom7(window).on('f7:pageAfterAnimation', (data) => {
      $rootScope.$emit('f7:pageAfterAnimation', data);
    });
    Dom7(window).on('f7:pageBeforeRemove', (data) => {
      $rootScope.$emit('f7:pageBeforeRemove', data);
    });
    Dom7(window).on('f7:addView', (data) => {
      $rootScope.$emit('f7:addView', data);
    });
    Dom7(window).on('f7:loadPage', (data) => {
      $rootScope.$emit('f7:loadPage', data);
    });
    Dom7(window).on('f7:goBack', (data) => {
      $rootScope.$emit('f7:goBack', data);
    });
    Dom7(window).on('f7:swipePanelSetTransform', (data) => {
      $rootScope.$emit('f7:swipePanelSetTransform', data);
    });
  }

  return {init}
}

angular.module('framework7')
  .factory('$F7Hooks', F7Hooks)
