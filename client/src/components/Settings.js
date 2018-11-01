import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SettingsImage from './SettingsImage';
import SettingsText from './SettingsText';

class Settings extends React.Component{
	render() {
		const {settings} = this.props;
		return <>
			{settings.type === 'image' && <SettingsImage id={this.props.id}></SettingsImage>}
			{settings.type === 'text' && <SettingsText id={this.props.id}></SettingsText>}
		</>;
	}
}

Settings.propTypes = {
	id: PropTypes.number.isRequired,
	type: PropTypes.oneOf(['image', 'text']).isRequired,
	settings: PropTypes.shape({
		active: PropTypes.bool.isRequired,
		ratio: PropTypes.number,
		angle: PropTypes.number,
	}).isRequired,
};

const mapStateToProps = ({magicImage: {settings}}, props) => ({
	settings: settings[props.id]
});

export default connect(mapStateToProps)(Settings);