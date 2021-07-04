import { UserActionTypes } from './user.types';
import { httpSignin, httpSignup, httpUpdateProfile } from '../../requests/requests';

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

export const signUpStart = () => (
    {
        type: UserActionTypes.SIGN_UP_START,
    }
);

export const signUpSuccess = user => (
    {
        type: UserActionTypes.SIGN_UP_SUCCESS,
        payload: user
    }
);

export const signUpFailure = error => (
    {
        type: UserActionTypes.SIGN_UP_FAILURE,
        payload: error
    }
);

export const updateProfileStart = () => (
    {
        type: UserActionTypes.UPDATE_PROFILE_START,
    }
);

export const updateProfileSuccess = user => (
    {
        type: UserActionTypes.UPDATE_PROFILE_SUCCESS,
        payload: user
    }
);

export const updateProfileFailure = error => (
    {
        type: UserActionTypes.UPDATE_PROFILE_FAILURE,
        payload: error
    }
);

export const requestSignin = (email, password) => async (dispatch) => {
    dispatch(signInStart());
    try {
        const callAPI = await httpSignin(email, password)
        if (callAPI && callAPI.error) {
            throw new Error(callAPI.error);
        }
        dispatch(signInSuccess(callAPI))
    }catch(err) {
        dispatch(signInFailure(err.message))
    }
};

export const requestSignup = (name, birthdate, email, password) => async (dispatch) => {
    dispatch(signUpStart());
    try {
        const callAPI = await httpSignup(name, birthdate,email, password)
        if (callAPI && callAPI.error) {
            throw new Error(callAPI.error);
        }
        dispatch(signUpSuccess(callAPI))
    }catch(err) {
        dispatch(signUpFailure(err.message))
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

export const requestProfileUpdate = (id, name, email) => async (dispatch) => {
    dispatch(updateProfileStart());
    try {
        const callAPI = await httpUpdateProfile(id, name, email)
        if (callAPI && callAPI.error) {
            throw new Error(callAPI.error);
        }
        dispatch(updateProfileSuccess(callAPI))
    }catch(err) {
        dispatch(updateProfileFailure(err.message))
    }
};