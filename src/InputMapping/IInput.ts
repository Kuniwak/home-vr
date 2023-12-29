import {Euler} from 'three';

export class DeltaEuler {
    constructor(
        public x: number,
        public y: number,
    ) {}
}

export interface IInput {
    readonly rotation: DeltaEuler | Euler;
    readonly forwardForce: number;
    readonly verticalForce: number;
    readonly shouldMoveTo1F: boolean;
    readonly shouldMoveTo2F: boolean;
    readonly shouldOpenDoor: boolean;
    readonly shouldCloseDoor: boolean;
    readonly shouldPause: boolean;

    start(): void;

    update(): void;
}