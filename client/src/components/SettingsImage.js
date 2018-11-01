import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {changeSettingsFile, changeSettingsFilter, changeSettingsRatio, changeSettingsAngle} from '../actions/settings';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import SettingsRadio from './SettingsRadio';

class SettingsImage extends React.Component{
	constructor(props) {
		super(props);
		this.canvas = React.createRef();
		this.fileInput = React.createRef();
	}

	onChangeFile = () => {
		const input = this.fileInput.current;
		if (input.files && input.files[0]) {
			if (input.files && input.files[0]) {
				this.props.changeSettingsFile(this.props.id, input.files[0]);
			}
		}
	};

	onChangeFilter = (e) => {
		this.props.changeSettingsFilter(this.props.id, parseInt(e.target.value, 10));
	};

	onChangeRatio = (ratio) => {
		this.props.changeSettingsRatio(this.props.id, ratio);
	};

	onChangeAngle = (angle) => {
		this.props.changeSettingsAngle(this.props.id, angle);
	};

	componentDidMount() {
		this.canvasContext = this.canvas.current.getContext('2d');
	}

	componentDidUpdate() {
		const {settings} = this.props;
		this.canvasContext.clearRect(0, 0, 100, 75);
		var image = settings.isGray ? settings.imageGray : settings.isSepia ? settings.imageSepia : settings.image;
		var ratio = Math.max(image.width / 100, image.height / 75);
		var width = Math.round(image.width / ratio);
		var height = Math.round(image.height / ratio);
		this.canvasContext.drawImage(image, Math.round((100-width)/2), Math.round((75-height)/2), width, height);
	}

	render() {
		const {settings} = this.props;
		return (
			<div className={classnames('settings-item', 'settings-item_image', {'settings-item_active': settings.active})}>
				<div className="settings-item__caption">Upload and setup an image:</div>
				<div className="settings-item__file">
					<div className="custom-upload">
						<input type="file" name="ownfile[]" onChange={this.onChangeFile} ref={this.fileInput} />
						<canvas width="100" height="75" ref={this.canvas}></canvas>
						<div className="fake-file"><input disabled="disabled" /></div>
					</div>
					<div className="settings-item__file-descr">
						<div className="settings-item__file-descr-inner">
							<div className="settings-item__file-name">{settings.fileName}</div>
							<div className="settings-item__reset" onClick={this.onChangeFile}>reset settings</div>
							<div className="settings-item__delimiter"></div>
							{settings.ratio > 1.2 &&
								<div className="settings-item__file-quality">Image is small. Print quality may be low!</div>
							}
						</div>
					</div>
				</div>
				<div className="settings-item__slider-wrap settings-item__ratio">
					<div className="icon"><i className="fas fa-expand-arrows-alt"></i></div>
					<div className="slider-wrap">
						Size:
						<Slider
							min={0.01}
							max={2}
							step={0.001}
							tooltip={false}
							value={settings.ratio}
							onChange={this.onChangeRatio}
						/>
					</div>
				</div>
				<div className="settings-item__slider-wrap settings-item__angle">
					<div className="icon"><i className="fas fa-redo-alt"></i></div>
					<div className="slider-wrap">
						Orientation:
						<Slider
							min={-180}
							max={180}
							step={0.1}
							tooltip={false}
							value={settings.angle}
							onChange={this.onChangeAngle}
						/>
					</div>
				</div>
				<div className="settings-item__filters">
					Color:
					<SettingsRadio name="image-filter" value="0" onChange={this.onChangeFilter} checked={!settings.isGray && !settings.isSepia}>Original</SettingsRadio>
					<SettingsRadio name="image-filter" value="1" onChange={this.onChangeFilter} checked={settings.isGray}>Black and white</SettingsRadio>
					<SettingsRadio name="image-filter" value="2" onChange={this.onChangeFilter} checked={settings.isSepia}>Sepia</SettingsRadio>
				</div>
			</div>
		);
	}
}

SettingsImage.propTypes = {
	id: PropTypes.number.isRequired,
	settings: PropTypes.shape({
		active: PropTypes.bool.isRequired,
		ratio: PropTypes.number,
		angle: PropTypes.number,
	}).isRequired,
	changeSettingsFile: PropTypes.func.isRequired,
	changeSettingsFilter: PropTypes.func.isRequired,
	changeSettingsRatio: PropTypes.func.isRequired,
	changeSettingsAngle: PropTypes.func.isRequired,
};

const mapStateToProps = ({magicImage: {settings}}, props) => ({
	settings: settings[props.id]
});

const mapDispatchToProps = (dispatch) => ({
	changeSettingsFile: (id, file) => dispatch(changeSettingsFile(id, file)),
	changeSettingsFilter: (id, filter) => dispatch(changeSettingsFilter(id, filter)),
	changeSettingsRatio: (id, ratio) => dispatch(changeSettingsRatio(id, ratio)),
	changeSettingsAngle: (id, angle) => dispatch(changeSettingsAngle(id, angle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsImage);