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
        const template = self.$F7Provider.theme === 'android' ?
          this.config.templateUrls.android :
          this.config.templateUrls.ios;

        console.log('load: ', template);
        self.loadPage(
          template,
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
    const theme = this.$F7Provider.theme;
    const view = this.$F7Provider.getMainView();
    if (~view.history.indexOf(url)) {
      view.router.back({ force: 'true', url: url });
    } else {
      Dom7.get(url, (data) => {

        var content = Dom7(data)

        var ngController = controller;
        if (controllerAs) ngController += ' as ' + controllerAs;

        content.find('.page').attr('data-page', pageName);

        content = this.setLayout(theme, content);

        // é necessário passar a url para que o histórico do f7 funcione normalmente
        // e não haja duplicidade de telas
        view.router.load({content, url, animatePages:true});
      });
    }
  }

  setLayout(theme, htmlContent) {

    var root = htmlContent.parent();
    var content = htmlContent.find('.page');
    var navbar = htmlContent.find('.navbar');
    var toolbar = htmlContent.find('.toolbar');

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
      findRouteByUrl: (url) => {
        return new Promise((resolve, reject) => {

          const route = this.routes.find((route) => {
            if (this.$F7Provider.theme === 'android') {
              return route.config.templateUrls.android === url
            } else {
              return route.config.templateUrls.ios === url
            }
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
