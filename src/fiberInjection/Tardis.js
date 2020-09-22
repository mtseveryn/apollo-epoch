/* eslint-disable func-names */
/*
  This module creates a store for unserializable component data, organized by tabID, that will live in the DOM

*/

import ComponentStore from './ComponentStore';
import ClientStore from './ClientStore';

function Tardis() {
  const historicalComponents = new ComponentStore();
  const historicalClients = new ClientStore();

  Object.defineProperties(this, {
    historicalComponents: {
      get() {
        return historicalComponents;
      },
    },

    historicalClients: {
      get() {
        return historicalClients;
      },
    },
  });
}

// Allowing for flixibilit in adds due to time constraints -- no time to refactor -- ToDo: refactor custom Treeß
Tardis.prototype.addComponent = function (stateDataStructure, actualComponent, treeId) {
  // Create stateObj -- cover Hooks Cases (array of states), and class cases (state Obj)
  this.historicalComponents.addComponent(stateDataStructure, actualComponent, treeId);
};

Tardis.prototype.getComponent = function (componentId) {
  return this.historicalComponents[componentId];
};

Tardis.prototype.getHistoricalClient = function (apolloActionId) {
  return this.historicalClients[apolloActionId];
};
Tardis.prototype.addHistoricalClient = function (clientClone, apolloActionId) {
  this.historicalClients[apolloActionId] = clientClone;
};

console.log('COMPONENT STORE IS INJECTED!');
export default Tardis;
