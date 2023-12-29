import {Euler, Vector3} from 'three';
import {BASE_FPS, HEIGHT_2F} from '../../../Const';
import {DeltaEuler} from '../../../InputMapping/IInput';
import {ProgramState} from '../../Program';

export interface IDollyModelInput {
    move(rotation: DeltaEuler | Euler, forwardStrength: number, verticalStrength: number, timeDeltaMSec: number): void;

    moveTo1F(): void;

    moveTo2F(): void;
}

export interface IDollyModelOutput {
    readonly state: IReadonlyDollyState;
}

export interface IReadonlyDollyState {
    readonly rotationX: Readonly<number>;
    readonly rotationY: Readonly<number>;
    readonly position: Readonly<Vector3>

    clone(): IReadonlyDollyState;

    equals(other: IReadonlyDollyState): boolean;
}

export class DollyState implements IReadonlyDollyState {
    constructor(
        public rotationX: number,
        public rotationY: number,
        public position: Vector3,
    ) {
    }

    clone(): DollyState {
        return new DollyState(this.rotationX, this.rotationY, this.position.clone());
    }

    equals(other: IReadonlyDollyState): boolean {
        return this.rotationX === other.rotationX && this.rotationY === other.rotationY && this.position.equals(other.position);
    }

    encodeTo(params: URLSearchParams): void {
        params.set('posX', this.position.x.toString());
        params.set('posY', this.position.y.toString());
        params.set('posZ', this.position.z.toString());
        params.set('rotX', this.rotationX.toString());
        params.set('rotY', this.rotationY.toString());
    }

    static decodeFrom(params: URLSearchParams): DollyState {
        return new DollyState(
            parseFloat(params.get('rotX') || ProgramState.DEFAULT.dolly.rotationX.toString()),
            parseFloat(params.get('rotY') || ProgramState.DEFAULT.dolly.rotationY.toString()),
            new Vector3(
                parseFloat(params.get('posX') || ProgramState.DEFAULT.dolly.position.x.toString()),
                parseFloat(params.get('posY') || ProgramState.DEFAULT.dolly.position.y.toString()),
                parseFloat(params.get('posZ') || ProgramState.DEFAULT.dolly.position.z.toString()),
            ),
        );
    }
}

export class DollyModel implements IDollyModelInput, IDollyModelOutput {
    private readonly tmpVector3: Vector3 = new Vector3();
    private readonly tmpEuler: Euler = new Euler(0, 0, 0, 'YXZ');
    private static readonly initVector: Readonly<Vector3> = new Vector3(0, 0, -1);

    get state(): DollyState {
        return this._state;
    }

    constructor(
        private readonly _state: DollyState,
        private readonly forwardVelocity: number,
        private readonly verticalVelocity: number,
    ) {
    }

    move(rotation: DeltaEuler | Euler, forwardStrength: number, verticalStrength: number, timeDeltaMSec: number) {
        if (rotation instanceof DeltaEuler) {
            this._state.rotationX += rotation.x;
            this._state.rotationY += rotation.y;
        } else {
            this._state.rotationX = rotation.x;
            this._state.rotationY = rotation.y;
        }
        this.tmpEuler.x = this._state.rotationX;
        this.tmpEuler.y = this._state.rotationY;

        const timeFactor = timeDeltaMSec / 1000 * BASE_FPS;
        this.tmpVector3.copy(DollyModel.initVector).applyEuler(this.tmpEuler);
        this.tmpVector3.multiplyScalar(this.forwardVelocity * forwardStrength * timeFactor);
        this.tmpVector3.y = this.verticalVelocity * verticalStrength * timeFactor;
        this._state.position.add(this.tmpVector3);
    }

    moveTo1F(): void {
        this._state.position.y = 0;
    }

    moveTo2F(): void {
        this._state.position.y = HEIGHT_2F;
    }
}