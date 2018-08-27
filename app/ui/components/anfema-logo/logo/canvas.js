import * as animation from './animation';
export function computeScaleFactor(context, options) {
	const canvas = context.canvas;
	const offset = options.outlineMode ? Math.ceil(options.strokeWidth / 2) : 0;
	return (
		Math.min(canvas.width, canvas.height) /
		Math.max(animation.boundingBox.w + offset, animation.boundingBox.h + offset)
	);
}
export function updateCanvas(context, options) {
	const canvas = context.canvas;
	const style = canvas.ownerDocument.defaultView.getComputedStyle(canvas);
	canvas.width =
		canvas.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
	canvas.height = canvas.clientHeight - parseFloat(style.paddingTop);
	-parseFloat(style.paddingBottom);
	context.lineJoin = 'round';
	context.lineCap = 'round';
	context.strokeStyle = options.strokeColor;
	if (options.outlineMode) {
		context.lineWidth = options.strokeWidth;
	} else {
		context.lineWidth = 0;
	}
}
export function clearCanvas(context, options) {
	const canvas = context.canvas;
	if (options.backgroundColor) {
		context.fillStyle = options.backgroundColor;
		context.fillRect(0, 0, canvas.width, canvas.height);
	} else {
		context.clearRect(0, 0, canvas.width, canvas.height);
	}
}
//# sourceMappingURL=canvas.js.map
