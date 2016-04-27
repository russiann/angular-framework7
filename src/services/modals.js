class F7Modal {
  constructor($F7, $F7Compile, $rootScope) {
    this.instance = $F7.instance();
    this.$F7Compile = $F7Compile;
    this.$rootScope = $rootScope;
  }

  alert(text, title) {
    const alert = this.instance.alert;
    return new Promise((resolve) => {
      if (title) {
        alert(text, title, () => resolve());
      } else {
        alert(text, () => resolve());
      }
    })
  }

  confirm(text, title) {
    const confirm = this.instance.confirm;
    return new Promise((resolve, reject) => {
      if (title) {
        confirm(text, title, () => resolve(), () => reject());
      } else {
        confirm(text, () => resolve(), () => reject());
      }
    });
  }

  prompt(text, title) {
    const prompt = this.instance.prompt;
    return new Promise((resolve, reject) => {
      if (title) {
        const element = prompt(text, title, (res) => resolve(res), () => reject());
      } else {
        prompt(text, (res) => resolve(res), () => reject());
      }
    });
  }

  custom(parameters, scope) {
    return new Promise((resolve) => {
      const modal = this.instance.modal;
      const element = modal(parameters);
      this.$F7Compile.element(element, (scope));
      resolve(element);
    });
  }
}

angular.module('framework7.services.modals', [])
  .service('$F7Modal', F7Modal)
