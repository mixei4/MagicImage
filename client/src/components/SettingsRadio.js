import React from 'react';
import PropTypes from 'prop-types';

const SettingsRadio = (props) => {
	const id = props.id ? props.id : props.name + Math.floor(Math.random() * 1000000);
	const style = props.isFont ? {fontFamily: props.value} : {};
	return (
		<div className="form-check">
			<input className="form-check-input" type="radio" name={props.name} id={id} value={props.value} onChange={props.onChange} checked={props.checked} />
			<label className="form-check-label" htmlFor={id} style={style}>
				{props.children}
			</label>
		</div>
	);
};

SettingsRadio.propTypes = {
	name: PropTypes.string.isRequired,
	id: PropTypes.string,
	value: PropTypes.string.isRequired,
	isFont: PropTypes.bool,
	checked: PropTypes.bool,
	children: PropTypes.node.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default SettingsRadio;