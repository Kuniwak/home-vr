import {Euler} from 'three';

export class DeltaEuler {
    public readonly isEuler: false = false;

    constructor(
        public x: number,
        public y: number,
    ) {}
}

export interface IInput {
    readonly rotation: Readonly<DeltaEuler> | Readonly<Euler>;
    readonly forwardForce: number;
    readonly verticalForce: number;
    readonly shouldReset: boolean;
    readonly shouldMoveTo1F: boolean;
    readonly shouldMoveTo2F: boolean;
    readonly shouldOpenDoor: boolean;
    readonly shouldCloseDoor: boolean;

    start(): void;

    update(): void;
}