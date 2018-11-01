import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {startDrag, doDrag, endDrag} from '../actions/background';
import Settings from './Settings';
import './MagicImage.css';
import {isInside} from '../helpers/geometry';
import {getOffset} from '../helpers/dom';

class MagicImage extends React.Component{
	constructor(props) {
		super(props);
		this.canvas = React.createRef();
	}

	componentDidMount() {
		this.componentDidUpdate();
	}

	componentDidUpdate() {
		if (!this.props.background.image) {
			return;
		}
		if (!this.canvasContext) {
			this.canvasContext = this.canvas.current.getContext('2d');
		}
		
		this.canvasContext.fillStyle = '#fff';
		this.canvasContext.fillRect(0,0, this.canvas.width, this.canvas.height);
		this.props.settings.forEach((item) => {
			if (item.image && item.image.src) {
				this.canvasContext.save();
				this.canvasContext.beginPath();
				this.canvasContext.moveTo(item.topleft.x, item.topleft.y);
				this.canvasContext.lineTo(item.topright.x, item.topright.y);
				this.canvasContext.lineTo(item.bottomright.x, item.bottomright.y);
				this.canvasContext.lineTo(item.bottomleft.x, item.bottomleft.y);
				this.canvasContext.clip();
				this.canvasContext.fillStyle = '#f5f5f5';
				this.canvasContext.fillRect(item.xMin, item.yMin, item.xMax - item.xMin, item.yMax - item.yMin);
				this.canvasContext.translate(item.x, item.y);
				this.canvasContext.rotate(item.angle * Math.PI / 180);
				const image = item.isGray ? item.imageGray : item.isSepia ? item.imageSepia : item.image;
				const ratio = item.ratio / this.props.background.sourceRatio;
				const w = image.width;
				const h = image.height;
				this.canvasContext.drawImage(image, 0, 0, w, h, -(w * ratio / 2), -(h * ratio / 2), w * ratio, h * ratio);
				this.canvasContext.restore();
			}
		});
		this.canvasContext.drawImage(this.props.background.image, 0, 0, this.props.background.image.width, this.props.background.image.height);
		this.props.settings.forEach((item) => {
			if (item.text !== undefined) {
				this.canvasContext.save();
				this.canvasContext.beginPath();
				this.canvasContext.setLineDash([5, 10]);
				this.canvasContext.moveTo(item.topleft.x, item.topleft.y);
				this.canvasContext.lineTo(item.topright.x, item.topright.y);
				this.canvasContext.lineTo(item.bottomright.x, item.bottomright.y);
				this.canvasContext.lineTo(item.bottomleft.x, item.bottomleft.y);
				this.canvasContext.lineTo(item.topleft.x, item.topleft.y);
				this.canvasContext.strokeStyle = '#ccc';
				this.canvasContext.stroke();
				this.canvasContext.clip();
				this.canvasContext.translate(item.x, item.y);
				this.canvasContext.rotate(item.viewportAngle * Math.PI / 180);
				const lines = item.text.split('\n');
				this.canvasContext.font = item.fontSize + 'px ' + item.fontFamily;
				this.canvasContext.fillStyle = item.color;
				this.canvasContext.textAlign = 'center';
				lines.forEach((line, i) => {
					this.canvasContext.fillText(line, 0, (i + 1) * item.fontSize * 1.2); 
				});
				this.canvasContext.restore();
			}
		});
	}


	onMouseDown = (e) => {
		const ratio = this.canvas.current.width / this.canvas.current.clientWidth;
		const mouse = {
			x: (e.pageX - getOffset(this.canvas.current).left) * ratio,
			y: (e.pageY - getOffset(this.canvas.current).top) * ratio
		};
		this.props.settings.forEach((item, settingsId) => {
			if (isInside(mouse, [item.topleft, item.topright, item.bottomright, item.bottomleft])) {
				this.props.startDrag(settingsId, mouse);
			}
		});
	}

	onMouseMove = (e) => {
		const ratio = this.canvas.current.width / this.canvas.current.clientWidth;
		const mouse = {
			x: (e.pageX - getOffset(this.canvas.current).left) * ratio,
			y: (e.pageY - getOffset(this.canvas.current).top) * ratio
		};
		let cursor = 'default';
		this.props.settings.forEach((item, settingsId) => {
			if (item.isDragged) {
				this.setState(() => ({
					showDragIcons: false
				}));
				this.props.doDrag(settingsId, mouse);
			}
			if (item.isDragged || isInside(mouse, [item.topleft, item.topright, item.bottomright, item.bottomleft])) {
				cursor = 'move';
			}
		});
		if (this.canvas.current.style.cursor !== cursor) {
			this.canvas.current.style.cursor = cursor;
		}
	};

	onMouseUp = () => {
		this.props.settings.forEach((item, settingsId) => {
			if (item.isDragged) {
				this.props.endDrag(settingsId);
			}
		});
	};

	render() {
		const {settings, background} = this.props;
		return (
			<div className="magic-image">
				{!this.props.background.image ?
					<div>
						Loading...
					</div>
					:
					<>
						<div className="magic-canvas">
							<canvas
								width={background.image.width}
								height={background.image.height}
								ref={this.canvas}
								onMouseDown={this.onMouseDown}
								onMouseMove={this.onMouseMove}
								onMouseUp={this.onMouseUp}
							/>
						</div>
						<div className="magic-settings">
							{settings.map((settings, index) => <Settings key={index} id={index} {...settings} />)}
						</div>
					</>
				}
			</div>
		);
	}
}

const typePoint = PropTypes.shape({
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
});

MagicImage.propTypes = {
	background: PropTypes.shape({
		url: PropTypes.string.isRequired,
		image: PropTypes.object.isRequired,
		sourceRatio: PropTypes.number.isRequired,
	}).isRequired,
	settings: PropTypes.arrayOf(PropTypes.shape({
		type: PropTypes.oneOf(['image', 'text']).isRequired,
		color: PropTypes.string,
		topleft: typePoint.isRequired,
		topright: typePoint.isRequired,
		bottomleft: typePoint.isRequired,
		bottomright: typePoint.isRequired,
	})).isRequired
};

const mapStateToProps = ({magicImage: {background, settings}}) => ({
	background,
	settings
});

const mapDispatchToProps = (dispatch) => ({
	startDrag: (id, mouse) => dispatch(startDrag(id, mouse)),
	doDrag: (id, mouse) => dispatch(doDrag(id, mouse)),
	endDrag: (id) => dispatch(endDrag(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(MagicImage);