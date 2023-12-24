import {IXRSessionFactory} from "../IXRSessionFactory";
import {Euler, Object3D} from "three";
import {IInput} from "./IInput";

export class XRInput implements IInput {
    public cameraEuler: Euler;
    public forwardForce: number = 0;
    public verticalForce: number = 0;
    public shouldMoveTo1F: boolean = false;
    public shouldMoveTo2F: boolean = false;
    public shouldOpenDoor: boolean = false;
    public shouldCloseDoor: boolean = false;
    public readonly shouldPause: boolean = false;

    constructor(
        private readonly xrsFactory: IXRSessionFactory,
        private readonly camera: Object3D,
    ) {
        this.cameraEuler = camera.rotation;
    }

    start() {
        // NOTE: Do nothing.
    }

    update() {
        this.updateByCamera();
        this.updateByGamepad();
    }

    private updateByCamera() {
        this.cameraEuler = this.camera.rotation;
    }

    private updateByGamepad() {
        const xrs = this.xrsFactory.getSession();

        if (!xrs || xrs.inputSources.length < 2) {
            return;
        }

        const r = xrs.inputSources[0].gamepad;
        if (!r) {
            return;
        }

        const l = xrs.inputSources[1].gamepad;
        if (!l) {
            return;
        }

        // NOTE: Prohibit moving backward to avoid VR sickness.
        this.forwardForce = Math.max(-l.axes[3], 0);
        this.verticalForce = -r.axes[3];
        this.shouldMoveTo1F = r.buttons[0].pressed;
        this.shouldMoveTo2F = r.buttons[1].pressed;
        this.shouldOpenDoor = l.buttons[0].pressed;
        this.shouldCloseDoor = l.buttons[1].pressed;
    }
}