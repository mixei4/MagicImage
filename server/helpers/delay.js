let timers = [];

module.exports = ({id, timeout, run}) => {
	if (timers[id]) {
		clearTimeout(timers[id]);
	}
	timers[id] = setTimeout(run, timeout);
};