/* eslint-disable func-names */
/*
  This module creates a store for unserializable apollo client snapshots taken from the apollo client contenxt.
  This store will live in the DOM on the Epoch Hook

------------------
  Data Structure
------------------

ApolloClientStore = {

  [apolloActionId]: {apolloClientObjClone} //Apollo Action IDs correspond to the queries, mutations, or manual fetches that triggered the snap
}

*/

function ApolloClientStore() {
  const clientObjs = {};

  Object.defineProperties(this, {
    historicalClients: {
      get() {
        return clientObjs;
      },
    },
  });
}

// This was a lot more complex when we were getting and storing the React Fiber Tree
/// These can be refactored into methods on the main object -- if they're needed at all
ApolloClientStore.prototype.addClientClone = function (clientObj, apolloActionId) {
  this.historicalClients[apolloActionId] = clientObj;
  return clientObj;
};

ApolloClientStore.prototype.getClientClone = function (apolloActionId) {
  return this.historicalClients[apolloActionId];
};

console.log('APOLLO CLIENT STORE IS INJECTED!');
export default ApolloClientStore;
