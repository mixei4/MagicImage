import {fetchBackground, fetchBackgroundFailure} from './background';
import {fetchSettingsSuccess, fetchSettingsFailure} from './settings';

export const fetchMagicImage = (id) => async (dispatch) => {
	try {
		id = parseInt(id, 10);
		const res = await fetch(`/image/${id}`);
		const data = await res.json();
		
		if (data.background) {
			dispatch(fetchBackground(data.background));
		} else {
			dispatch(fetchBackgroundFailure());
		}
		if (data.placeholders && data.placeholders.length) {
			dispatch(fetchSettingsSuccess(data.placeholders));
		} else {
			dispatch(fetchSettingsFailure());
		}
	} catch(err) {
		throw Error(err);
	}
};
