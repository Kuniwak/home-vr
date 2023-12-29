import {StateQueryParams} from '../../StateQueryParams';

export interface IReadonlyHomeState {
    readonly doorOpened: boolean;

    clone(): HomeState;

    equals(other: IReadonlyHomeState): boolean;
}


export class HomeState implements IReadonlyHomeState {
    constructor(public doorOpened: boolean) {
    }

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