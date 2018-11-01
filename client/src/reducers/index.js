import {combineReducers} from 'redux';
import magicImageReducer from './magicImage';

export default combineReducers({
	magicImage: magicImageReducer,
});