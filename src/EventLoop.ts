import {IStopwatch} from './InputMapping/IStopwatch';
import {IInput} from './InputMapping/IInput';
import {IAnimationLoop} from './IAnimationLoop';
import {IRenderable} from './IRenderable';
import {Program} from './MVC/Program';

export class EventLoop {

    constructor(
        private readonly input: IInput,
        private readonly program: Program,
        private readonly stopwatch: IStopwatch,
        private readonly animation: IAnimationLoop,
        private readonly renderer: IRenderable,
    ) {
    }

    start() {
        this.stopwatch.start();
        this.input.start();

        this.program.start();

        this.animation.setAnimationLoop(() => {
            this.stopwatch.lap();
            this.input.update();

            this.program.update();

            this.renderer.render();
        });
    }
}