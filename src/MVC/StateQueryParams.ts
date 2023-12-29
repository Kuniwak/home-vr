export class StateQueryParams {
    constructor(
        public posX: number = 0,
        public posY: number = 0,
        public posZ: number = 0,
        public rotX: number = 0,
        public rotY: number = 0,
        public doorOpened: boolean = false,
    ) {
    }

    private static readonly POS_PRECISION = 3;
    private static readonly ROT_PRECISION = 3;
    private static readonly POS_X_NAME = 'posX';
    private static readonly POS_Y_NAME = 'posY';
    private static readonly POS_Z_NAME = 'posZ';
    private static readonly ROT_X_NAME = 'rotX';
    private static readonly ROT_Y_NAME = 'rotY';
    private static readonly DOOR_OPENED_NAME = 'doorOpened';
    private static readonly EQ = '=';
    private static readonly AMP = '&';
    private static readonly Q = '?';
    private static readonly ZERO = '0';
    private static readonly ONE = '1';


    toString(): string {
        // NOTE: Do not use encodeURIComponent() here. It is unnecessary, and it can make much garbage and GC is
        // critical here.
        return StateQueryParams.Q + StateQueryParams.POS_X_NAME + StateQueryParams.EQ + this.posX.toFixed(StateQueryParams.POS_PRECISION) +
            StateQueryParams.AMP + StateQueryParams.POS_Y_NAME + StateQueryParams.EQ + this.posY.toFixed(StateQueryParams.POS_PRECISION) +
            StateQueryParams.AMP + StateQueryParams.POS_Z_NAME + StateQueryParams.EQ + this.posZ.toFixed(StateQueryParams.POS_PRECISION) +
            StateQueryParams.AMP + StateQueryParams.ROT_X_NAME + StateQueryParams.EQ + this.rotX.toFixed(StateQueryParams.ROT_PRECISION) +
            StateQueryParams.AMP + StateQueryParams.ROT_Y_NAME + StateQueryParams.EQ + this.rotY.toFixed(StateQueryParams.ROT_PRECISION) +
            StateQueryParams.AMP + StateQueryParams.DOOR_OPENED_NAME + StateQueryParams.EQ + (this.doorOpened ? StateQueryParams.ONE : StateQueryParams.ZERO);
    }
}