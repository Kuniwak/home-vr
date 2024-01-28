import {Env} from '../EnvDetection';
import {PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {IResizable} from '../IResizable';
import {IRenderable} from './IRenderable';
import {RenderableWithoutPostprocessing} from './RenderableWithoutPostprocessing';
import {RenderableWithPostprocessing} from './RenderableWithPostprocessing';

export function buildRenderable(env: Env, renderer: WebGLRenderer, camera: PerspectiveCamera, scene: Scene): IRenderable & IResizable {
    if (env === 'XR') {
        return new RenderableWithoutPostprocessing(renderer, camera, scene);
    }

    return new RenderableWithPostprocessing(renderer, camera, scene);
}
