import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {changeSettingsText, changeSettingsFontSize, changeSettingsFontFamily} from '../actions/settings';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import './fonts.css';
import SettingsRadio from './SettingsRadio';

class SettingsText extends React.Component{
	onChangeText = (e) => {
		this.props.changeSettingsText(this.props.id, e.target.value);
	};

	onChangeFontSize = (fontSize) => {
		this.props.changeSettingsFontSize(this.props.id, fontSize);
	};

	onChangeFontFamily = (e) => {
		this.props.changeSettingsFontFamily(this.props.id, e.target.value);
	};

	componentDidUpdate() {
	}

	render() {
		const {settings} = this.props;
		return (
			<div className={classnames('settings-item', 'settings-item_text', {'settings-item_active': settings.active})}>
				<div className="settings-item__textinput">
					<textarea placeholder="Input text" onChange={this.onChangeText}></textarea>
				</div>
				<div className="settings-item__slider-wrap settings-item__fontsize">
					<div className="icon"><i className="fas fa-font"></i></div>
					<div className="slider-wrap">
						Size:
						<Slider
							min={10}
							max={100}
							step={1}
							tooltip={false}
							value={settings.fontSize}
							onChange={this.onChangeFontSize}
						/>
					</div>
				</div>
				<div className="settings-item__font">
					Font:
					<SettingsRadio name="text-font" value="Roboto" isFont={true} onChange={this.onChangeFontFamily} checked={settings.fontFamily === 'Roboto'}>Roboto</SettingsRadio>
					<SettingsRadio name="text-font" value="Allura" isFont={true} onChange={this.onChangeFontFamily} checked={settings.fontFamily === 'Allura'}>Allura</SettingsRadio>
					<SettingsRadio name="text-font" value="Corben" isFont={true} onChange={this.onChangeFontFamily} checked={settings.fontFamily === 'Corben'}>Segoe</SettingsRadio>
				</div>
			</div>
		);
	}
}

SettingsText.propTypes = {
	id: PropTypes.number.isRequired,
	settings: PropTypes.shape({
		active: PropTypes.bool.isRequired,
	}).isRequired,
	changeSettingsText: PropTypes.func.isRequired,
	changeSettingsFontSize: PropTypes.func.isRequired,
	changeSettingsFontFamily: PropTypes.func.isRequired,
};

const mapStateToProps = ({magicImage: {settings}}, props) => ({
	settings: settings[props.id]
});

const mapDispatchToProps = (dispatch) => ({
	changeSettingsText: (id, text) => dispatch(changeSettingsText(id, text)),
	changeSettingsFontSize: (id, fontSize) => dispatch(changeSettingsFontSize(id, fontSize)),
	changeSettingsFontFamily: (id, fontFamily) => dispatch(changeSettingsFontFamily(id, fontFamily)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsText);