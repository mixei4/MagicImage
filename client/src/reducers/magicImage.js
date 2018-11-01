import types from '../actions/magicImageTypes';
import {dist} from '../helpers/geometry';

const getBaseSettings = (placeholder) => {
	let settings = Object.assign({}, placeholder);
	settings = Object.assign(settings, {
		active: false,
		xMin: Math.min(settings.topleft.x, settings.topright.x, settings.bottomright.x, settings.bottomleft.x),
		yMin: Math.min(settings.topleft.y, settings.topright.y, settings.bottomright.y, settings.bottomleft.y),
		xMax: Math.max(settings.topleft.x, settings.topright.x, settings.bottomright.x, settings.bottomleft.x),
		yMax: Math.max(settings.topleft.y, settings.topright.y, settings.bottomright.y, settings.bottomleft.y),
		x: Math.round((settings.topleft.x + settings.topright.x + settings.bottomright.x + settings.bottomleft.x) / 4),
		y: Math.round((settings.topleft.y + settings.topright.y + settings.bottomright.y + settings.bottomleft.y) / 4),
		width: dist(settings.topleft, settings.topright),
		height: dist(settings.topleft, settings.bottomleft),
		viewportAngle: settings.bottomleft.y - settings.topleft.y === 0 ? 0 :
			-Math.atan((settings.bottomleft.x - settings.topleft.x)/(settings.bottomleft.y - settings.topleft.y)) * 180 / Math.PI
	});
	return settings;
};

const combineSettingsState = (state, settingsId, newSettings) => {
	return {...state, settings: [
		...state.settings.slice(0, settingsId),
		{
			...state.settings[settingsId],
			...newSettings
		},
		...state.settings.slice(settingsId + 1)
	]};
};

export default (state = {}, action) => {
	switch (action.type) {
		case types.FETCH_BACKGROUND_SUCCESS:
			return {...state, background: action.background, error: false};
		case types.FETCH_BACKGROUND_FAILURE:
			return {...state, error: 'Can\'t load background image.'};
		case types.FETCH_SETTINGS_SUCCESS: {
			const settingsArray = [];
			action.placeholders.forEach((placeholder) => {
				let settings = getBaseSettings(placeholder);
				if (placeholder.type === 'image') {
					settings = Object.assign(settings, {
						image: new Image(),
						imageGray: null,
						imageSepia: null,
						isGray: false,
						isSepia: false,
						angle: 0,
						ratio: 1,
						isDragged: false,
						xStartDrag: 0,
						yStartDrag: 0
					});
				} else if (placeholder.type === 'text') {
					settings = Object.assign(settings, {
						x: (settings.topleft.x + settings.topright.x) / 2,
						y: (settings.topleft.y + settings.topright.y) / 2,
						text: '',
						fontFamily: 'Arial',
						fontSize: 24
					});
				} else {
					throw new Error('Unknown placeholder type.');
				}
				settingsArray.push(settings);
			});
			return {...state, error: false, settings: settingsArray};
		}
		case types.FETCH_SETTINGS_FAILURE:
			return {...state, error: 'Error loading settings'};
		case types.CHANGE_SETTINGS_FILE_START:
			return combineSettingsState(state, action.settingsId, {
				active: false
			});
		case types.CHANGE_SETTINGS_FILE_SUCCESS: {
			const settings = state.settings[action.settingsId];
			const newSettings = {
				active: true,
				fileName: action.file.name,
				x: Math.round((settings.topleft.x + settings.topright.x + settings.bottomright.x + settings.bottomleft.x) / 4),
				y: Math.round((settings.topleft.y + settings.topright.y + settings.bottomright.y + settings.bottomleft.y) / 4),
				image: action.image,
				imageGray: action.imageGray,
				imageSepia: action.imageSepia,
				angle: settings.viewportAngle,
				ratio: Math.min(2, Math.max(settings.width / action.image.width, settings.height / action.image.height) * state.background.sourceRatio),
			};
			return combineSettingsState(state, action.settingsId, newSettings);
		}
		case types.CHANGE_SETTINGS_FILE_FAILURE:
			return combineSettingsState(state, action.settingsId, {
				active: false
			});
		case types.CHANGE_SETTINGS_FILTER:
			return combineSettingsState(state, action.settingsId, {
				isGray: action.filterType === 1,
				isSepia: action.filterType === 2
			});
		case types.CHANGE_SETTINGS_RATIO:
			return combineSettingsState(state, action.settingsId, {
				ratio: action.ratio
			});
		case types.CHANGE_SETTINGS_ANGLE:
			return combineSettingsState(state, action.settingsId, {
				angle: action.angle
			});
		case types.CHANGE_SETTINGS_TEXT:
			return combineSettingsState(state, action.settingsId, {
				text: action.text
			});
		case types.CHANGE_SETTINGS_FONT_SIZE:
			return combineSettingsState(state, action.settingsId, {
				fontSize: action.fontSize
			});
		case types.CHANGE_SETTINGS_FONT_FAMILY:
			return combineSettingsState(state, action.settingsId, {
				fontFamily: action.fontFamily
			});
		case types.START_DRAG:
			return combineSettingsState(state, action.settingsId, {
				isDragged: true,
				mouse: action.mouse
			});
		case types.DO_DRAG: {
			const settings = state.settings[action.settingsId];
			return combineSettingsState(state, action.settingsId, {
				x: settings.x + action.mouse.x - settings.mouse.x,
				y: settings.y + action.mouse.y - settings.mouse.y,
				mouse: action.mouse
			});
		}
		case types.END_DRAG:
			return combineSettingsState(state, action.settingsId, {
				isDragged: false
			});
		default:
			return state;
	}
};