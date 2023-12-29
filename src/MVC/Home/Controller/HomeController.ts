import {IInput} from '../../../InputMapping/IInput';
import {IHomeModelInput} from '../Model/HomeModel';

export class HomeController {
    constructor(
        private readonly input: IInput,
        private readonly homeModel: IHomeModelInput,
    ) {
    }

    update() {
        this.homeModel.update();

        if (this.input.shouldReset) {
            this.homeModel.reset();
        } else if (this.input.shouldOpenDoor) {
            this.homeModel.openDoor();
        } else if (this.input.shouldCloseDoor) {
            this.homeModel.closeDoor();
        }
    }
}