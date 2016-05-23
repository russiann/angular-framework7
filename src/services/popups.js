class F7Popup {
  constructor($F7Provider) {
    this.$F7Provider = $F7Provider;
    this.popups = {};
  }

  add(parameters) {
    this.popups[parameters.name] = parameters;
  }

  $get($F7, $F7Compile, $rootScope, $controller) {
    const instance = $F7.instance();
    const setHooks = (popup, hooks, $scope) => {
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
        if ($scope) $scope.$destroy();
        popup.remove();
      });
    }
    return {
      new: (parameters) => {
        if (!parameters.name) {
          throw Error('Popup name is required!');
        }
        const element = Dom7(`.page-on-center .popup[popup-name="${parameters.name}"]`);
        const id = `id-${Date.now()}`;
        const newElement = angular.copy(element);
        newElement.addClass(id);
        Dom7('body').append(newElement);

        const popup = Dom7(`.${id}`);

        if (parameters.scope) {
          $F7Compile.element(popup, (parameters.scope));
        }

        setHooks(popup, parameters.hooks)

        instance.popup(`.${id}`);

      },

      open: (name) => {
        const popup = this.popups[name];
        if (!popup) throw Error(`${name} Popup doesn't exist!`);

        Dom7.get(popup.templateUrl[this.$F7Provider.theme], (data) => {
          const element = Dom7(data);
          const id = `id-${Date.now()}`;
          element.addClass(id);
          Dom7('body').append(element);
          const _popup = Dom7(`.${id}`);

          const $scope = $rootScope.$new();
          $controller(popup.controller, {$scope}, null, popup.controllerAs);

          setHooks(_popup, popup.hooks, $scope)

          $F7Compile.element(_popup, $scope);

          instance.popup(`.${id}`);
        })
      }
    }

  }

}

angular.module('framework7.services.popups', [])
  .provider('$F7Popup', F7Popup)
