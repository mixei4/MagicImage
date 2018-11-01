const eps = 1e-4;

const less = (q, w) => {
	return q < w - eps;
};

const sSignedDoubled = (p1, p2, p3) => {
	return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
};

const sSign = (p1, p2, p3) => {
	var s = sSignedDoubled(p1, p2, p3);
	return less(s, 0) ? -1 : less(0, s) ? 1 : 0;
};

export const isInside = (p, points) => {
	const pointsCircle = points.slice(0, points.length);
	pointsCircle.push(points[0]);
	var sign = 0;
	for(var i = 0; i < pointsCircle.length - 1; i++) {
		var signI = sSign(pointsCircle[i], pointsCircle[i+1], p);
		if (i === 0) {
			sign = signI;
		} else if (sign !== signI) {
			sign = 9;
			break;
		}
	}
	return sign !== 9;
};

const sqr = (q) => {
	return q * q;
};

export const dist = (q, w) => {
	return Math.sqrt(sqr(q.x - w.x) + sqr(q.y - w.y));
};