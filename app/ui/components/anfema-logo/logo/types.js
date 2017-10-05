export class Vertex2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    scale(s) {
        this.x = this.x * s;
        this.y = this.y * s;
        return this;
    }
    lerp(v1, v2, p) {
        this.x = v1.x * (1 - p) + v2.x * (p);
        this.y = v1.y * (1 - p) + v2.y * (p);
        return this;
    }
    intersection(a0, a1, b0, b1) {
        const determinant = (a0.x - a1.x) * (b0.y - b1.y) - (a0.y - a1.y) * (b0.x - b1.x);
        const dividendX = (a0.x * a1.y - a0.y * a1.x) * (b0.x - b1.x) -
            (a0.x - a1.x) * (b0.x * b1.y - b0.y * b1.x);
        const dividendY = (a0.x * a1.y - a0.y * a1.x) * (b0.y - b1.y) -
            (a0.y - a1.y) * (b0.x * b1.y - b0.y * b1.x);
        this.x = dividendX / determinant;
        this.y = dividendY / determinant;
        return this;
    }
}
export class Shape {
    constructor(color, states) {
        this.color = color;
        this.states = states;
        const vertices = states[0].length;
        if (this.states.some(v => v.length !== vertices)) {
            throw new Error('invalid states');
        }
    }
}
//# sourceMappingURL=types.js.map