import {ProgramState} from "../../Program";

export interface IHomeModelInput {
    openDoor(): void;
    closeDoor(): void;
    reset(): void;
}

export interface IHomeModelOutput {
    readonly state: HomeState;
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

    encodeTo(params: URLSearchParams): void {
        params.set('doorOpened', this.doorOpened ? '1' : '0');
    }

    static decodeFrom(params: URLSearchParams): HomeState {
        return new HomeState(params.get('doorOpened') !== '0');
    }
}

export class HomeModel implements IHomeModelInput, IHomeModelOutput {
    constructor(
        public state: HomeState,
    ) {
    }

    reset() {
        this.state = ProgramState.DEFAULT.home.clone();
    }

    openDoor() {
        this.state.doorOpened = true;
    }

    closeDoor() {
        this.state.doorOpened = false;
    }
}
