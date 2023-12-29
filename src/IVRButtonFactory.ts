import {WebGLRenderer} from 'three';
import {VRButton} from 'three/examples/jsm/webxr/VRButton.js';

export interface IVRButtonFactory {
    createButton(): HTMLElement;
}

export class VRButtonFactory implements IVRButtonFactory {
   constructor(private readonly renderer: WebGLRenderer) {
   }

    createButton(): HTMLElement {
         return VRButton.createButton(this.renderer);
    }
}