class Framework7 {
  constructor() {
    this.instance = null;
    this.views    = [];
    this.mainView = null;
  }

  init(params, debug) {
    this.instance = new window.Framework7(params);
    if (debug) window.f7 = this.instance;
  }

  addView(name, selector, parameters, isMainView) {
    if (this.f7) throw Error('Framework7 not initialized.');
    if (this.views[name]) {
      throw Error(`View with name ${name} already defined!`);
    }
    const view = this.instance.addView(selector, parameters);
    this.views[name] = view;
    if (isMainView) this.mainView = view;
  }

  getInstance() {
    return this.instance;
  }

  getMainView() {
    return this.mainView;
  }

  $get() {
    return {
      instance: () => this.instance,
      mainView: () => this.getMainView,
      view: (viewName) => {
        if (!viewName && !this.mainView) throw Error('MainView not defined.');
        if (!viewName && this.mainView) return this.mainView;
        if ( viewName && !views[viewName]) throw Error(`View '${viewName}' not defined.`);

        return this.views[viewName];
      },
    }
  }

}

angular.module('framework7')
  .provider('$F7', Framework7)
