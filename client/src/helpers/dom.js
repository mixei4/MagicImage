export const getOffset = (element) => {
	if (!element.getClientRects().length ) {
		return {
			top: 0,
			left: 0
		};
	}
	const rect = element.getBoundingClientRect();
	const win = element.ownerDocument.defaultView;
	return {
		top: rect.top + win.pageYOffset,
		left: rect.left + win.pageXOffset
	};
};