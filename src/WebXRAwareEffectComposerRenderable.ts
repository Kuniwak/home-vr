import {EffectComposer} from "postprocessing";
import {PerspectiveCamera, Vector2, WebGLRenderer} from "three";
import {IRenderable} from "./IRenderable";

export class WebXRAwareEffectComposerRenderable implements IRenderable {
    private readonly bufferSize = new Vector2();

    constructor(
        private readonly composer: EffectComposer,
        private readonly renderer: WebGLRenderer,
        private readonly camera: PerspectiveCamera,
    ) {
    }


    render() {
        // SEE: https://x.com/Cody_J_Bennett/status/1482585611781480448
        // SEE: https://x.com/Cody_J_Bennett/status/1482585861292236803
        // SEE ALSO: https://github.com/mrdoob/three.js/pull/26160
        if (!this.renderer.xr.isPresenting) {
            this.composer.render();
            return;
        }

        this.renderer.xr.enabled = false;
        this.renderer.xr.updateCamera(this.camera);

        const {cameras} = this.renderer.xr.getCamera();
        cameras.forEach(c => {
            this.renderer.setViewport(c.viewport);
            this.camera.position.setFromMatrixPosition(c.matrix);
            this.camera.projectionMatrix.copy(c.projectionMatrix);

            this.composer.render();
        });

        this.renderer.getSize(this.bufferSize);
        this.renderer.setViewport(0, 0, this.bufferSize.width, this.bufferSize.height);
        this.renderer.xr.updateCamera(this.camera);
        this.renderer.xr.enabled = true;
    }
}