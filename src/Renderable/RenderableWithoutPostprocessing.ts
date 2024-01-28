import {IRenderable} from './IRenderable';
import {IResizable} from '../IResizable';
import {PerspectiveCamera, Scene, WebGLRenderer} from 'three';

export class RenderableWithoutPostprocessing implements IRenderable, IResizable {
    constructor(
        private readonly renderer: WebGLRenderer,
        private readonly camera: PerspectiveCamera,
        private readonly scene: Scene,
    ) {
        renderer.xr.enabled = true;
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    setPixelRatio(pixelRatio: number): void {
        this.renderer.setPixelRatio(pixelRatio);
    }

    setSize(width: number, height: number): void {
        this.renderer.setSize(width, height);
    }
}