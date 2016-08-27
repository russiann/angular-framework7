class F7Router {
  constructor(HashRouterProvider, $F7Provider, $F7PopupProvider) {
    this.$F7Provider = $F7Provider;
    this.$F7PopupProvider    = $F7PopupProvider;
    this.HashRouter  = HashRouterProvider;
    this.routes = [];
  }

  when(path, config) {
    const self = this;
    if (config.type === 'popup') {
      this.$F7PopupProvider.add(config);
    }
    const route = {
      path: path,
      config: config,
      before: function() {
        if (this.config.type === 'popup') {
          Dom7(window).trigger('popupPage:open', this.config.name);
          // self.$F7PopupProvider.open(this.config.name);
        } else {
          const template = this.config.templateUrl[self.$F7Provider.theme];
          console.log('load: ', template);
          self.loadPage(
            template,
            this.config.name,
            this.config.controller,
            this.config.controllerAs,
            this.config.hooks,
            this.config.view
          );
        }
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

  loadPage(url, pageName, controller, controllerAs, hooks, view) {
    // 1. Verificar se é uma ação de Voltar
    // 2. Se for um 'Voltar'
    // 2.1 Se houver dois itens no historico da view atual
    const theme = this.$F7Provider.theme;
    const instance = this.$F7Provider.instance;
    var view = instance.getCurrentView();
    if (~view.history.indexOf(url)) {
      view.router.back({ force: 'true', url: url });
    } else {
      Dom7.get(url, (data) => {

        var content = Dom7(data)

        var ngController = controller;
        if (controllerAs) ngController += ' as ' + controllerAs;

        content.attr('data-page', pageName);

        content = this.setLayout(theme, content);

        // é necessário passar a url para que o histórico do f7 funcione normalmente
        // e não haja duplicidade de telas
        view.router.load({content, url});
      });
    }
  }

  setLayout(theme, htmlContent) {

    var root = htmlContent.parent();
    var content = htmlContent.children('.page');
    var navbar = htmlContent.children('.navbar');
    var toolbar = htmlContent.children('.toolbar');

    if (theme === 'ios') {
      if (navbar.html()) {
        content.addClass('navbar-through');
        htmlContent.parent().prepend(navbar);
      }
      if (toolbar.html()) {
        content.addClass('toolbar-through');
        htmlContent.parent().append(toolbar);
      }
    } else {
      if (navbar.html()) {
        content.addClass('navbar-fixed');
      }
      if (toolbar.html()) {
        content.addClass('toolbar-fixed');
      }
    }
    return htmlContent.parent().html();
  }

  $get($rootScope, $compile) {
    return {
      back: this.back,
      state: (pageName) => {
        const route = this.routes.find((route) => {
          return route.config.name === pageName
        })
        // TODO: pass router params and querystring.
        if (route) {
          this.HashRouter.navigate(route.path);
        } else {
          throw new Error('Route doesn\'t exist!')
        }
      },
      findRouteByUrl: (url, name) => {
        return new Promise((resolve, reject) => {

          var route = this.routes.find((route) => {
            return route.config.templateUrl[this.$F7Provider.theme] === url;
          })

          if (!route) {
            route = this.routes.find((route) => {
              return route.config.name === name;
            })
          }

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
