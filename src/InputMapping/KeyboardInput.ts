import {IInput} from './IInput';
import {DOM} from '../DOM/DOM';
import {DeltaEuler} from "./DeltaEuler";

export class KeyboardInput implements IInput {
    readonly rotation: DeltaEuler = new DeltaEuler(0, 0);

    forwardForce: number = 0;
    verticalForce: number = 0;
    sidewaysForce: number = 0;
    shouldReset: boolean = false;
    shouldCloseDoor: boolean = false;
    shouldMoveTo1F: boolean = false;
    shouldMoveTo2F: boolean = false;
    shouldOpenDoor: boolean = false;

    private readonly handleKeyDown: (ev: KeyboardEvent) => void;
    private readonly handleKeyUp: (ev: KeyboardEvent) => void;
    private readonly handleMouseleave: () => void;
    private readonly handleVisibilityChange: () => void;

    constructor(private readonly dom: DOM) {
        this.handleKeyDown = (ev: KeyboardEvent) => {
            switch (ev.key) {
            case 'w':
                this.forwardForce = 1;
                return;
            case 'a':
                this.sidewaysForce = -1;
                return;
            case 's':
                this.forwardForce = -1;
                return;
            case 'd':
                this.sidewaysForce = 1;
                return;
            case '0':
                this.shouldReset = true;
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
            case 'a':
                this.sidewaysForce = 0;
                return;
            case 's':
                this.forwardForce = 0;
                return;
            case 'd':
                this.sidewaysForce = 0;
                return;
            case '0':
                this.shouldReset = false;
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

        this.handleVisibilityChange = () => {
            if (document.visibilityState !== 'visible') {
                this.reset();
            }
        };

        this.handleMouseleave = () => {
            this.reset();
        }
    }

    start() {
        this.dom.window.addEventListener('keydown', this.handleKeyDown);
        this.dom.window.addEventListener('keyup', this.handleKeyUp);

        // NOTE: This is necessary because keyup not get fired if the mouse enter to DevTools.
        this.dom.canvas.addEventListener('mouseleave', this.handleMouseleave);
        this.dom.window.addEventListener('visibilitychange', this.handleVisibilityChange);
    }

    update() {
        // NOTE: Do nothing.
    }

    private reset() {
        this.forwardForce = 0;
        this.verticalForce = 0;
        this.sidewaysForce = 0;
        this.shouldReset = false;
        this.shouldMoveTo1F = false;
        this.shouldMoveTo2F = false;
        this.shouldOpenDoor = false;
        this.shouldCloseDoor = false;
    }
}