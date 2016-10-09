import angular from 'angular';
import hotAngular from 'angular-hot';
import {HotApp} from 'hot-app';

import '../style/app.css';

const AppDirective = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

class AppCtrl {
  constructor() {
    this.url = 'https://github.com/preboot/angular-webpack';
  }
}

const MODULE_NAME = 'app';

if (!window.__ng1AppDefined) {
  hotAngular.module(MODULE_NAME, []);
  window.__ng1AppDefined = true;
}

hotAngular.module(MODULE_NAME)
  .directive('app', AppDirective)
  .controller('AppCtrl', AppCtrl);

const app = window.app = new HotApp({
  oldApp: window.app,
  getRootElement: function() { return document.body; },
  startFn: (app, onStart) => {
    angular.bootstrap(app.getRootElement(), [MODULE_NAME]);
    onStart();
  },
  stopFn: (app, onStop) => {
    angular.element(app.getRootElement()).injector().get('$rootScope').$destroy();
    onStop();
  }
});
app.startOnDOMReady();

// Webpack hot reload support
if (module.hot) {
  module.hot.accept();

  module.hot.dispose(() => {
    app.stop();
  });
}

export default MODULE_NAME;
