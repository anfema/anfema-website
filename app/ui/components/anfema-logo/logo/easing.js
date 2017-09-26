export function easeInOut(value, inFunc, outFunc) {
    if (value < 0.5) {
        return inFunc(value / 0.5) * 0.5;
    }
    else {
        return (1 + outFunc((value - 0.5) / 0.5)) * 0.5;
    }
}
export function linear(value) {
    return value;
}
export function expoEaseOut(value) {
    return (value == 1) ? 1 : (-Math.pow(2, -10 * value) + 1);
}
export function expoEaseIn(value) {
    return (value == 0) ? 0 : Math.pow(2, 10 * (value - 1));
}
export function circEaseOut(value) {
    value -= 1.0;
    return Math.sqrt(1.0 - value * value);
}
export function circEaseIn(value) {
    return -(Math.sqrt(1.0 - value * value) - 1.0);
}
export function quadEaseOut(value) {
    return -value * (value - 2);
}
export function quadEaseIn(value) {
    return value * value;
}
export function sineEaseIn(value) {
    return -1 * Math.cos(value * (Math.PI / 2)) + 1;
}
export function sineEaseOut(value) {
    return Math.sin(value * (Math.PI / 2));
}
export function cubicEaseOut(value) {
    value -= 1;
    return (value * value * value + 1);
}
export function cubicEaseIn(value) {
    return value * value * value;
}
export function quartEaseOut(value) {
    value -= 1.0;
    return -(value * value * value * value - 1.0);
}
export function quartEaseIn(value) {
    return value * value * value * value;
}
export function quintEaseOut(value) {
    value -= 1.0;
    return value * value * value * value * value + 1.0;
}
export function quintEaseIn(value) {
    return value * value * value * value * value;
}
export function elasticEaseOut(value) {
    if (value == 1.0) {
        return 1.0;
    }
    const p = 0.3;
    const s = p / 4.0;
    return (Math.pow(2.0, -10.0 * value) * Math.sin((value - s) * (2.0 * Math.PI) / p) + 1.0);
}
export function elasticEaseIn(value) {
    if (value == 1.0) {
        return 1.0;
    }
    const p = 0.3;
    const s = p / 4.0;
    value -= 1;
    return -(Math.pow(2.0, 10.0 * value) * Math.sin((value - s) * (2.0 * Math.PI) / p));
}
export function bounceEaseOut(value) {
    if (value < (1.0 / 2.75)) {
        return (7.5625 * value * value);
    }
    else if (value < (2.0 / 2.75)) {
        value -= (1.5 / 2.75);
        return (7.5625 * value * value + 0.75);
    }
    else if (value < (2.5 / 2.75)) {
        value -= (2.25 / 2.75);
        return (7.5625 * value * value + 0.9375);
    }
    else {
        value -= (2.625 / 2.75);
        return (7.5625 * value * value + 0.984375);
    }
}
export function bounceEaseIn(value) {
    return 1.0 - bounceEaseOut(1.0 - value);
}
export function backEaseOut(value) {
    value -= 1.0;
    return (value * value * (2.70158 * value + 1.70158) + 1.0);
}
export function backEaseIn(value) {
    return value * value * (2.70158 * value - 1.70158);
}
//# sourceMappingURL=easing.js.map