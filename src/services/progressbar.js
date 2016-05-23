class F7ProgressBar {
  constructor($F7, $F7Compile, $rootScope) {
    this.instance = $F7.instance();
    this.$F7Compile = $F7Compile;
    this.$rootScope = $rootScope;
  }

  show(container, progress, color) {
    this.instance.showProgressbar(container, progress, color);
  }

  showTop(progress, color) {
    this.instance.showProgressbar(Dom7('body'), progress, color);
  }

  hide(container) {
    this.instance.hideProgressbar(container);
  }

  set(container, progress, speed) {
    this.instance.setProgressbar(container, progress, speed);
  }

}

angular.module('framework7.services.progressbar', [])
  .service('$F7ProgressBar', F7ProgressBar)
