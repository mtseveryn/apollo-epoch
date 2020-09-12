/* eslint-disable consistent-return */
import { takeStateSnapshot } from '../messagesAndActionTypes/networkActions';
import { ERROR } from '../messagesAndActionTypes/loggerActions';

const takeSnapshot = ({ getState, dispatch }) => (next) => async (action) => {
  if (action.type !== takeStateSnapshot.type) return next(action);

  try {
    const { onSuccess, data: isManualFetch } = action.payload;
    const state = getState().apollo;
    let apolloActionKey;
    if (isManualFetch) apolloActionKey = `F${state.fetchCounter + 1}`;
    else {
      apolloActionKey = 'BLEH BLEH BLEH';
    }

    const rootFiber = await getAsyncFiberRoot();

    dispatch({ type: onSuccess, payload: { apolloActionKey, rootFiber } });
  } catch (e) {
    dispatch({
      type: ERROR,
      payload: { title: 'Problem Fetching Root Fiber', message: e.message, error: e },
    });
  }
};

export default takeSnapshot;

/*
-----------------------
  HELPER
-----------------------
*/

function getAsyncFiberRoot() {
  return new Promise((resolve, reject) => {
    chrome.devtools.inspectedWindow.eval(
      'window.__REACT_DEVTOOLS_GLOBAL_HOOK__getFiberRoots(1).values().next().value',
      (rootFiber) => {
        resolve(rootFiber);
      }
    );
  });
}
