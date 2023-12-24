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
        dollyBody: Object3D,
        dollyHead: Object3D,
        camera: Object3D,
        vrButtonFactory: IVRButtonFactory,
    ) {
        this.dollyView = DollyView.build(env, dom, dollyModelOutput, dollyBody, dollyHead, camera, vrButtonFactory);
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
        dollyBody: Object3D,
        dollyHead: Object3D,
        camera: Object3D,
        vrButtonFactory: IVRButtonFactory,
    ): IDollyView {
        switch (env) {
            case "MOUSE":
                return new MouseAndKeyboardDollyView(dom, dollyModelOutput, dollyBody, dollyHead);
            case "TOUCH":
                return new TouchDollyView(dom, dollyModelOutput, dollyBody, dollyHead);
            case "XR":
                return new XRDollyView(dom, dollyModelOutput, dollyBody, camera, vrButtonFactory);
        }
    }
}

export class MouseAndKeyboardDollyView implements IDollyView {
    constructor(
        private readonly dom: DOM,
        private readonly dollyModelOutput: IDollyModelOutput,
        private readonly dollyBody: Object3D,
        private readonly dollyHead: Object3D,
    ) {
    }

    start(): void {
        this.dom.help.classList.remove("hidden");
    }

    update(): void {
        this.dollyBody.position.copy(this.dollyModelOutput.state.position);
        this.dollyHead.rotation.copy(this.dollyModelOutput.state.rotation);
    }
}

export class TouchDollyView implements IDollyView {
    constructor(
        private readonly dom: DOM,
        private readonly dollyModelOutput: IDollyModelOutput,
        private readonly dollyBody: Object3D,
        private readonly dollyHead: Object3D,
    ) {
    }

    start(): void {
        this.dom.controller.classList.remove("hidden");
    }

    update(): void {
        this.dollyBody.position.copy(this.dollyModelOutput.state.position);
        this.dollyHead.rotation.copy(this.dollyModelOutput.state.rotation);
    }
}

export class XRDollyView implements IDollyView {
    constructor(
        private readonly dom: DOM,
        private readonly dollyModelOutput: IDollyModelOutput,
        private readonly dollyBody: Object3D,
        private readonly camera: Object3D,
        private readonly vrButtonFactory: IVRButtonFactory,
    ) {
    }

    start() {
        this.dom.body.appendChild(this.vrButtonFactory.createButton());
        // NOTE: The camera position too low before XR session starts.
        this.camera.position.y = BODY_HEIGHT;
    }

    update(): void {
        this.dollyBody.position.copy(this.dollyModelOutput.state.position);
        // NOTE: In XR, the rotation is handled by WebXRAwareEffectComposerRenderable.
    }
}