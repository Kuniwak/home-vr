import {Euler} from "three";
import {DOM} from "../DOM/DOM";
import {IInput, DeltaEuler} from "./IInput";
import {EulerDraggable} from "./EulerDraggable";


export class TouchInput implements IInput {
    get rotation(): DeltaEuler | Euler {
        return this.touchEulerInput.rotDelta;
    }

    get forwardForce(): number {
        return this.forwardButton.isPressed ? 1 : 0;
    }

    public readonly verticalForce = 0;

    get shouldMoveTo1F(): boolean {
        return this.moveTo1FButton.isPressed;
    }

    get shouldMoveTo2F(): boolean {
        return this.moveTo2FButton.isPressed;
    }

    get shouldOpenDoor(): boolean {
        return this.openButton.isPressed;
    }

    get shouldCloseDoor(): boolean {
        return this.closeButton.isPressed;
    }

    public readonly shouldPause: boolean = false;

    private readonly touchEulerInput: TouchEulerInput;
    private readonly forwardButton: TouchButtonInput;
    private readonly moveTo1FButton: TouchButtonInput;
    private readonly moveTo2FButton: TouchButtonInput;
    private readonly openButton: TouchButtonInput;
    private readonly closeButton: TouchButtonInput;

    constructor(dom: DOM) {
        this.touchEulerInput = new TouchEulerInput(dom);
        this.forwardButton = new TouchButtonInput(dom.moveForwardBtn);
        this.moveTo1FButton = new TouchButtonInput(dom.moveTo1FBtn);
        this.moveTo2FButton = new TouchButtonInput(dom.moveTo2FBtn);
        this.openButton = new TouchButtonInput(dom.openBtn);
        this.closeButton = new TouchButtonInput(dom.closeBtn);
    }

    start() {
        this.touchEulerInput.start();
        this.forwardButton.start();
        this.moveTo1FButton.start();
        this.moveTo2FButton.start();
        this.openButton.start();
        this.closeButton.start();
    }

    update() {
        // NOTE: Do nothing.
    }
}

class TouchEulerInput {
    get rotDelta(): DeltaEuler {
        return this.eulerDraggable.rotDelta;
    }

    private readonly handleTouchStart: (ev: TouchEvent) => void;
    private readonly handleTouchMove: (ev: TouchEvent) => void;
    private readonly handleTouchEnd: (ev: TouchEvent) => void;
    private readonly handleTouchCancel: (ev: TouchEvent) => void;
    private readonly eulerDraggable: EulerDraggable;


    constructor(private readonly dom: DOM) {
        this.eulerDraggable = new EulerDraggable(1 / 400);

        this.handleTouchStart = (ev: TouchEvent) => {
            ev.stopPropagation();
            ev.preventDefault();
            this.eulerDraggable.onDragStart(ev.touches[0].pageX, ev.touches[0].pageY);
        };

        this.handleTouchMove = (ev: TouchEvent) => {
            ev.stopPropagation();
            ev.preventDefault();
            this.eulerDraggable.onDragMove(ev.touches[0].pageX, ev.touches[0].pageY);
        };

        this.handleTouchEnd = (ev: TouchEvent) => {
            ev.stopPropagation();
            ev.preventDefault();
            this.eulerDraggable.onDragEnd();
        };

        this.handleTouchCancel = this.handleTouchEnd;
    }

    start() {
        this.dom.window.addEventListener('touchstart', this.handleTouchStart);
        this.dom.window.addEventListener('touchmove', this.handleTouchMove);
        this.dom.window.addEventListener('touchend', this.handleTouchEnd);
        this.dom.window.addEventListener('touchcancel', this.handleTouchCancel);
    }
}

class TouchButtonInput {
    get isPressed() {
        return this._isPressed;
    }

    private _isPressed = false;
    private readonly handleTouchStart: (ev: TouchEvent) => void;
    private readonly handleTouchMove: (ev: TouchEvent) => void;
    private readonly handleTouchEnd: (ev: TouchEvent) => void;
    private readonly handleTouchCancel: (ev: TouchEvent) => void;

    constructor(private button: HTMLButtonElement) {
        this.handleTouchStart = (ev: TouchEvent) => {
            ev.stopPropagation();
            ev.preventDefault();
            this._isPressed = true;
        }

        this.handleTouchMove = (ev: TouchEvent) => {
            ev.stopPropagation()
            ev.preventDefault();
        }

        this.handleTouchEnd = (ev: TouchEvent) => {
            ev.stopPropagation();
            ev.preventDefault();
            this._isPressed = false;
        }

        this.handleTouchCancel = this.handleTouchEnd;
    }

    start() {
        this.button.addEventListener("touchstart", this.handleTouchStart);
        this.button.addEventListener("touchmove", this.handleTouchMove);
        this.button.addEventListener("touchend", this.handleTouchEnd);
        this.button.addEventListener("touchcancel", this.handleTouchCancel);
    }
}
