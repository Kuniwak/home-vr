import {Euler, Vector3} from "three";
import {BASE_FPS, HEIGHT_2F} from "../../../Const";

export interface IDollyModelInput {
    move(rotation: Euler, forwardStrength: number, verticalStrength: number, timeDeltaMSec: number): void;

    moveTo1F(): void;

    moveTo2F(): void;
}

export interface IDollyModelOutput {
    readonly state: IReadonlyDollyState;
}

export interface IReadonlyDollyState {
    readonly rotation: Readonly<Euler>;
    readonly position: Readonly<Vector3>
}

export class DollyState {
    constructor(
        public rotation: Euler,
        public position: Vector3,
    ) {
    }
}

export class DollyModel implements IDollyModelInput, IDollyModelOutput {
    private readonly tmp: Vector3 = new Vector3();
    private static readonly initVector: Readonly<Vector3> = new Vector3(0, 0, 1);

    get state(): IReadonlyDollyState {
        return this._state;
    }

    constructor(
        private readonly _state: DollyState,
        private readonly forwardVelocity: number,
        private readonly verticalVelocity: number,
    ) {
    }

    move(rotation: Euler, forwardStrength: number, verticalStrength: number, timeDeltaMSec: number) {
        const timeFactor = timeDeltaMSec / 1000 * BASE_FPS;
        this.tmp.copy(DollyModel.initVector).applyEuler(rotation);
        this.tmp.multiplyScalar(this.forwardVelocity * forwardStrength * timeFactor);
        this.tmp.y = this.verticalVelocity * verticalStrength * timeFactor;
        this._state.position.add(this.tmp);
        this._state.rotation.copy(rotation);
    }

    moveTo1F(): void {
        this._state.position.y = 0;
    }

    moveTo2F(): void {
        this._state.position.y = HEIGHT_2F;
    }
}