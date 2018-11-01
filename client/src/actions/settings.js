import types from './magicImageTypes';
import {grayscalePixels, sepiaPixels, getFilteredImage} from '../helpers/imageFilters';

export const fetchSettingsSuccess = (placeholders) => ({
	type: types.FETCH_SETTINGS_SUCCESS,
	placeholders
});

export const fetchSettingsFailure = () => ({
	type: types.FETCH_SETTINGS_FAILURE
});

export const changeSettingsFileStart = (settingsId) => ({
	type: types.CHANGE_SETTINGS_FILE_START,
	settingsId,
});

export const changeSettingsFileSuccess = (settingsId, file, image, imageGray, imageSepia) => ({
	type: types.CHANGE_SETTINGS_FILE_SUCCESS,
	settingsId,
	file,
	image,
	imageGray,
	imageSepia
});

export const changeSettingsFileFailure = (settingsId) => ({
	type: types.CHANGE_SETTINGS_FILE_FAILURE,
	settingsId
});

export const changeSettingsFile = (settingsId, file) => (dispatch) => {
	try {
		if (file) {
			dispatch(changeSettingsFileStart(settingsId));
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (e) => {
				const image = new Image();
				image.src = e.target.result;
				image.onload = async () => {
					const imageGray = await getFilteredImage(image, grayscalePixels);
					const imageSepia = await getFilteredImage(image, sepiaPixels);
					dispatch(changeSettingsFileSuccess(settingsId, file, image, imageGray, imageSepia));
				};
			};
		}
	} catch (error) {
		dispatch(changeSettingsFileFailure(settingsId));
	}
};

export const changeSettingsFilter = (settingsId, filterType) => ({
	type: types.CHANGE_SETTINGS_FILTER,
	settingsId,
	filterType
});

export const changeSettingsRatio = (settingsId, ratio) => ({
	type: types.CHANGE_SETTINGS_RATIO,
	settingsId,
	ratio
});

export const changeSettingsAngle = (settingsId, angle) => ({
	type: types.CHANGE_SETTINGS_ANGLE,
	settingsId,
	angle
});

export const changeSettingsText = (settingsId, text) => ({
	type: types.CHANGE_SETTINGS_TEXT,
	settingsId,
	text
});

export const changeSettingsFontSize = (settingsId, fontSize) => ({
	type: types.CHANGE_SETTINGS_FONT_SIZE,
	settingsId,
	fontSize
});

export const changeSettingsFontFamily = (settingsId, fontFamily) => ({
	type: types.CHANGE_SETTINGS_FONT_FAMILY,
	settingsId,
	fontFamily
});