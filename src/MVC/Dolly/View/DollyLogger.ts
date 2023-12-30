import {IDollyModelOutput} from '../Model/DollyModel';
import {IDollyStasisModelOutput} from '../Model/DollyStasisModel';

export class DollyLogger {
    constructor(
        private readonly dollyModel: IDollyModelOutput,
        private readonly dollyStasisModel: IDollyStasisModelOutput,
    ) {
    }

    update() {
        if (this.dollyStasisModel.state.isNoStasis) {
            console.log(
                "pos=(%s, %s, %s) rot=(%s, %s, %s)",
                this.dollyModel.state.position.x.toFixed(3),
                this.dollyModel.state.position.y.toFixed(3),
                this.dollyModel.state.position.z.toFixed(3),
                this.dollyModel.state.rotation.x.toFixed(3),
                this.dollyModel.state.rotation.y.toFixed(3),
                this.dollyModel.state.rotation.z.toFixed(3),
            )
        }
    }
}