import {Euler, Vector3} from 'three';
import {BASE_FPS, ENTRANCE_POSITION, HEIGHT_2F} from '../../../Const';
import {DeltaEuler} from '../../../InputMapping/IInput';
import {ProgramState} from '../../Program';
import {StateQueryParams} from "../../StateQueryParams";

export interface IDollyModelInput {
    update(): void;

    move(rotation: DeltaEuler | Euler, forwardStrength: number, verticalStrength: number, timeDeltaMSec: number): void;

    reset(): void;

    moveTo1F(): void;

    moveTo2F(): void;
}

export interface IDollyModelOutput {
    readonly state: IReadonlyDollyState;
    readonly hasChanged: boolean;
}

export interface IReadonlyDollyState {
    readonly rotationX: Readonly<number>;
    readonly rotationY: Readonly<number>;
    readonly position: Readonly<Vector3>

    clone(): DollyState;

    equals(other: IReadonlyDollyState): boolean;

    encodeTo(urlSearchParams: StateQueryParams): void;
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
        return this.rotationX === other.rotationX && this.rotationY === other.rotationY
            && this.position.equals(other.position);
    }

    encodeTo(params: StateQueryParams): void {
        params.posX = this.position.x;
        params.posY = this.position.y;
        params.posZ = this.position.z;
        params.rotX = this.rotationX;
        params.rotY = this.rotationY;
    }

    static decodeFrom(params: URLSearchParams): DollyState {
        return new DollyState(
            parseFloat(params.get('rotX') || DollyState.DEFAULT.rotationX.toString()),
            parseFloat(params.get('rotY') || DollyState.DEFAULT.rotationY.toString()),
            new Vector3(
                parseFloat(params.get('posX') || DollyState.DEFAULT.position.x.toString()),
                parseFloat(params.get('posY') || DollyState.DEFAULT.position.y.toString()),
                parseFloat(params.get('posZ') || DollyState.DEFAULT.position.z.toString()),
            ),
        );
    }

    static readonly DEFAULT: IReadonlyDollyState = new DollyState(0, Math.PI, ENTRANCE_POSITION);
}

export class DollyModel implements IDollyModelInput, IDollyModelOutput {
    private readonly tmpVector3: Vector3 = new Vector3();
    private readonly tmpEuler: Euler = new Euler(0, 0, 0, 'YXZ');
    private _hasChanged: boolean = false;

    // NOTE: Three.js is in y-up right-handed coordinate system.
    private static readonly initVector: Readonly<Vector3> = new Vector3(0, 0, -1);

    get state(): DollyState {
        return this._state;
    }

    get hasChanged(): boolean {
        return this._hasChanged;
    }

    constructor(
        private _state: DollyState,
        private readonly forwardVelocity: number,
        private readonly verticalVelocity: number,
    ) {
    }

    update() {
        this._hasChanged = false;
    }

    reset(): void {
        if (this._state.equals(DollyState.DEFAULT)) return;
        this._state = DollyState.DEFAULT.clone();
        this._hasChanged = true;
    }

    move(rotation: DeltaEuler | Euler, forwardStrength: number, verticalStrength: number, timeDeltaMSec: number) {
        if (rotation instanceof DeltaEuler) {
            if (rotation.x !== 0 || rotation.y !== 0) this._hasChanged = true;
            this._state.rotationX += rotation.x;
            this._state.rotationY += rotation.y;
        }
        else {
            if (this._state.rotationX !== rotation.x || this._state.rotationY !== rotation.y) this._hasChanged =
                true;
            this._state.rotationX = rotation.x;
            this._state.rotationY = rotation.y;
        }
        this.tmpEuler.x = this._state.rotationX;
        this.tmpEuler.y = this._state.rotationY;

        if (forwardStrength !== 0 || verticalStrength !== 0) this._hasChanged = true;
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