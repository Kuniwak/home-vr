import {Euler, Vector3} from 'three';
import {BASE_FPS, HEIGHT_2F} from '../../../Const';
import {DeltaEuler} from '../../../InputMapping/DeltaEuler';
import {DollyState, IReadonlyDollyState} from "./DollyState";

export interface IDollyModelInput {
    update(): void;

    move(rotation: DeltaEuler | Euler, forwardStrength: number, verticalStrength: number, sidewaysStrength: number, timeDeltaMSec: number): void;

    reset(): void;

    moveTo1F(): void;

    moveTo2F(): void;
}

export interface IDollyModelOutput {
    readonly state: IReadonlyDollyState;
    readonly hasChanged: boolean;
}

export class DollyModel implements IDollyModelInput, IDollyModelOutput {
    private readonly tmpForward: Vector3 = new Vector3();
    private readonly tmpSideways: Vector3 = new Vector3();
    private readonly tmpVertical: Vector3 = new Vector3();
    private readonly tmpEuler: Euler = new Euler(0, 0, 0, 'YXZ');
    private _hasChanged: boolean = false;

    // NOTE: Three.js is in y-up right-handed coordinate system.
    private static readonly forward: Readonly<Vector3> = new Vector3(0, 0, -1);
    private static readonly sideways: Readonly<Vector3> = new Vector3(1, 0, 0);
    private static readonly vertical: Readonly<Vector3> = new Vector3(0, 1, 0);

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
        private readonly sidewaysVelocity: number,
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

    move(rotation: DeltaEuler | Euler, forwardStrength: number, verticalStrength: number, sidewaysStrength: number, timeDeltaMSec: number) {
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

        if (forwardStrength !== 0 || verticalStrength !== 0 || sidewaysStrength !== 0) this._hasChanged = true;
        const timeFactor = timeDeltaMSec / 1000 * BASE_FPS;

        this.tmpForward.copy(DollyModel.forward).applyEuler(this.tmpEuler);
        this.tmpForward.multiplyScalar(this.forwardVelocity * forwardStrength * timeFactor);
        this.tmpForward.y = 0;

        this.tmpSideways.copy(DollyModel.sideways).applyEuler(this.tmpEuler);
        this.tmpSideways.multiplyScalar(this.sidewaysVelocity * sidewaysStrength * timeFactor);
        this.tmpSideways.y = 0;

        this.tmpVertical.copy(DollyModel.vertical);
        this.tmpVertical.y = this.verticalVelocity * verticalStrength * timeFactor;

        this._state.position.add(this.tmpForward).add(this.tmpSideways).add(this.tmpVertical);
    }

    moveTo1F(): void {
        this._state.position.y = 0;
    }

    moveTo2F(): void {
        this._state.position.y = HEIGHT_2F;
    }
}