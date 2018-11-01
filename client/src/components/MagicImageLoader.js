import React from 'react';
import PropTypes from 'prop-types';
import MagicImage from './MagicImage';
import {connect} from 'react-redux';
import {fetchMagicImage} from '../actions/magicImage';

class MagicImageLoader extends React.Component{
	componentDidMount() {
		this.props.fetchMagicImage(this.props.imageId);
	}

	render() {
		return (
			this.props.background && this.props.background.image ? <MagicImage /> : <div>Loading...</div>
		);
	}
}
MagicImageLoader.propTypes = {
	background: PropTypes.shape({
		url: PropTypes.string.isRequired,
		image: PropTypes.object,
		sourceRatio: PropTypes.number.isRequired
	}),
	imageId: PropTypes.number.isRequired,
	fetchMagicImage: PropTypes.func.isRequired
};

const mapStateToProps = ({magicImage: {background}}) => ({
	background,
});

const mapDispatchToProps = (dispatch) => ({
	fetchMagicImage: (id) => dispatch(fetchMagicImage(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MagicImageLoader);