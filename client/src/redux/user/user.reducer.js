import {UserActionTypes} from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    isPending: false,
    error: null,
    message: null
};

export const userReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case UserActionTypes.SIGN_IN_START:
        case UserActionTypes.SIGN_OUT_START:
        case UserActionTypes.SIGN_UP_START:
        case UserActionTypes.UPDATE_PROFILE_START:
        case UserActionTypes.DELETE_PROFILE_START:
            return {
                ...state,
                isPending: true
            }
        case UserActionTypes.SIGN_IN_SUCCESS:
        case UserActionTypes.SIGN_OUT_SUCCESS:
        case UserActionTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                isPending: false
            }
        case UserActionTypes.UPDATE_PROFILE_SUCCESS:
        case UserActionTypes.DELETE_PROFILE_SUCCESS:
            return {
                ...state,
                message: action.payload,
                isPending: false
            }
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
        case UserActionTypes.UPDATE_PROFILE_FAILURE:
        case UserActionTypes.DELETE_PROFILE_FAILURE:
            return {
                ...state,
                error: action.payload,
                isPending: false
            }
        default: 
            return state;
    }
};