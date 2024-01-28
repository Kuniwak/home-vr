import {IRenderable} from './IRenderable';
import {IResizable} from '../IResizable';
import {PerspectiveCamera, Scene, Vector2, WebGLRenderer} from 'three';
import {
    BlendFunction,
    DepthDownsamplingPass,
    EffectComposer,
    EffectPass,
    NormalPass,
    RenderPass,
    SSAOEffect,
    TextureEffect,
} from 'postprocessing';

export class RenderableWithPostprocessing implements IRenderable, IResizable {
    private readonly bufferSize = new Vector2();
    private readonly composer: EffectComposer;

    constructor(
        private readonly renderer: WebGLRenderer,
        private readonly camera: PerspectiveCamera,
        scene: Scene,
    ) {
        let composer = new EffectComposer(renderer, {multisampling: 8});
        const normalPass = new NormalPass(scene, camera);
        const depthDownsamplingPass = new DepthDownsamplingPass({
            normalBuffer: normalPass.texture,
            resolutionScale: 0.5,
        });
        const ssaoEffect = new SSAOEffect(camera, normalPass.texture, {
            blendFunction: BlendFunction.MULTIPLY,
            normalDepthBuffer: depthDownsamplingPass.texture,
            worldDistanceThreshold: 20,
            worldDistanceFalloff: 5,
            worldProximityThreshold: 0.4,
            worldProximityFalloff: 0.1,
            luminanceInfluence: 0.7,
            samples: 16,
            radius: 0.04,
            intensity: 1,
            resolutionScale: 0.5,
        });
        const textureEffect = new TextureEffect({
            blendFunction: BlendFunction.SKIP,
            texture: depthDownsamplingPass.texture,
        });

        composer.addPass(new RenderPass(scene, camera));
        composer.addPass(normalPass);
        composer.addPass(depthDownsamplingPass);
        composer.addPass(new EffectPass(camera, ssaoEffect, textureEffect));
        this.composer = composer;
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

    setSize(width: number, height: number): void {
        this.composer.setSize(width, height);
    }

    setPixelRatio(pixelRatio: number): void {
        this.renderer.setPixelRatio(pixelRatio);
    }
}