import {Euler, Vector2} from "three";

export class EulerDraggable {
    get cameraEuler(): Readonly<Euler> {
        return this.cameraEulerMutable;
    }

    private readonly cameraEulerMutable: Euler = new Euler(0, 0, 0, 'YXZ');
    private readonly current: Vector2 = new Vector2();

    constructor(private readonly sensitivity: number) {}

    onDragStart(x: number, y: number) {
        this.current.set(x, y);
    }

    onDragMove(x: number, y: number) {
        const deltaX = this.current.x - x;
        const deltaY = this.current.y - y;
        this.cameraEulerMutable.y -= deltaX * this.sensitivity;
        this.cameraEulerMutable.x -= deltaY * this.sensitivity;
        this.current.set(x, y);
    }

    onDragEnd() {
        this.current.set(0, 0);
    }
}