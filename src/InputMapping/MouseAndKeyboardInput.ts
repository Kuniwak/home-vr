import {Euler} from 'three';
import {IInput, DeltaEuler} from './IInput';
import {Window} from '../DOMTestable/Window';
import {EulerDraggable} from './EulerDraggable';

class PauseButtonInput {
    get shouldPause() {
        return this._shouldPause;
    }

    private _shouldPause: boolean = false;

    private readonly handlePauseButtonClick: (ev: MouseEvent) => void;

    constructor(private readonly window: Window) {
        this.handlePauseButtonClick = () => {
            this._shouldPause = true;
        };

    }

    start() {
        this.window.addEventListener('click', this.handlePauseButtonClick);
    }
}

export class MouseAndKeyboardInput implements IInput {
    get rotation(): DeltaEuler | Euler {
        return this.eulerDraggable.rotDelta;
    }

    public forwardForce: number = 0;
    public verticalForce: number = 0;
    public shouldCloseDoor: boolean = false;
    public shouldMoveTo1F: boolean = false;
    public shouldMoveTo2F: boolean = false;
    public shouldOpenDoor: boolean = false;
    get shouldPause(): boolean {
        return this.pauseButtonInput.shouldPause;
    }

    private readonly handleMouseDown: (ev: MouseEvent) => void;
    private readonly handleMouseMove: (ev: MouseEvent) => void;
    private readonly handleMouseUp: (ev: MouseEvent) => void;
    private readonly handleKeyDown: (ev: KeyboardEvent) => void;
    private readonly handleKeyUp: (ev: KeyboardEvent) => void;
    private readonly pauseButtonInput: PauseButtonInput;
    private readonly eulerDraggable: EulerDraggable;
    private isDragging = false;

    constructor(private readonly window: Window) {
        this.pauseButtonInput = new PauseButtonInput(window);
        this.eulerDraggable = new EulerDraggable(1/800);

        this.handleMouseDown = (ev: MouseEvent) => {
            ev.stopPropagation();
            ev.preventDefault();
            this.isDragging = true;
            this.eulerDraggable.onDragStart(ev.pageX, ev.pageY);
        };

        this.handleMouseMove = (ev: MouseEvent) =>{
            ev.stopPropagation();
            ev.preventDefault();
            if (this.isDragging) {
                this.eulerDraggable.onDragMove(ev.pageX, ev.pageY);
            }
        };

        this.handleMouseUp = (ev: MouseEvent) => {
            ev.stopPropagation();
            ev.preventDefault();
            this.isDragging = false;
            this.eulerDraggable.onDragEnd();
        };

        this.handleKeyDown = (ev: KeyboardEvent) => {
            switch (ev.key) {
                case 'w':
                    this.forwardForce = 1;
                    return;
                case '1':
                    this.shouldMoveTo1F = true;
                    return;
                case '2':
                    this.shouldMoveTo2F = true;
                    return;
                case '3':
                    this.shouldOpenDoor = true;
                    return;
                case '4':
                    this.shouldCloseDoor = true;
                    return;
                case 'ArrowUp':
                    this.verticalForce = 1;
                    return;
                case 'ArrowDown':
                    this.verticalForce = -1;
                    return;
                default:
                    return;
            }
        }

        this.handleKeyUp = (ev: KeyboardEvent) => {
            switch (ev.key) {
                case 'w':
                    this.forwardForce = 0;
                    return;
                case '1':
                    this.shouldMoveTo1F = false;
                    return;
                case '2':
                    this.shouldMoveTo2F = false;
                    return;
                case '3':
                    this.shouldOpenDoor = false;
                    return;
                case '4':
                    this.shouldCloseDoor = false;
                    return;
                case 'ArrowUp':
                    this.verticalForce = 0;
                    return;
                case 'ArrowDown':
                    this.verticalForce = 0;
                    return;
                default:
                    return;
            }
        };
    }

    start() {
        this.pauseButtonInput.start();
        this.window.addEventListener('mousedown', this.handleMouseDown);
        this.window.addEventListener('mousemove', this.handleMouseMove);
        this.window.addEventListener('mouseup', this.handleMouseUp);
        this.window.addEventListener('keydown', this.handleKeyDown);
        this.window.addEventListener('keyup', this.handleKeyUp);
    }

    update() {
        // NOTE: Do nothing.
    }
}