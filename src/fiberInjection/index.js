/* eslint-disable no-underscore-dangle */
/*
 The entry point for our bundle that will be injected into the DOM
 Creates windowListener that will receive messages from Epoch App / Content Script
*/

// To Do - Implement custom deep clone function
import { cloneDeep } from 'lodash'; // importing just the cloneDeep package throws a range Error when run...so all this must go in the DOM
import Tardis from './Tardis';
import CustomFiberTree from './CustomFiberTree';

const epochHookProp = '__APOLLO_EPOCH_FIBER_HOOK';
const epochHookObj = {
  apolloHistory: new Tardis(),
  testFunction: eatMyShorts,
};

console.log('INJECTED SCRIPT EPOCH IS HERE');

window.addEventListener('message', (event) => {
  if (event.source !== window) return;
  const epochHook = window[epochHookProp];

  if (event.data && event.data.type === '$$$initializeComponentStoreScript$$$') {
    console.log('Initializing Component Store');

    const { historicalComponents, historicalClients } = epochHook.apolloHistory;

    const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    const hostRootFiber = devTools.getFiberRoots(1).values().next().value;
    console.log('STARTING FIBER TREE');
    const initialFiberSnapshot = new CustomFiberTree(
      hostRootFiber,
      historicalComponents,
      'initialState'
    );
    console.log('INITIAL FIBER TREE CREATED -> ', initialFiberSnapshot);

    const apolloClientObj = window.__APOLLO_CLIENT__;
    const apolloClientClone = cloneDeep(apolloClientObj);
    historicalClients.addHistoricalClient(apolloClientClone, 'initialClient');
    console.log('CLONE -> ', apolloClientClone);
    window.postMessage(
      { type: '$$$saveSnapshot$$$', payload: JSON.stringify(initialFiberSnapshot) },
      '*'
    );
  }

  if (event.data && event.data.type === '$$$getFiberTree$$$') {
    console.log('GETTING ROOT FIBER');
    const { historicalClients, historicalComponents } = epochHook.apolloHistory;
    const apolloActionId = event.data.payload;
    const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    const hostRootFiber = devTools.getFiberRoots(1).values().next().value;
    const initialFiberSnapshot = new CustomFiberTree(
      hostRootFiber,
      historicalComponents,
      apolloActionId
    );
    console.log('USER FIBER TREE CREATED -> ', initialFiberSnapshot);

    const apolloClientObj = window.__APOLLO_CLIENT__;
    const apolloClientClone = cloneDeep(apolloClientObj);
    historicalClients.addHistoricalClient(apolloClientClone, 'initialClient');
    console.log('CLONE -> ', apolloClientClone);
    window.postMessage(
      { type: '$$$saveSnapshot$$$', payload: JSON.stringify(initialFiberSnapshot) },
      '*'
    );
  }

  if (event.data && event.data.type === 'initiateTimeJump') {
    const { apolloActionId } = event.data.payload;
    epochHook.testFunction();
    const { historicalClients, historicalComponents } = epochHook.apolloHistory;
    // console.log('rootFiber ->', historicalComponents[apolloActionId]);
    console.log('historicalClient ->', historicalClients[apolloActionId]);
  }
});

window[epochHookProp] = epochHookObj;

function eatMyShorts() {
  console.log('Your shorts have been et');
}
