import { createAction, createReducer } from '@reduxjs/toolkit';
import { takeStateSnapshot } from '../messagesAndActionTypes/networkActions';

const initialState = {
  snapshotTrees: {}, // {key: snapShotId Value: CustomFiberTree}
  snapshotIds: [], // an array of snapShotIds that correspond to the apollo actions that triggered them
};

/*--------------
  ACTION TYPES
----------------*/

const FIBER_RECEIVED = 'fiberReceived';

/*----------------
  ACTION CREATORS
------------------*/
// eslint-disable-next-line import/prefer-default-export
export const fiberReceived = createAction(FIBER_RECEIVED); // payload: apollo action ID (query, mutation, or manualFetch)

/*--------------
  REDUCER
----------------*/
const fiberSnapshotReducer = createReducer(initialState, {
  [FIBER_RECEIVED]: fiberReceivedCase,
});

/*--------------
  REDUCER CASES
----------------*/
function fiberReceivedCase(state, action) {
  console.log('Root Fiber -> ', action.payload);
}

export default fiberSnapshotReducer;

/*--------------------
  ACTION GENERATORS
--------------------*/

export const getRootFiber = (payload) =>
  takeStateSnapshot({
    data: payload.manualFetch,
    onSuccess: FIBER_RECEIVED,
  });
