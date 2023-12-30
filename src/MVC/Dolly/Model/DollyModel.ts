import {Euler, Vector3} from 'three';
import {BASE_FPS, ENTRANCE_POSITION, HEIGHT_2F} from '../../../Const';
import {DeltaEuler} from '../../../InputMapping/DeltaEuler';
import {StateQueryParams} from '../../StateQueryParams';

export interface IDollyModelInput {
    update(): void;

    move(
        rotation: DeltaEuler | Euler,
        strength: Vector3,
        timeDeltaMSec: number,
    ): void;

    reset(): void;

    moveTo1F(): void;

    moveTo2F(): void;
}

export interface IDollyModelOutput {
    readonly state: Readonly<DollyState>;
    readonly hasChanged: boolean;
}


export class DollyState  {
    constructor(
        public rotation: Euler,
        public position: Vector3,
    ) {
    }

    clone(): DollyState {
        return new DollyState(this.rotation.clone(), this.position.clone());
    }

    equals(other: Readonly<DollyState>): boolean {
        return this.rotation.equals(other.rotation) && this.position.equals(other.position);
    }

    encodeTo(params: StateQueryParams): void {
        params.dollyState = this;
    }

    static decodeFrom(params: URLSearchParams): DollyState {
        return new DollyState(
            new Euler(
                parseFloat(params.get('rotX') || DollyState.DEFAULT.rotation.x.toString()),
                parseFloat(params.get('rotY') || DollyState.DEFAULT.rotation.y.toString()),
                parseFloat(params.get('rotZ') || DollyState.DEFAULT.rotation.z.toString()),
            ),
            new Vector3(
                parseFloat(params.get('posX') || DollyState.DEFAULT.position.x.toString()),
                parseFloat(params.get('posY') || DollyState.DEFAULT.position.y.toString()),
                parseFloat(params.get('posZ') || DollyState.DEFAULT.position.z.toString()),
            ),
        );
    }

    static readonly DEFAULT: Readonly<DollyState> = new DollyState(
        new Euler(0, Math.PI, 0, 'YXZ'),
        ENTRANCE_POSITION,
    );
}

export class DollyModel implements IDollyModelInput, IDollyModelOutput {
    private readonly tmpVector3: Vector3 = new Vector3();
    private readonly tmpEuler: Euler = new Euler(0, 0, 0, 'YXZ');
    private _hasChanged: boolean = false;

    get state(): DollyState {
        return this._state;
    }

    get hasChanged(): boolean {
        return this._hasChanged;
    }

    constructor(
        private _state: DollyState,
        private readonly velocity: Vector3,
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

    move(
        rotation: DeltaEuler | Euler,
        strength: Vector3,
        timeDeltaMSec: number,
    ) {
        if (rotation instanceof DeltaEuler) {
            // NOTE: This is for PC or mobile.
            if (rotation.x !== 0 || rotation.y !== 0 || rotation.z !== 0) {
                this._hasChanged = true;
                this._state.rotation.x += rotation.x;
                this._state.rotation.y += rotation.y;
                this._state.rotation.z += rotation.z;
            }
        }
        else {
            // NOTE: This is for only XR.
            if (!this._state.rotation.equals(rotation)) {
                this._hasChanged = true;
                this._state.rotation.copy(rotation);
            }
        }
        this.tmpEuler.set(0, this._state.rotation.y, 0, 'YXZ');

        if (strength.x !== 0 || strength.y !== 0 || strength.z !== 0) this._hasChanged = true;
        const timeFactor = timeDeltaMSec / 1000 * BASE_FPS;

        this.tmpVector3.set(
            this.velocity.x * strength.x * timeFactor,
            this.velocity.y * strength.y * timeFactor,
            // NOTE: Three.js is in y-up right-handed coordinate system.
            -this.velocity.z * strength.z * timeFactor,
        );
        this.tmpVector3.applyEuler(this.tmpEuler);

        this._state.position.add(this.tmpVector3);
    }

    moveTo1F(): void {
        this._state.position.y = 0;
    }

    moveTo2F(): void {
        this._state.position.y = HEIGHT_2F;
    }
}