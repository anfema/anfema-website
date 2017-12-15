import { Vertex2 } from './types';
export function vertex(v) {
	return function(p) {
		return v;
	};
}
export function to(v0, v1) {
	const v = new Vertex2();
	return function(p) {
		return v.lerp(v0(p), v1(p), p);
	};
}
export function cut(a0, a1, b0, b1) {
	const v = new Vertex2();
	return function(p) {
		return v.intersection(a0(p), a1(p), b0(p), b1(p));
	};
}
//# sourceMappingURL=calculations.js.map
