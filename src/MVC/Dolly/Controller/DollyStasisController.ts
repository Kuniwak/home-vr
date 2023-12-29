import {IDollyStasisModelInput} from "../Model/DollyStasisModel";

export class DollyStasisController {
    constructor(private readonly dollyStasisModel: IDollyStasisModelInput) {
    }

    update() {
        this.dollyStasisModel.update();
    }
}