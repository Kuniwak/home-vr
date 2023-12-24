import {Euler} from "three";

export interface IInput {
    readonly cameraEuler: Euler;
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