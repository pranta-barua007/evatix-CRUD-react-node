import {UserActionTypes} from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    isPending: false,
    error: null
};

export const userReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case UserActionTypes.SIGN_IN_START:
        case UserActionTypes.SIGN_OUT_START:
            return {
                ...state,
                isPending: true
            }
        case UserActionTypes.SIGN_IN_SUCCESS:
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                isPending: false
            }
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
            return {
                ...state,
                error: action.payload,
                isPending: false
            }
        default: 
            return state;
    }
}