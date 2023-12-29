import {StateQueryParams} from '../../StateQueryParams';

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

export interface IReadonlyHomeState {
    readonly doorOpened: boolean;
    clone(): HomeState;
    equals(other: IReadonlyHomeState): boolean;
}

export class HomeState implements IReadonlyHomeState {
    constructor(public doorOpened: boolean) {}

    clone(): HomeState {
        return new HomeState(this.doorOpened);
    }

    equals(other: IReadonlyHomeState): boolean {
        return this.doorOpened === other.doorOpened;
    }

    encodeTo(params: StateQueryParams): void {
        params.doorOpened = this.doorOpened;
    }

    static decodeFrom(params: URLSearchParams): HomeState {
        return new HomeState(params.get('doorOpened') !== '0');
    }

    static readonly DEFAULT: IReadonlyHomeState = new HomeState(true);
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
