import types from './magicImageTypes';

export const fetchBackgroundSuccess = (background) => ({
	type: types.FETCH_BACKGROUND_SUCCESS,
	background
});

export const fetchBackgroundFailure = () => ({
	type: types.FETCH_BACKGROUND_FAILURE
});

export const fetchBackground = (background) => (dispatch) => {
	try {
		background.image = new Image();
		background.image.src = background.url;
		background.image.onload = () => dispatch(fetchBackgroundSuccess(background));
	} catch (error) {
		dispatch(fetchBackgroundFailure());
	}
};

export const startDrag = (settingsId, mouse) => ({
	type: types.START_DRAG,
	settingsId,
	mouse,
});

export const doDrag = (settingsId, mouse) => ({
	type: types.DO_DRAG,
	settingsId,
	mouse,
});

export const endDrag = (settingsId,) => ({
	type: types.END_DRAG,
	settingsId,
});