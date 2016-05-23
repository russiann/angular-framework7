class F7Picker {
  constructor($F7, $F7Compile, $rootScope) {
    this.instance = $F7.instance();
    this.$F7Compile = $F7Compile;
    this.$rootScope = $rootScope;
  }

  setHooks(popup, hooks, $scope, callback) {
    popup.on('open', () => {
      if (hooks && hooks.open) {
        hooks.open(popup);
      }
    });

    popup.on('opened', () => {
      if (hooks && hooks.opened) {
        hooks.opened(popup);
      }
    });

    popup.on('close', () => {
      if (hooks && hooks.close) {
        hooks.close(popup);
      }
    });

    popup.on('closed', () => {
      if (hooks && hooks.closed) {
        hooks.closed(popup);
      }
      // if ($scope) $scope.$destroy();
      popup.remove();
      callback()
    });
  }

  open(parameters) {
    if (!parameters.name) throw Error('Picker name is required!');
    if (Dom7('.picker-modal.modal-in').length > 0) return;
    const element = Dom7(`.page-on-center .picker-modal[picker-name="${parameters.name}"]`);
    const id = `id-${Date.now()}`;
    const newElement = angular.copy(element);
    newElement.addClass(id);
    Dom7('body').append(newElement);

    const popup = Dom7(`.${id}`);

    if (parameters.scope) {
      this.$F7Compile.element(popup, (parameters.scope));
    }

    return new Promise((resolve) => {
      this.setHooks(popup, parameters.hooks, parameters.scope, function () {
        resolve()
      })

      this.instance.pickerModal(`.${id}`);
    })

  }

}

angular.module('framework7.services.picker', [])
  .service('$F7Picker', F7Picker)
