import * as animation from './animation';
import { clearCanvas, computeScaleFactor, updateCanvas } from './canvas';
import { easeInOut, expoEaseIn, expoEaseOut } from './easing';
import { defaultOptions } from './options';
var State;
(function(State) {
	State[(State['Stopped'] = 0)] = 'Stopped';
	State[(State['Stopping'] = 1)] = 'Stopping';
	State[(State['LoopingAnimating'] = 2)] = 'LoopingAnimating';
	State[(State['LoopingWaiting'] = 3)] = 'LoopingWaiting';
	State[(State['ToStep'] = 4)] = 'ToStep';
})(State || (State = {}));
export var AnimationDirection;
(function(AnimationDirection) {
	AnimationDirection[(AnimationDirection['Forward'] = 0)] = 'Forward';
	AnimationDirection[(AnimationDirection['Backward'] = 1)] = 'Backward';
})(AnimationDirection || (AnimationDirection = {}));
export var StepDirection;
(function(StepDirection) {
	StepDirection[(StepDirection['Forward'] = 0)] = 'Forward';
	StepDirection[(StepDirection['Backward'] = 1)] = 'Backward';
	StepDirection[(StepDirection['Shortest'] = 2)] = 'Shortest';
})(StepDirection || (StepDirection = {}));
export class AnfemaLogo {
	constructor(canvas, options) {
		this.canvas = canvas;
		this.currentState = State.Stopped;
		this.currentAnimationProps = {
			direction: AnimationDirection.Forward,
		};
		this.currentStep = 0;
		this.willUpdateCanvas = true;
		this.rafCallback = time => {
			this.startTime = this.startTime === undefined ? time : this.startTime;
			const phase = clamp((time - this.startTime) / this.options.stepDuration);
			switch (this.currentState) {
				case State.Stopped:
					this.drawPhase(0.0);
					if (this.transitionToEnqueuedStateOr(State.Stopped)) {
						this.scheduleRender();
					}
					break;
				case State.Stopping:
					this.drawPhase(phase);
					if (phase === 1.0) {
						this.startTime = undefined;
						this.transitionToEnqueuedStateOr(State.Stopped);
					}
					this.scheduleRender();
					break;
				case State.LoopingAnimating:
					this.drawPhase(phase);
					if (phase === 1.0) {
						this.currentStep = this.nextStep();
						this.startTime = undefined;
						this.transitionToEnqueuedStateOr(State.LoopingWaiting);
					}
					this.scheduleRender();
					break;
				case State.LoopingWaiting:
					this.drawPhase(0.0);
					break;
				case State.ToStep:
					this.drawPhase(phase);
					if (phase === 1.0) {
						this.currentStep = this.nextStep();
						this.startTime = undefined;
						if (this.currentStep === this.currentAnimationProps.toStep) {
							this.transitionToEnqueuedStateOr(State.Stopped);
						}
					}
					this.scheduleRender();
					break;
			}
		};
		this.options = Object.assign({}, defaultOptions, options);
		const context = canvas.getContext('2d');
		if (context) {
			this.context = context;
		} else {
			throw new Error();
		}
		this.scheduleRender();
	}
	startLooped(direction) {
		this.enqueueStateAndProps(State.LoopingAnimating, {
			direction: direction,
		});
	}
	startToStep(toStep, direction) {
		if (toStep < this.numSteps) {
			this.enqueueStateAndProps(State.ToStep, {
				toStep: toStep,
				direction: this.mapDirection(toStep, direction),
			});
		} else {
			throw new Error('state argument error');
		}
	}
	stop() {
		this.enqueueStateAndProps(State.Stopping);
	}
	dispose() {
		this.currentState = State.Stopped;
	}
	reset(toStep) {
		if (toStep < this.numSteps) {
			this.currentStep = toStep;
			return this;
		} else {
			throw new Error('state argument error');
		}
	}
	onGoalReached(callback) {
		this.onGoalReachedCallback = callback;
		return this;
	}
	updateCanvas() {
		this.willUpdateCanvas = true;
		this.scheduleRender();
	}
	drawPhase(phase) {
		const context = this.context;
		if (this.willUpdateCanvas) {
			this.willUpdateCanvas = false;
			updateCanvas(this.context, this.options);
			this.scaleFactor = computeScaleFactor(this.context, this.options);
		}
		const direction = this.currentAnimationProps.direction;
		const step = direction === AnimationDirection.Forward ? this.currentStep : this.nextStep();
		const easedPhase = easeInOut(
			direction === AnimationDirection.Forward ? phase : 1.0 - phase,
			expoEaseIn,
			expoEaseOut
		);
		clearCanvas(this.context, this.options);
		context.save();
		context.translate(
			(this.canvas.width - animation.boundingBox.w * this.scaleFactor) * 0.5,
			(this.canvas.height - animation.boundingBox.h * this.scaleFactor) * 0.5
		);
		animation.shapes.forEach(shape => {
			this.drawShape(shape, easedPhase, step);
		});
		context.restore();
	}
	drawShape(shape, phase, step) {
		const context = this.context;
		const outline = shape.states[step];
		const last = outline.length - 1;
		context.beginPath();
		let vertex = outline[last](phase);
		context.fillStyle = '#000';
		context.moveTo(vertex.x * this.scaleFactor, vertex.y * this.scaleFactor);
		for (let i = 0; i <= last; i++) {
			vertex = outline[i](phase);
			context.lineTo(vertex.x * this.scaleFactor, vertex.y * this.scaleFactor);
		}
		if (this.options.outlineMode) {
			context.closePath();
			context.stroke();
		} else {
			context.fillStyle = shape.color;
			context.strokeStyle = shape.color;
			context.fill();
			context.stroke();
		}
	}
	mapDirection(toStep, direction) {
		switch (direction) {
			case StepDirection.Backward:
				return AnimationDirection.Backward;
			case StepDirection.Forward:
				return AnimationDirection.Forward;
			case StepDirection.Shortest:
				return mod(this.currentStep - toStep, this.numSteps) <
					mod(toStep - this.currentStep, this.numSteps)
					? AnimationDirection.Backward
					: AnimationDirection.Forward;
		}
	}
	get numSteps() {
		return animation.shapes[0].states.length;
	}
	nextStep() {
		return this.currentAnimationProps.direction === AnimationDirection.Backward
			? mod(this.currentStep - 1, this.numSteps)
			: mod(this.currentStep + 1, this.numSteps);
	}
	scheduleRender() {
		window.requestAnimationFrame(this.rafCallback);
	}
	enqueueStateAndProps(state, animationProps) {
		this.nextState = state;
		this.nextAnimationProps = animationProps;
		this.scheduleRender();
	}
	transitionToEnqueuedStateOr(state) {
		const prevState = this.currentState;
		this.currentState = this.nextState ? this.nextState : state;
		this.nextState = undefined;
		this.currentAnimationProps = this.nextAnimationProps
			? this.nextAnimationProps
			: this.currentAnimationProps;
		this.nextAnimationProps = undefined;
		if (prevState !== this.currentState) {
			this.startTime = undefined;
			if (this.currentState !== State.LoopingWaiting) {
				clearTimeout(this.timeoutId);
			}
			if (this.currentState === State.LoopingWaiting) {
				const delay =
					this.currentStep === 0 ? this.options.loopDelay : this.options.stepDelay;
				this.timeoutId = setTimeout(() => {
					this.transitionToEnqueuedStateOr(State.LoopingAnimating);
					this.scheduleRender();
				}, delay);
			}
			if (prevState === State.ToStep) {
				if (this.onGoalReachedCallback) {
					this.onGoalReachedCallback(this);
				}
			}
		}
		return prevState !== this.currentState;
	}
}
function mod(n, m) {
	return ((n % m) + m) % m;
}
function clamp(p) {
	return p < 1.0 ? p : 1.0;
}
//# sourceMappingURL=index.js.map
