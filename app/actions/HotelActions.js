import * as types from './actionConstants';

export const closeNotifAction = branch => ({
  branch,
  type: `${branch}/${types.CLOSE_NOTIF}`
});
