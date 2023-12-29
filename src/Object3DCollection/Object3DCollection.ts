import {Group, Object3D} from 'three';

export type Object3DCollection = {
    readonly dolly: Object3D;
    readonly homeDoorOpened: Group,
    readonly homeDoorClosed: Group,
    readonly camera: Object3D,
};