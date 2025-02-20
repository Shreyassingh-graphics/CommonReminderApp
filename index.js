
import { setImmediate } from 'timers';

// If the above line doesn't work, use this as a fallback:
global.setImmediate = (fn, ...args) => {
  return setTimeout(() => fn(...args), 0);
};


import { registerRootComponent } from 'expo';

import App from './src/App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
