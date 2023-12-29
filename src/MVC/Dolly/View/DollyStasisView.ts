import {IDollyStasisModelOutput} from "../Model/DollyStasisModel";
import {IDollyModelOutput} from "../Model/DollyModel";
import {HomeState, IHomeModelOutput} from "../../Home/Model/HomeModel";
import {StateQueryParams} from "../../StateQueryParams";
import {History} from "../../../DOMTestable/History";
import {DollyState} from "../Model/DollyState";

export class DollyStasisView {
    private readonly urlSearchParams = new StateQueryParams();

    constructor(
        private readonly dollyModel: IDollyModelOutput,
        private readonly homeModel: IHomeModelOutput,
        private readonly dollyStasisModel: IDollyStasisModelOutput,
        private readonly history: History
    ) {
    }

    update() {
        if (!this.dollyStasisModel.hasStasisStarted) return;
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