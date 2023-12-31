import {IInput} from "./IInput";
import {Euler} from "three";
import {DeltaEuler} from "./DeltaEuler";

export class CompositeInput implements IInput {
    private static readonly DELTA_EULER_ZERO: Readonly<DeltaEuler> = new DeltaEuler(0, 0, 0);

    constructor(private readonly inputs: IInput[]) {
    }

    get forwardForce(): number {
        let max = 0;
        for (const input of this.inputs) {
            if (Math.abs(input.forwardForce) > Math.abs(max)) max = input.forwardForce;
        }
        return max;
    }

    get rotation(): Readonly<DeltaEuler> | Readonly<Euler> {
        for (const input of this.inputs) {
            if (input.rotation.isEuler || input.rotation.x !== 0 || input.rotation.y !== 0) {
                return input.rotation;
            }
        }
        return CompositeInput.DELTA_EULER_ZERO;
    }

    get shouldCloseDoor(): boolean {
        for (const input of this.inputs) {
            if (input.shouldCloseDoor) return true;
        }
        return false;
    }

    get shouldMoveTo1F(): boolean {
        for (const input of this.inputs) {
            if (input.shouldMoveTo1F) return true;
        }
        return false;
    }

    get shouldMoveTo2F(): boolean {
        for (const input of this.inputs) {
            if (input.shouldMoveTo2F) return true;
        }
        return false;
    }

    get shouldOpenDoor(): boolean {
        for (const input of this.inputs) {
            if (input.shouldOpenDoor) return true;
        }
        return false;
    }

    get shouldReset(): boolean {
        for (const input of this.inputs) {
            if (input.shouldReset) return true;
        }
        return false;
    }

    get verticalForce(): number {
        let max = 0;
        for (const input of this.inputs) {
            if (Math.abs(input.verticalForce) > Math.abs(max)) max = input.verticalForce;
        }
        return max;
    }

    get sidewaysForce(): number {
        let max = 0;
        for (const input of this.inputs) {
            if (Math.abs(input.sidewaysForce) > Math.abs(max)) max = input.sidewaysForce;
        }
        return max;
    }

    start(): void {
        for (const input of this.inputs) {
            input.start();
        }
    }

    update(): void {
        for (const input of this.inputs) {
            input.update();
        }
    }
}