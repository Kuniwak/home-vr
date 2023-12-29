import {PerspectiveCamera} from 'three';
import {IResizable} from '../IResizable';

export class ResizablePerspectiveCamera implements IResizable {
    constructor(private readonly camera: PerspectiveCamera) {
    }

    setPixelRatio(pixelRatio: number): void {
        // NOTE: Do nothing.
    }

    setSize(width: number, height: number) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }
}