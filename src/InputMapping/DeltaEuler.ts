export class DeltaEuler {
    public readonly isEuler: false = false;

    constructor(
        public x: number,
        public y: number,
    ) {
    }
}