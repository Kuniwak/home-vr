import {Euler} from 'three';
import {DeltaEuler} from "./DeltaEuler";

export interface IInput {
    readonly rotation: Readonly<DeltaEuler> | Readonly<Euler>;
    readonly forwardForce: number;
    readonly sidewaysForce: number;
    readonly verticalForce: number;
    readonly shouldReset: boolean;
    readonly shouldMoveTo1F: boolean;
    readonly shouldMoveTo2F: boolean;
    readonly shouldOpenDoor: boolean;
    readonly shouldCloseDoor: boolean;

    start(): void;

    update(): void;
}