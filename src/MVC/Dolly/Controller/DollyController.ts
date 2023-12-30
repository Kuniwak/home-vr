import {IInput} from '../../../InputMapping/IInput';
import {IDollyModelInput} from '../Model/DollyModel';
import {IStopwatchOutput} from '../../../InputMapping/IStopwatch';
import {Euler, Object3D, Vector3} from 'three';
import {DeltaEuler} from '../../../InputMapping/DeltaEuler';
import {Env} from '../../../EnvDetection';

interface IDollyController {
    update(): void;
}

export class DollyController implements IDollyController {
    private readonly dollyController: IDollyController;

    constructor(
        env: Env,
        input: IInput,
        stopwatch: IStopwatchOutput,
        dollyModel: IDollyModelInput,
        camera: Object3D,
        dollyHead: Object3D,
    ) {
        this.dollyController = DollyController.build(env, input, stopwatch, dollyModel, camera, dollyHead);
    }

    update() {
        this.dollyController.update();
    }

    private static build(
        env: Env,
        input: IInput,
        stopwatch: IStopwatchOutput,
        dollyModel: IDollyModelInput,
        camera: Object3D,
        dollyHead: Object3D,
    ): IDollyController {
        switch (env) {
        case 'MOUSE':
        case 'TOUCH':
            return new NotXRDollyController(input, stopwatch, dollyModel);
        case 'XR':
            return new XRDollyController(input, stopwatch, dollyModel, camera, dollyHead);
        }
    }

}

abstract class AbstractDollyController implements IDollyController {
    protected abstract getRotation(): Readonly<DeltaEuler> | Readonly<Euler>;

    private readonly strength: Vector3 = new Vector3();

    protected constructor(
        protected readonly input: IInput,
        protected readonly stopwatch: IStopwatchOutput,
        protected readonly dollyModel: IDollyModelInput,
    ) {
    }

    update() {
        this.dollyModel.update();

        if (this.input.shouldReset) {
            this.dollyModel.reset();
        }
        else {
            this.strength.set(
                this.input.sidewaysForce,
                this.input.verticalForce,
                this.input.forwardForce,
            );
            this.dollyModel.move(
                this.getRotation(),
                this.strength,
                this.stopwatch.timeDeltaMSec
            );
        }

        if (this.input.shouldMoveTo1F) {
            this.dollyModel.moveTo1F();
        }
        else if (this.input.shouldMoveTo2F) {
            this.dollyModel.moveTo2F();
        }
    }
}

class NotXRDollyController extends AbstractDollyController {
    protected getRotation(): Readonly<DeltaEuler> | Readonly<Euler> {
        return this.input.rotation;
    }

    constructor(
        input: IInput,
        stopwatch: IStopwatchOutput,
        dollyModel: IDollyModelInput,
    ) {
        super(input, stopwatch, dollyModel);
    }
}

class XRDollyController extends AbstractDollyController {
    private readonly tmpEuler = new Euler(0, 0, 0, 'YXZ');
    constructor(
        input: IInput,
        stopwatch: IStopwatchOutput,
        dollyModel: IDollyModelInput,
        protected readonly camera: Object3D,
        protected readonly dollyHead: Object3D,
    ) {
        super(input, stopwatch, dollyModel);
    }

    protected getRotation(): Readonly<DeltaEuler> | Readonly<Euler> {
        return this.tmpEuler.set(
            this.dollyHead.rotation.x + this.camera.rotation.x,
            this.dollyHead.rotation.y + this.camera.rotation.y,
            this.dollyHead.rotation.z + this.camera.rotation.z,
        );
    }
}