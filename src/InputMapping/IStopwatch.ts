import {BASE_FPS} from "../Const";

export interface IStopwatch extends IStopwatchInput, IStopwatchOutput {
    start(): void;
}

export interface IStopwatchInput {
    lap(): void;
}

export interface IStopwatchOutput {
    readonly timeDeltaMSec: number;
}

export class Stopwatch implements IStopwatch {
    private prevMSec: number = NaN;
    public timeDeltaMSec: number = 1000 / BASE_FPS;

    start() {
        this.prevMSec = Date.now();
    }

    lap() {
        const now = Date.now();
        this.timeDeltaMSec = now - this.prevMSec;
        this.prevMSec = now;
    }
}