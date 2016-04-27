class F7Router {
  constructor(HashRouterProvider, $F7Provider) {
    this.$F7Provider = $F7Provider;
    this.HashRouter = HashRouterProvider;
    this.routes = [];
  }

  when(path, config) {
    const self = this;
    const route = {
      path: path,
      config: config,
      before: function() {
        self.loadPage(
          this.config.templateUrl,
          this.config.name,
          this.config.controller,
          this.config.controllerAs,
          this.config.hooks
        );
        this.task.done();
      },
      on: function() {
        this.task.done();
      },
      after: function() {
        this.task.done();
      }
    };
    this.HashRouter.add(route);
    this.routes.push(route);
    return this;
  }

  loadPage(url, pageName, controller, controllerAs, hooks) {
    const view = this.$F7Provider.getMainView();
    if (~view.history.indexOf(url)) {
      view.router.back({ force: 'true', url: url });
    } else {
      Dom7.get(url, function (data) {

        var content = Dom7(data)

        var ngController = controller;
        if (controllerAs) ngController += ' as ' + controllerAs;

        content.attr('data-page', pageName);

        // é necessário passar a url para que o histórico do f7 funcione normalmente
        // e não haja duplicidade de telas
        view.router.load({content, url});
      });
    }
  }

  $get($rootScope, $compile) {
    return {
      state: this.state,
      back: this.back,
      findRouteByUrl: (url) => {
        return new Promise((resolve, reject) => {

          const route = this.routes.find((route) => {
            return route.config.templateUrl === url
          })

          return route ? resolve(route) : reject();
        })
      }
    }
  }

  // Public Factory Methods

  state(pageName) {
    const url = pageName.toLowerCase()+'.view.html';
    const route = this.routes.find(function (route) {
      return route.config.templateUrl === url;
    })
    // TODO: pass router params and querystring.
    this.HashRouter.navigate(route.path);
  }

  back() {
    window.history.back()
  }
}

angular.module('framework7')
  .provider('$F7Router', F7Router)
