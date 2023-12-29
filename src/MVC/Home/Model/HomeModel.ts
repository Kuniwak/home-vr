import {HomeState} from './HomeState';

export interface IHomeModelInput {
    update(): void;
    openDoor(): void;
    closeDoor(): void;
    reset(): void;
}

export interface IHomeModelOutput {
    readonly state: HomeState;
    readonly hasChanged: boolean;
}

export class HomeModel implements IHomeModelInput, IHomeModelOutput {
    get hasChanged(): boolean {
        return this._hasChanged;
    }

    private _hasChanged = false;

    constructor(
        public state: HomeState,
    ) {
    }

    update() {
        this._hasChanged = false;
    }

    reset() {
        if (this.state.equals(HomeState.DEFAULT)) return;
        this.state = HomeState.DEFAULT.clone();
        this._hasChanged = true;
    }

    openDoor() {
        if (this.state.doorOpened) return;
        this.state.doorOpened = true;
        this._hasChanged = true;
    }

    closeDoor() {
        if (!this.state.doorOpened) return;
        this.state.doorOpened = false;
        this._hasChanged = true;
    }
}
