import {DeltaEuler, IInput} from "./IInput";
import {Euler} from "three";
import {EulerDraggable} from "./EulerDraggable";
import {Window} from "../DOMTestable/Window";

export class MouseInput implements IInput {
    get rotation(): DeltaEuler | Euler {
        return this.eulerDraggable.rotDelta;
    }

    public readonly forwardForce: number = 0;
    public readonly verticalForce: number = 0;
    public readonly shouldReset: boolean = false;
    public readonly shouldCloseDoor: boolean = false;
    public readonly shouldMoveTo1F: boolean = false;
    public readonly shouldMoveTo2F: boolean = false;
    public readonly shouldOpenDoor: boolean = false;

    private readonly handleMouseDown: (ev: MouseEvent) => void;
    private readonly handleMouseMove: (ev: MouseEvent) => void;
    private readonly handleMouseUp: (ev: MouseEvent) => void;
    private readonly eulerDraggable: EulerDraggable;
    private isDragging = false;

    constructor(private readonly window: Window) {
        this.eulerDraggable = new EulerDraggable(1 / 800);

        this.handleMouseDown = (ev: MouseEvent) => {
            ev.stopPropagation();
            ev.preventDefault();
            this.isDragging = true;
            this.eulerDraggable.onDragStart(ev.pageX, ev.pageY);
        };

        this.handleMouseMove = (ev: MouseEvent) => {
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
    }

    start() {
        this.window.addEventListener('mousedown', this.handleMouseDown);
        this.window.addEventListener('mousemove', this.handleMouseMove);
        this.window.addEventListener('mouseup', this.handleMouseUp);
    }

    update() {
        // NOTE: Do nothing.
    }
}