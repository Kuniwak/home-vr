import {IDollyModelOutput} from "./DollyModel";

export class NoStasis {
    readonly isNoStasis: true = true;
    readonly isStasisStarted: false = false;
    readonly isStasisKept: false = false;
    waitCount = 0;
    static readonly MAX_WAIT_COUNT = 20;
}

export class StasisStarted {
    readonly isNoStasis: false = false;
    readonly isStasisStarted: true = true;
    readonly isStasisKept: false = false;
    static readonly DEFAULT = new StasisStarted();
}

export class StasisKept {
    readonly isNoStasis: false = false;
    readonly isStasisStarted: false = false;
    readonly isStasisKept: true = true;
    static readonly DEFAULT = new StasisKept();
}

export type DollyStasisState = NoStasis | StasisStarted | StasisKept;

export interface IDollyStasisModelInput {
    update(): void;
}

export interface IDollyStasisModelOutput {
    readonly state: Readonly<DollyStasisState>;
}

export class DollyStasisModel implements IDollyStasisModelInput, IDollyStasisModelOutput {
    get state(): Readonly<DollyStasisState> {
        return this._state;
    }

    private readonly noStasis = new NoStasis();
    private _state: DollyStasisState = this.noStasis;

    constructor(
        private readonly dollyModel: IDollyModelOutput,
    ) {
    }

    update() {
        const state = this._state;
        if (state.isNoStasis) {
            if (this.dollyModel.hasChanged) {
                state.waitCount = 0;
                return;
            }
            if (state.waitCount < NoStasis.MAX_WAIT_COUNT) {
                state.waitCount++;
                return;
            }
            this._state = StasisStarted.DEFAULT;
            return;
        }
        else if (state.isStasisStarted) {
            if (this.dollyModel.hasChanged) {
                this._state = this.noStasis;
                this.noStasis.waitCount = 0;
                return;
            }
            this._state = StasisKept.DEFAULT;
            return;
        }
        else {
            if (this.dollyModel.hasChanged) {
                this._state = this.noStasis;
                this.noStasis.waitCount = 0;
                return;
            }
            return;
        }
    }
}