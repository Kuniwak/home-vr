import {DollyState} from './Dolly/Model/DollyModel';
import {HomeState} from './Home/Model/HomeModel';

export class StateQueryParams {
    constructor(
        public dollyState: Readonly<DollyState>,
        public homeState: Readonly<HomeState>,
    ) {
    }

    private static readonly POS_PRECISION = 3;
    private static readonly ROT_PRECISION = 3;
    private static readonly POS_X_NAME = 'posX';
    private static readonly POS_Y_NAME = 'posY';
    private static readonly POS_Z_NAME = 'posZ';
    private static readonly ROT_X_NAME = 'rotX';
    private static readonly ROT_Y_NAME = 'rotY';
    private static readonly ROT_Z_NAME = 'rotZ';
    private static readonly DOOR_OPENED_NAME = 'doorOpened';
    private static readonly EQ = '=';
    private static readonly AMP = '&';
    private static readonly Q = '?';
    private static readonly ZERO = '0';
    private static readonly ONE = '1';


    toString(): string {
        // NOTE: Do not use encodeURIComponent() here. It is unnecessary, and it can make much garbage and GC is
        // critical here.
        return StateQueryParams.Q + StateQueryParams.ROT_X_NAME + StateQueryParams.EQ + this.dollyState.rotation.x.toFixed(StateQueryParams.ROT_PRECISION) +
            StateQueryParams.AMP + StateQueryParams.ROT_Y_NAME + StateQueryParams.EQ + this.dollyState.rotation.y.toFixed(StateQueryParams.ROT_PRECISION) +
            StateQueryParams.AMP + StateQueryParams.ROT_Z_NAME + StateQueryParams.EQ + this.dollyState.rotation.z.toFixed(StateQueryParams.ROT_PRECISION) +
            StateQueryParams.AMP + StateQueryParams.POS_X_NAME + StateQueryParams.EQ + this.dollyState.position.x.toFixed(StateQueryParams.POS_PRECISION) +
            StateQueryParams.AMP + StateQueryParams.POS_Y_NAME + StateQueryParams.EQ + this.dollyState.position.y.toFixed(StateQueryParams.POS_PRECISION) +
            StateQueryParams.AMP + StateQueryParams.POS_Z_NAME + StateQueryParams.EQ + this.dollyState.position.z.toFixed(StateQueryParams.POS_PRECISION) +
            StateQueryParams.AMP + StateQueryParams.DOOR_OPENED_NAME + StateQueryParams.EQ + (this.homeState.doorOpened ? StateQueryParams.ONE : StateQueryParams.ZERO);
    }
}