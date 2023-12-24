import {Group} from "three";
import {IHomeModelOutput} from "../Model/HomeModel";

export class HomeView {
    constructor(
        private readonly homeModel: IHomeModelOutput,
        private readonly doorOpened: Group,
        private readonly doorClosed: Group,
    ) {
    }

    update() {
        if (this.homeModel.state) {
            this.doorOpened.visible = true;
            this.doorClosed.visible = false;
        } else {
            this.doorOpened.visible = false;
            this.doorClosed.visible = true;
        }
    }
}