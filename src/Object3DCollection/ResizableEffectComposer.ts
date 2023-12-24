import {IResizable} from "../IResizable";
import {EffectComposer} from "postprocessing";

export class ResizableEffectComposer implements IResizable {
    constructor(private readonly composer: EffectComposer) {
    }

    setPixelRatio(pixelRatio: number): void {
        // NOTE: Do nothing.
    }

    setSize(width: number, height: number) {
        this.composer.setSize(width, height);
    }
}