import {
	loginStart,
	loginFailure,
	loginSuccess
} from './userRedux';
import {
	registerSuccess,
	registerFailure
} from './registerRedux';
import {publicRequest, userRequest} from '../requestMethods';

export const login = async (dispatch, user) => {
	dispatch(loginStart());
	try {
		const res = await publicRequest.post('/auth/login', user);
		dispatch(loginSuccess(res.data));
	} catch(err) {
		dispatch(loginFailure());
	}
};

export const register = async (dispatch, newUser) => {
	try {
		const res = await userRequest.post('/auth/register', newUser);
		dispatch(registerSuccess(res.data));
	} catch(err) {
		dispatch(registerFailure());
	}
};