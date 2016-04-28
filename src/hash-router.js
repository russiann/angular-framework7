function HashRouter () {

  var Router = {
    $get: function ($rootScope, $F7Router) {
      return {
        init: () => {
          this.init();
          $rootScope.$on('f7:pageAfterAnimation', (e, data) => {
            if (data.detail.pageData.swipeBack) {
              $F7Router.findRouteByUrl(data.detail.pageData.url)
              .then((route) => {
                Router.navigate(route.path);
              })
            }
          })
        }
      }
    },
    init: function (onRouteChange, onRouteNotFound) {

      Router.__eventOnChange = onRouteChange;
      Router.__eventOnNotFound = onRouteNotFound;

      if (!("onhashchange" in window)) {
        console.error("The browser doesn't support HASH on URL!");
        return false;
      }
      Router.__bindHashChange();
      if (window.location.hash == '' || window.location.hash == '#') {
        Router.__listener('#/');
        return true;
      }
      else {
        Router.__listener(window.location.hash);
        return true;
      }
      return true;
    },
    navigate: function (hash) {

      window.location.hash = hash;
    },
    run: function (route) {

      if (Router.__eventOnChange != null) Router.__eventOnChange(route);
      Router.__run(route, 'before');
    },
    add: function (route, overwrite) {

      var isAlreadyMapped = false;
      if (!route.path) {
        console.error("Cannot find property path when adding a new route!");
        return false;
      }
      for (var i = 0; i < Router.routes.length; i++) {
        if (Router.routes[i].path === route.path) {
          isAlreadyMapped = true;
          if (overwrite === true) {
            Router.routes[i] = route;
            return;
          }
          break;
        }
      }
      if (isAlreadyMapped) {
        console.error("A ruote for the path " + ruote.path + " is already mapped!");
        return false;
      }
      Router.routes.push(route);
    },
    findRoute: function (path) {

      for (var i = 0; i < Router.routes.length; i++) {
        if (Router.routes[i].path === path) return Router.routes[i];
      }
    },
    matchRoute: function (hash) {

      var hashParts = Router.__cleanHash(hash);
      var testerSlices = hashParts.hashParams.split("/");
      var tester = hashParts.hashParams;
      var params = {};
      var query = {};

      //parse querystring
      if (hashParts.hashQueryArray.length > 0) {
        for (var q = 0; q < hashParts.hashQueryArray.length; q++) {
          var keyValue = (hashParts.hashQueryArray[q]).split('=');
          if (keyValue.length >= 1 && keyValue[0]) {
            query[keyValue[0]] = keyValue[1] ? decodeURIComponent(keyValue[1]) : '';
          }
        }
      }

      //parse hash parameters
      for (var i = 0; i < Router.routes.length; i++) {
        var route = Router.routes[i];
        tester = hashParts.hashParams;

        if (route.path.search(/:/) > 0) {//Dynamic parts
          var routeSlices = route.path.split("/");
          for (var x = 0; x < routeSlices.length; x++) {
            if ((x < testerSlices.length) && (routeSlices[x].charAt(0) === ":")) {
              params[routeSlices[x].replace(/:/, '')] = testerSlices[x];
              tester = tester.replace(testerSlices[x], routeSlices[x]);
            }
          }
        }

        if (route.path === tester) {
          route.params = params;
          route.url = hash;
          route.query = query;
          return route;
        }
      }
      return null;
    },
    routes: [],
    __bindHashChange: function () {
      window.onhashchange = function () { Router.__listener(location.hash) }
    },
    __cleanHash: function (hash) {
      var result = {};
      var hashIndexOfQuery = hash.indexOf('?');

      result.hash = hash;
      result.hashParams = hashIndexOfQuery >= 0 ? hash.substring(0, hashIndexOfQuery) : hash;
      result.hashQuery = hashIndexOfQuery >= 0 ? hash.substring(hash.indexOf('?') + 1) : '';
      result.hashQueryArray = result.hashQuery ? result.hashQuery.split('&') : [];

      var cleanedHashParams = result.hashParams.replace(/\/+$/, '');
      if (result.hashParams !== cleanedHashParams) {
        window.onhashchange = null;
        result.hash = cleanedHashParams;
        result.hash += result.hashQuery ? '?' + result.hashQuery : '';
        window.location.hash = result.hash;
        Router.__bindHashChange();
      }

      return result;
    },
    __listener: function (hash) {
      if (hash === '') hash = '#/';
      var route = Router.matchRoute(hash);
      if (!route && !Router.__eventOnNotFound) {
        console.error("Cannot find a valid route for hash " + hash + "!");
        return false;
      } else if (!route && Router.__eventOnNotFound) {
        Router.__eventOnNotFound(Router.__hashToArray(hash));
        return false;
      }
      return Router.run(route);
    },
    __hashToArray: function (hash) {
      var tokens = hash.split("/");
      if (tokens.length > 0 && tokens[0] == '#') tokens.shift();
      return tokens;
    },
    __run: function (route, state, previousResult) {
      if (route[state]) {
        var runTask = new Router.__task(function (result) {
          var nextState = Router.__nextState(state);
          if (nextState) Router.__run(route, nextState, result);
        });
        route.event = {};
        route.event.previousResult = previousResult;
        route.event.state = state;
        route.task = runTask;
        route[state]();
      } else {
        var nextState = Router.__nextState(state);
        if (nextState) Router.__run(route, nextState);
      }
    },
    __nextState: function (state) {
      if (state == 'before') return 'on';
      if (state == 'on') return 'after';
      return null;
    },
    __eventOnChange: null,
    __eventOnNotFound: null,
    __task: function (doneFunction) {
      return {
        __callback: doneFunction,
        done: function (result) {
          this.__callback(result);
        }
      };
    },
  }

  return Router;
}

angular.module('framework7').provider('HashRouter', HashRouter);
