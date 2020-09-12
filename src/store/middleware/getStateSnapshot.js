/* eslint-disable consistent-return */
import { takeStateSnapshot } from '../messagesAndActionTypes/networkActions';
import { ERROR } from '../messagesAndActionTypes/loggerActions';

const takeSnapshot = ({ getState, dispatch }) => (next) => async (action) => {
  if (action.type !== takeStateSnapshot.type) return next(action);

  try {
    console.log('Trying to getSnapshot');
    const { onSuccess, data: isManualFetch } = action.payload;
    const state = getState().apollo;
    let apolloActionKey;
    if (isManualFetch) apolloActionKey = `F${state.fetchCounter + 1}`;
    else {
      apolloActionKey = 'BLEH BLEH BLEH';
    }

    const rootFiber = await getAsyncFiberRoot();

    dispatch({ type: onSuccess, payload: { apolloActionKey, rootFiber } });
    console.log('Dispatched Successful SnapShot');
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
    console.log('Calling async Root get');
    chrome.devtools.inspectedWindow.eval(
      `document.getElementById('root')._reactRootContainer._internalRoot`,
      (rootFiber) => {
        console.log('Root in Async -> ', rootFiber);
        resolve(rootFiber);
      }
    );
  });
}
