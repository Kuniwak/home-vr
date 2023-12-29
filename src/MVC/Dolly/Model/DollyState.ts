import {Vector3} from "three";
import {StateQueryParams} from "../../StateQueryParams";
import {ENTRANCE_POSITION} from "../../../Const";

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