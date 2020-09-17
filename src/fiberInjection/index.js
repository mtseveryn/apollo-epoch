/* eslint-disable no-underscore-dangle */
/*
 The entry point for our bundle that will be injected into the DOM
 Creates windowListener that will receive messages from Epoch App / Content Script

 Keeping this out of the NPM package to keep it lightweight -- Also keeps from
 attaching and monitoring things in production
*/

import ApolloClientStore from './componentStore';

const epochHookProp = '__APOLLO_EPOCH_FIBER_HOOK';
const epochHookObj = {
  clientStore: new ApolloClientStore(),
  testFunction: eatMyShorts,
};

console.log('INJECTED SCRIPT EPOCH IS HERE');

window[epochHookProp] = epochHookObj;

function eatMyShorts() {
  console.log('Your shorts have been et');
}
