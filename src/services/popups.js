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
    const setHooks = (popup, hooks, $scope, options) => {
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
        options.opened = false;
        window.history.back();
        if (options.view.viewClass) {
          $F7.removeView(options.view.viewClass, options.view.viewName);
        }
      });
    }
    Dom7(window).on('popupPage:open', (ev) => {
      console.log(ev.detail);
      factory.open(ev.detail || ev.details);
    });
    const factory = {
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

        setHooks(popup, parameters.hooks, null, parameters.view);

        instance.popup(`.${id}`);

        if (parameters.view) {
          if (parameters.view.viewName) throw Error('Popup view require viewName!');
          if (parameters.view.viewClass) throw Error('Popup view require viewClass!');
        }

      },

      open: (name) => {
        const popup = this.popups[name];
        if (!popup) throw Error(`${name} Popup doesn't exist!`);
        if (popup.opened) {
          return popup._view.router.back();
        }

        Dom7.get(popup.templateUrl[this.$F7Provider.theme], (data) => {
          const element = Dom7(data);
          const id = `id-${Date.now()}`;
          element.addClass(id);
          Dom7('body').append(element);
          const _popup = Dom7(`.${id}`);

          const $scope = $rootScope.$new();
          $controller(popup.controller, {$scope}, null, popup.controllerAs);

          setHooks(_popup, popup.hooks, $scope, popup);

          $F7Compile.element(_popup, $scope);

          instance.popup(`.${id}`);
          popup.opened = true;

          // TODO: Init View only after popup 'opened' event,
          //       and delete view after 'closed' evend
          popup._view = this.$F7Provider.addView(
            popup.view.viewName,
            popup.view.viewClass,
            popup.view.options
          );
        })
      },
      close: (popup) => {
        instance.closeModal(popup);
      }
    }

    return factory;

  }

}

angular.module('framework7.services.popups', [])
  .provider('$F7Popup', F7Popup)
