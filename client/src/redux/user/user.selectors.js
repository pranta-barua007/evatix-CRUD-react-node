import {createSelector} from 'reselect';

const selectUser = state => state.user;

export const selectUserIsPending = createSelector(
    [selectUser],
    (user) => user.isPending
);

export const selectCurrentUser = createSelector(
    [selectUser],
    (user) => user.currentUser
);