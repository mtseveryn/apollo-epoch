/* eslint-disable no-underscore-dangle */
/*
 The entry point for our bundle that will be injected into the DOM
 Creates windowListener that will receive messages from Epoch App / Content Script
*/

// To Do - Implement custom deep clone function
import { cloneDeep } from 'lodash'; // importing just the cloneDeep package throws a range Error when run...so all this must go in the DOM
import ComponentStore from './ComponentStore';
import CustomFiberTree from './CustomFiberTree';

const epochHookProp = '__APOLLO_EPOCH_FIBER_HOOK';
const epochHookObj = {
  componentStore: new ComponentStore(),
  testFunction: eatMyShorts,
};

console.log('INJECTED SCRIPT EPOCH IS HERE');

window.addEventListener('message', (event) => {
  if (event.source !== window) return;
  const epochHook = window[epochHookProp];

  if (event.data && event.data.type === '$$$initializeComponentStoreScript$$$') {
    console.log('Initializing Component Store');

    const { componentStore } = epochHook;

    const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    const apolloClientObj = window.__APOLLO_CLIENT__;
    const apolloClientClone = cloneDeep(apolloClientObj);
    console.log('CLONE -> ', apolloClientClone);
    const hostRootFiber = devTools.getFiberRoots(1).values().next().value;
    console.log('STARTING FIBER TREE');
    const initialFiberSnapshot = new CustomFiberTree(hostRootFiber, componentStore, 'initialState');
    console.log('INITIAL FIBER TREE CREATED -> ', initialFiberSnapshot);
    window.postMessage(
      { type: '$$$saveSnapshot$$$', payload: JSON.stringify(initialFiberSnapshot) },
      '*'
    );
  }

  if (event.data && event.data.type === '$$$getFiberTree$$$') {
    console.log('GETTING ROOT FIBER');
    const { componentStore } = epochHook;
    const apolloActionId = event.data.payload;
    const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    const apolloClientObj = window.__APOLLO_CLIENT__;
    const apolloClientClone = cloneDeep(apolloClientObj);
    console.log('CLONE -> ', apolloClientClone);
    const hostRootFiber = devTools.getFiberRoots(1).values().next().value;
    const initialFiberSnapshot = new CustomFiberTree(hostRootFiber, componentStore, apolloActionId);
    console.log('USER FIBER TREE CREATED -> ', initialFiberSnapshot);
    window.postMessage(
      { type: '$$$saveSnapshot$$$', payload: JSON.stringify(initialFiberSnapshot) },
      '*'
    );
  }

  if (event.data && event.data.type === 'initiateTimeJump') {
    const { tabId } = event.data;
    epochHook.testFunction();
    console.log('rootFiber ->', epochHook.componentStore[tabId]);
  }
});

window[epochHookProp] = epochHookObj;

function eatMyShorts() {
  console.log('Your shorts have been et');
}
