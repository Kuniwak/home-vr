import {IXRSessionFactory} from '../IXRSessionFactory';
import {Euler, Object3D} from 'three';
import {IInput} from './IInput';
import {DeltaEuler} from "./DeltaEuler";

export class XRInput implements IInput {
    get rotation(): DeltaEuler | Euler {
        return this._rotation;
    }

    public forwardForce: number = 0;
    public verticalForce: number = 0;
    // NOTE: Prohibit sliding to left/right to avoid VR sickness.
    public readonly sidewaysForce: number = 0;
    public shouldMoveTo1F: boolean = false;
    public shouldMoveTo2F: boolean = false;
    public shouldOpenDoor: boolean = false;
    public shouldCloseDoor: boolean = false;
    public readonly shouldReset: boolean = false;
    private readonly _rotation: Euler = new Euler(0, 0, 0, 'YXZ');

    constructor(
        private readonly xrsFactory: IXRSessionFactory,
        private readonly camera: Object3D,
    ) {
    }

    start() {
        // NOTE: Do nothing.
    }

    update() {
        this.updateByCamera();
        this.updateByGamepad();
    }

    private updateByCamera() {
        this._rotation.copy(this.camera.rotation);
    }

    private updateByGamepad() {
        const xrs = this.xrsFactory.getSession();

        if (!xrs || xrs.inputSources.length < 2) {
            return;
        }

        const r = xrs.inputSources[0].gamepad;
        if (r) {
            this.verticalForce = -r.axes[3];
            this.shouldMoveTo1F = r.buttons[0].pressed;
            this.shouldMoveTo2F = r.buttons[1].pressed;
        }
        else {
            this.verticalForce = 0;
            this.shouldMoveTo1F = false;
            this.shouldMoveTo2F = false;
        }

        const l = xrs.inputSources[1].gamepad;
        if (l) {
            // NOTE: Prohibit moving backward to avoid VR sickness.
            this.forwardForce = Math.max(-l.axes[3], 0);
            this.shouldOpenDoor = l.buttons[0].pressed;
            this.shouldCloseDoor = l.buttons[1].pressed;
        }
        else {
            this.forwardForce = 0;
            this.shouldOpenDoor = false;
            this.shouldCloseDoor = false;
        }
    }
}