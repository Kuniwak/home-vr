import {getDOM} from './DOM/DOM';
import {EventLoop} from './EventLoop';
import {detectEnv} from './EnvDetection';
import {load} from './Loader';
import {Input} from './InputMapping/Input';
import {Stopwatch} from './InputMapping/IStopwatch';
import {Program} from './MVC/Program';

main();

export async function main() {
    const env = await detectEnv();
    const dom = getDOM();
    const {
        xrsFactory,
        animationLoop,
        resizable,
        renderable,
        object3DCollection,
        vrButtonFactory
    } = await load(env, dom.canvas);
    const input = new Input(env, dom, object3DCollection.camera, xrsFactory);
    const stopwatch = new Stopwatch();

    const eventLoop = new EventLoop(
        input,
        new Program(
            env,
            input,
            dom,
            object3DCollection,
            resizable,
            stopwatch,
            vrButtonFactory,
            history,
            location,
        ),
        stopwatch,
        animationLoop,
        renderable,
    );
    eventLoop.start();

    (window as any).__DEBUG_HOME_VR__ = eventLoop;
}
