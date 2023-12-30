import {IDollyModelOutput} from '../Model/DollyModel';
import {Object3D} from 'three';
import {Env} from '../../../EnvDetection';
import {DOM} from '../../../DOM/DOM';
import {IVRButtonFactory} from '../../../IVRButtonFactory';
import {BODY_HEIGHT} from '../../../Const';

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
        dollyHead: Object3D,
        dollyBody: Object3D,
        camera: Object3D,
        vrButtonFactory: IVRButtonFactory,
    ) {
        this.dollyView = DollyView.build(env, dom, dollyModelOutput, dollyHead, dollyBody, camera, vrButtonFactory);
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
        dollyHead: Object3D,
        dollyBody: Object3D,
        camera: Object3D,
        vrButtonFactory: IVRButtonFactory,
    ): IDollyView {
        switch (env) {
        case 'MOUSE':
            return new MouseAndKeyboardDollyView(dom, dollyModelOutput, dollyHead, dollyBody, camera);
        case 'TOUCH':
            return new TouchDollyView(dom, dollyModelOutput, dollyHead, dollyBody, camera);
        case 'XR':
            return new XRDollyView(dom, dollyModelOutput, dollyHead, dollyBody, camera, vrButtonFactory);
        }
    }
}


abstract class NotXRDollyView implements IDollyView {
    protected constructor(
        protected readonly dollyModelOutput: IDollyModelOutput,
        protected readonly dollyHead: Object3D,
        protected readonly dollyBody: Object3D,
        protected readonly camera: Object3D,
    ) {
    }

    start() {
        this.update();
    }

    update(): void {
        this.camera.rotation.set(
            this.dollyModelOutput.state.rotation.x,
            0,
            this.dollyModelOutput.state.rotation.z,
            'YXZ',
        );
        this.dollyHead.rotation.set(0, this.dollyModelOutput.state.rotation.y, 0, 'YXZ');
        this.dollyBody.position.copy(this.dollyModelOutput.state.position);
    }
}

class MouseAndKeyboardDollyView extends NotXRDollyView {
    constructor(
        private readonly dom: DOM,
        dollyModelOutput: IDollyModelOutput,
        dollyHead: Object3D,
        dollyBody: Object3D,
        camera: Object3D,
    ) {
        super(dollyModelOutput, dollyHead, dollyBody, camera);
    }

    start(): void {
        this.dom.help.classList.remove('hidden');
        super.start();
    }
}

class TouchDollyView extends NotXRDollyView {
    constructor(
        private readonly dom: DOM,
        dollyModelOutput: IDollyModelOutput,
        dollyHead: Object3D,
        dollyBody: Object3D,
        camera: Object3D,
    ) {
        super(dollyModelOutput, dollyHead, dollyBody, camera);
    }

    start(): void {
        this.dom.controller.classList.remove('hidden');
        super.start();
    }
}

class XRDollyView implements IDollyView {
    constructor(
        private readonly dom: DOM,
        private readonly dollyModelOutput: IDollyModelOutput,
        private readonly dollyHead: Object3D,
        private readonly dollyBody: Object3D,
        private readonly camera: Object3D,
        private readonly vrButtonFactory: IVRButtonFactory,
    ) {
    }

    start() {
        this.dom.body.appendChild(this.vrButtonFactory.createButton());

        this.dollyHead.rotation.set(
            0,
            this.dollyModelOutput.state.rotation.y,
            0,
            'YXZ',
        );
        this.dollyBody.position.copy(this.dollyModelOutput.state.position);

        // NOTE: Simulate the height and rotation of the user's head before entering XR.
        this.camera.position.y = BODY_HEIGHT;
        this.camera.rotation.set(
            this.dollyModelOutput.state.rotation.x,
            0,
            this.dollyModelOutput.state.rotation.z,
            'YXZ',
        );
    }

    update(): void {
        this.dollyBody.position.copy(this.dollyModelOutput.state.position);

        // NOTE: In XR, the camera position and rotation are managed by WebXRAwareEffectComposerRenderable.
    }
}