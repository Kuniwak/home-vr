import {IInput} from '../../../InputMapping/IInput';
import {IDollyModelInput} from '../Model/DollyModel';
import {IStopwatchOutput} from '../../../InputMapping/IStopwatch';

export class DollyController {
    constructor(
        private readonly input: IInput,
        private readonly stopwatch: IStopwatchOutput,
        private readonly dollyModel: IDollyModelInput,
    ) {
    }

    update() {
        this.dollyModel.update();

        if (this.input.shouldReset) {
            this.dollyModel.reset();
        } else {
            this.dollyModel.move(this.input.rotation, this.input.forwardForce, this.input.verticalForce, this.stopwatch.timeDeltaMSec);
        }

        if (this.input.shouldMoveTo1F) {
            this.dollyModel.moveTo1F();
        } else if (this.input.shouldMoveTo2F) {
            this.dollyModel.moveTo2F();
        }
    }
}