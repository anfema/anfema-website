import { Shape, Vertex2 } from './types';
import { vertex, to, cut } from './calculations';
export const boundingBox = {
	w: 240,
	h: 240,
};
const v00 = vertex(new Vertex2(0, 240));
const v01 = vertex(new Vertex2(80, 240));
const v02 = vertex(new Vertex2(160, 240));
const v03 = vertex(new Vertex2(240, 240));
const v04 = vertex(new Vertex2(160, 39.9));
const v05 = vertex(new Vertex2(148.6, 34.3));
const v06 = vertex(new Vertex2(80, 0));
const v07 = vertex(new Vertex2(53.3, 80));
const v08 = vertex(new Vertex2(0, 160));
const v09 = vertex(new Vertex2(240, 160));
const v10 = vertex(new Vertex2(160, 0));
const colors = {
	c0: '#FEA000',
	c1: '#FF8F00',
	c2: '#FFB200',
	c3: '#FFCA27',
};
export const shapes = [
	new Shape(colors.c0, [
		[to(v00, v08), v01, v07],
		[v08, v01, v07],
		[to(v08, v00), v01, v07],
		[v00, v01, v07],
		[v00, v01, v07],
		[v00, v01, v07],
	]),
	new Shape(colors.c1, [
		[v01, cut(to(v02, v09), v07, v01, to(v05, v09)), v07],
		[v01, to(v09, v03), v07],
		[v01, v03, v07],
		[v01, cut(v03, v07, v01, to(v03, v05)), v07],
		[v01, cut(v03, v07, v01, v05), v07],
		[v01, cut(to(v03, v02), v07, v01, v05), v07],
	]),
	new Shape(colors.c2, [
		[to(v02, v09), v06, v07],
		[to(v09, v03), v06, v07],
		[v03, v06, v07],
		[v03, v06, v07],
		[v03, v06, v07],
		[to(v03, v02), v06, v07],
	]),
	new Shape(colors.c3, [
		[to(v02, v09), to(v03, v09), to(v04, v10), v06],
		[to(v09, v03), to(v09, v03), v10, v06],
		[v03, v03, v10, v06],
		[v03, v03, v10, v06],
		[v03, v03, to(v10, v04), v06],
		[to(v03, v02), v03, v04, v06],
	]),
];
//# sourceMappingURL=animation.js.map
