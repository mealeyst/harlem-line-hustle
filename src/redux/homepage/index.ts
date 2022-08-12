import { INITIAL_STATE, SLICE } from './slice';

const { name, reducer, actions } = SLICE;

export { name, reducer, actions, INITIAL_STATE };

export * as selectors from './selectors';

