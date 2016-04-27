window.Framework7.prototype.plugins.hooks = function (app, params) {
  return {
    hooks: {
      appInit: function () {
        Dom7(window).trigger('f7:appInit', {app});
      },
      navbarInit: function (navbar, pageData) {
        Dom7(window).trigger('f7:navbarInit', { navbar, pageData });
      },
      pageInit: function (pageData) {
        Dom7(window).trigger('f7:pageInit', { pageData });
      },
      pageBeforeInit: function (pageData) {
        Dom7(window).trigger('f7:pageBeforeInit', { pageData });
      },
      pageBeforeAnimation: function (pageData) {
        Dom7(window).trigger('f7:pageBeforeAnimation', { pageData });
      },
      pageAfterAnimation: function (pageData) {
        Dom7(window).trigger('f7:pageAfterAnimation', { pageData });
      },
      pageBeforeRemove: function (pageData) {
        Dom7(window).trigger('f7:pageBeforeRemove', { pageData });
      },
      addView: function (view) {
        Dom7(window).trigger('f7:addView', { view });
      },
      loadPage: function (view, url, content) {
        Dom7(window).trigger('f7:loadPage', { view, url, content });
      },
      goBack: function (view, url, preloadOnly) {
        Dom7(window).trigger('f7:goBack', { view, url, preloadOnly });
      },
      swipePanelSetTransform: function (views, panel, percentage) {
        Dom7(window).trigger('f7:swipePanelSetTransform', { views, panel, percentage });
      }
    }
  };
};
