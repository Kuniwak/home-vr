import {Euler, Object3D} from "three";
import {Env} from "../EnvDetection";
import {DOM} from "../DOM/DOM";
import {IXRSessionFactory} from "../IXRSessionFactory";
import {MouseAndKeyboardInput} from "./MouseAndKeyboardInput";
import {TouchInput} from "./TouchInput";
import {XRInput} from "./XRInput";
import {IInput, DeltaEuler} from "./IInput";

export class Input implements IInput {
    private readonly input: IInput;

    constructor(env: Env, dom: DOM, camera: Object3D, xrsFactory: IXRSessionFactory) {
        this.input = Input.createInput(env, dom, camera, xrsFactory);
    }

    get rotation(): DeltaEuler | Euler {
        return this.input.rotation;
    }

    get forwardForce(): number {
        return this.input.forwardForce;
    }

    get verticalForce(): number {
        return this.input.verticalForce;
    }

    get shouldMoveTo1F(): boolean {
        return this.input.shouldMoveTo1F;
    }

    get shouldMoveTo2F(): boolean {
        return this.input.shouldMoveTo2F;
    }

    get shouldOpenDoor(): boolean {
        return this.input.shouldOpenDoor;
    }

    get shouldCloseDoor(): boolean {
        return this.input.shouldCloseDoor;
    }

    get shouldPause(): boolean {
        return this.input.shouldPause;
    }

    start() {
        this.input.start();
    }

    update() {
        this.input.update();
    }

    private static createInput(env: Env, dom: DOM, camera: Object3D, xrsFactory: IXRSessionFactory): IInput {
        switch (env) {
            case "MOUSE":
                return new MouseAndKeyboardInput(dom.window);
            case "TOUCH":
                return new TouchInput(dom);
            case "XR":
                return new XRInput(xrsFactory, camera);
        }
    }
}