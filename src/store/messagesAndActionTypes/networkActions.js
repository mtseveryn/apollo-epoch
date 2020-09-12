import { createAction } from '@reduxjs/toolkit';

// Action Types
export const COMPOSE_NETWORK_QUERY = 'appendSnapshot';
export const TAKE_STATE_SNAPSHOT = 'takeSnapshot';

// Action Creators
export const composeNetworkQuery = createAction(COMPOSE_NETWORK_QUERY);
export const takeStateSnapshot = createAction(TAKE_STATE_SNAPSHOT);
