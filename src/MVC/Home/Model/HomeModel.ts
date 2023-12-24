export const DOOR_OPENED_CLOSET_CLOSED: true = true;
export const DOOR_CLOSED_CLOSET_OPENED: false = false;
export type HomeState = typeof DOOR_OPENED_CLOSET_CLOSED | typeof DOOR_CLOSED_CLOSET_OPENED;

export interface IHomeModelInput {
    openDoor(): void;
    closeDoor(): void;
}

export interface IHomeModelOutput {
    readonly state: HomeState;
}

export class HomeModel implements IHomeModelInput, IHomeModelOutput {
    constructor(
        public state: HomeState,
    ) {
    }

    openDoor() {
        this.state = DOOR_OPENED_CLOSET_CLOSED;
    }

    closeDoor() {
        this.state = DOOR_CLOSED_CLOSET_OPENED;
    }
}
