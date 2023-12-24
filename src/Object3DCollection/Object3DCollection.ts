import {Group, Object3D} from "three";

export type Object3DCollection = {
    readonly homeDoorOpened: Group,
    readonly homeDoorClosed: Group,
    readonly dollyHead: Object3D,
    readonly dollyBody: Object3D,
    readonly camera: Object3D,
};