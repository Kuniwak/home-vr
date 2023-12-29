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

    private static readonly posXName = 'posX';
    private static readonly posYName = 'posY';
    private static readonly posZName = 'posZ';
    private static readonly rotXName = 'rotX';
    private static readonly rotYName = 'rotY';
    private static readonly doorOpenedName = 'doorOpened';
    private static readonly eq = '=';
    private static readonly amp = '&';
    private static readonly q = '?';
    private static readonly zero = '0';
    private static readonly one = '1';


    toString(): string {
        // NOTE: Do not use encodeURIComponent() here. It is unnecessary, and it can make much garbage and GC is critical here.
        return StateQueryParams.q + StateQueryParams.posXName + StateQueryParams.eq + this.posX.toString() +
            StateQueryParams.amp + StateQueryParams.posYName + StateQueryParams.eq + this.posY.toString() +
            StateQueryParams.amp + StateQueryParams.posZName + StateQueryParams.eq + this.posZ.toString() +
            StateQueryParams.amp + StateQueryParams.rotXName + StateQueryParams.eq + this.rotX.toString() +
            StateQueryParams.amp + StateQueryParams.rotYName + StateQueryParams.eq + this.rotY.toString() +
            StateQueryParams.doorOpenedName + StateQueryParams.eq + (this.doorOpened
                ? StateQueryParams.one : StateQueryParams.zero);
    }
}