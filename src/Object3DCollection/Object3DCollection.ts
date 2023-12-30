import {Group, Object3D} from 'three';

export type Object3DCollection = {
    readonly dollyBody: Object3D;
    readonly dollyHead: Object3D;
    readonly homeDoorOpened: Group,
    readonly homeDoorClosed: Group,
    readonly camera: Object3D,
};