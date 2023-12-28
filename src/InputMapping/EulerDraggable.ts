import {Vector2} from "three";
import {DeltaEuler} from "./IInput";

export class EulerDraggable {
    get rotDelta(): DeltaEuler {
        return this._rotDelta;
    }
    private readonly _rotDelta: DeltaEuler = new DeltaEuler(0, 0);
    private readonly current: Vector2 = new Vector2();

    constructor(
        private readonly sensitivity: number,
    ) {}

    onDragStart(x: number, y: number) {
        this.current.set(x, y);
    }

    onDragMove(x: number, y: number) {
        this._rotDelta.x = (y - this.current.y) * this.sensitivity;
        this._rotDelta.y = (x - this.current.x) * this.sensitivity;
        this.current.set(x, y);
    }

    onDragEnd() {
        this._rotDelta.x = 0;
        this._rotDelta.y = 0;
        this.current.set(0, 0);
    }
}