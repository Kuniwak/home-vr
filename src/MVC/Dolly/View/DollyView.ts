import {IDollyModelOutput} from "../Model/DollyModel";
import {Object3D} from "three";
import {Env} from "../../../EnvDetection";
import {DOM} from "../../../DOM/DOM";
import {IVRButtonFactory} from "../../../IVRButtonFactory";
import {BODY_HEIGHT} from "../../../Const";

export interface IDollyView {
    start(): void;

    update(): void;
}

export class DollyView {
    private readonly dollyView: IDollyView;

    constructor(
        env: Env,
        dom: DOM,
        dollyModelOutput: IDollyModelOutput,
        dolly: Object3D,
        camera: Object3D,
        vrButtonFactory: IVRButtonFactory,
    ) {
        this.dollyView = DollyView.build(env, dom, dollyModelOutput, dolly, camera, vrButtonFactory);
    }

    start() {
        this.dollyView.start();
    }

    update() {
        this.dollyView.update();
    }

    private static build(
        env: Env,
        dom: DOM,
        dollyModelOutput: IDollyModelOutput,
        dolly: Object3D,
        camera: Object3D,
        vrButtonFactory: IVRButtonFactory,
    ): IDollyView {
        switch (env) {
            case "MOUSE":
                return new MouseAndKeyboardDollyView(dom, dollyModelOutput, dolly, camera);
            case "TOUCH":
                return new TouchDollyView(dom, dollyModelOutput, dolly, camera);
            case "XR":
                return new XRDollyView(dom, dollyModelOutput, dolly, camera, vrButtonFactory);
        }
    }
}

class MouseAndKeyboardDollyView implements IDollyView {
    constructor(
        private readonly dom: DOM,
        private readonly dollyModelOutput: IDollyModelOutput,
        private readonly dolly: Object3D,
        private readonly camera: Object3D,
    ) {
    }

    start(): void {
        this.dom.help.classList.remove("hidden");
        this.update();
    }

    update(): void {
        this.camera.rotation.x = this.dollyModelOutput.state.rotationX;
        this.dolly.position.copy(this.dollyModelOutput.state.position);
        this.dolly.rotation.y = this.dollyModelOutput.state.rotationY;
    }
}

class TouchDollyView implements IDollyView {
    constructor(
        private readonly dom: DOM,
        private readonly dollyModelOutput: IDollyModelOutput,
        private readonly dolly: Object3D,
        private readonly camera: Object3D,
    ) {
    }

    start(): void {
        this.dom.controller.classList.remove("hidden");
        this.update();
    }

    update(): void {
        this.camera.rotation.x = this.dollyModelOutput.state.rotationX;
        this.dolly.position.copy(this.dollyModelOutput.state.position);
        this.dolly.rotation.y = this.dollyModelOutput.state.rotationY;
    }
}

class XRDollyView implements IDollyView {
    constructor(
        private readonly dom: DOM,
        private readonly dollyModelOutput: IDollyModelOutput,
        private readonly dolly: Object3D,
        private readonly camera: Object3D,
        private readonly vrButtonFactory: IVRButtonFactory,
    ) {
    }

    start() {
        this.dom.body.appendChild(this.vrButtonFactory.createButton());
        // NOTE: The camera position too low before XR session starts.
        this.camera.position.y = BODY_HEIGHT;
        this.camera.rotation.x = this.dollyModelOutput.state.rotationX;
        this.dolly.position.copy(this.dollyModelOutput.state.position);
        this.dolly.rotation.y = this.dollyModelOutput.state.rotationY;
    }

    update(): void {
        this.dolly.position.copy(this.dollyModelOutput.state.position);
        // NOTE: In XR, the rotation is handled by WebXRAwareEffectComposerRenderable.
    }
}