import {IDollyStasisModelOutput} from "../Model/DollyStasisModel";
import {IDollyModelOutput, DollyState} from "../Model/DollyModel";
import {IHomeModelOutput, HomeState} from "../../Home/Model/HomeModel";
import {StateQueryParams} from "../../StateQueryParams";
import {History} from "../../../DOMTestable/History";

export class DollyStasisView {
    private readonly urlSearchParams = new StateQueryParams(
        DollyState.DEFAULT,
        HomeState.DEFAULT,
    );

    constructor(
        private readonly dollyModel: IDollyModelOutput,
        private readonly homeModel: IHomeModelOutput,
        private readonly dollyStasisModel: IDollyStasisModelOutput,
        private readonly history: History
    ) {
    }

    update() {
        if (!this.dollyStasisModel.state.isStasisStarted) return;
        this.updateURL();
    }

    private updateURL() {
        if (this.dollyModel.state.equals(DollyState.DEFAULT) && this.homeModel.state.equals(HomeState.DEFAULT)) {
            this.history.replaceState(null, '', '/');
            return;
        }
        this.dollyModel.state.encodeTo(this.urlSearchParams);
        this.homeModel.state.encodeTo(this.urlSearchParams);
        this.history.replaceState(null, '', this.urlSearchParams.toString());
    }
}