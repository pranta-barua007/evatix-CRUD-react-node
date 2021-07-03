import { UserActionTypes } from './user.types';
import { httpSigin } from '../../requests/requests';

export const signInStart = () => (
    {
        type: UserActionTypes.SIGN_IN_START,
    }
);

export const signInSuccess = user => (
    {
        type: UserActionTypes.SIGN_IN_SUCCESS,
        payload: user
    }
);

export const signInFailure = error => (
    {
        type: UserActionTypes.SIGN_IN_FAILURE,
        payload: error
    }
);

export const signOutStart = () => (
    {
        type: UserActionTypes.SIGN_OUT_START,
    }
);

export const signOutSuccess = () => (
    {
        type: UserActionTypes.SIGN_OUT_SUCCESS,
        payload: null
    }
);

export const signOutFailure = error => (
    {
        type: UserActionTypes.SIGN_OUT_FAILURE,
        payload: error
    }
);


export const requestSignin = (email, password) => async (dispatch) => {
    dispatch(signInStart());
    try {
        const callAPI = await httpSigin(email, password)
        if (callAPI && callAPI.error) {
            throw new Error(callAPI.error);
        }
        dispatch(signInSuccess(callAPI))
    }catch(err) {
        dispatch(signInFailure(err.message))
    }
};


export const requestSignOut = () => (dispatch) => {
    dispatch(signOutStart());
    try {
        dispatch(signOutSuccess());
    } catch (error) {
        dispatch(signOutFailure(error))
    }
};