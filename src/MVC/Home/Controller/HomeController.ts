import {IInput} from "../../../InputMapping/IInput";
import {IHomeModelInput} from "../Model/HomeModel";

export class HomeController {
    constructor(
        private readonly input: IInput,
        private readonly homeModel: IHomeModelInput,
    ) {
    }

    update() {
        if (this.input.shouldOpenDoor) {
            this.homeModel.openDoor();
        }
        if (this.input.shouldCloseDoor) {
            this.homeModel.closeDoor();
        }
    }
}