import {IInput} from '../InputMapping/IInput';
import {FORWARD_VELOCITY, VERTICAL_VELOCITY} from '../Const';
import {DollyController} from './Dolly/Controller/DollyController';
import {HomeModel, HomeState, IReadonlyHomeState} from './Home/Model/HomeModel';
import {HomeController} from './Home/Controller/HomeController';
import {DOM} from '../DOM/DOM';
import {IAnimationLoop} from '../IAnimationLoop';
import {HomeView} from './Home/View/HomeView';
import {Object3DCollection} from '../Object3DCollection/Object3DCollection';
import {DollyView} from './Dolly/View/DollyView';
import {IRenderable} from '../IRenderable';
import {IResizable} from '../IResizable';
import {Env} from '../EnvDetection';
import {IStopwatch} from '../InputMapping/IStopwatch';
import {IVRButtonFactory} from '../IVRButtonFactory';
import {DollyModel, DollyState, IReadonlyDollyState} from './Dolly/Model/DollyModel';
import {Location} from '../DOMTestable/Location';
import {StateQueryParams} from "./StateQueryParams";
import {DollyStasisModel} from "./Dolly/Model/DollyStasisModel";
import {DollyStasisView} from "./Dolly/View/DollyStasisView";
import {History} from "../DOMTestable/History";
import {DollyStasisController} from "./Dolly/Controller/DollyStasisController";


interface IReadonlyProgramState {
    readonly dolly: IReadonlyDollyState;
    readonly home: IReadonlyHomeState;
    clone(): ProgramState;
    equals(other: IReadonlyProgramState): boolean;
    encodeTo(params: StateQueryParams): any;
}

export class ProgramState implements IReadonlyProgramState {
    constructor(
        public dolly: DollyState,
        public home: HomeState,
    ) {
    }

    clone(): ProgramState {
        return new ProgramState(this.dolly.clone(), this.home.clone());
    }

    equals(other: IReadonlyProgramState): boolean {
        return this.dolly.equals(other.dolly) && this.home.equals(other.home);
    }

    encodeTo(params: StateQueryParams): void {
        this.dolly.encodeTo(params);
        this.home.encodeTo(params);
    }

    static decodeFrom(params: URLSearchParams): ProgramState {
        return new ProgramState(
            DollyState.decodeFrom(params),
            HomeState.decodeFrom(params),
        );
    }

    static readonly DEFAULT: IReadonlyProgramState = new ProgramState(
        DollyState.DEFAULT.clone(),
        HomeState.DEFAULT.clone(),
    );
}


export class Program {
    private readonly dollyModel: DollyModel;
    private readonly dollyController: DollyController;
    private readonly dollyView: DollyView;
    private readonly homeModel: HomeModel;
    private readonly homeController: HomeController;
    private readonly homeView: HomeView;
    private readonly handleResize: () => void;
    private readonly dollyStasisModel: DollyStasisModel;
    private readonly dollyStasisView: DollyStasisView;
    private readonly dollyStasisController: DollyStasisController;

    constructor(
        private readonly env: Env,
        private readonly input: IInput,
        private readonly dom: DOM,
        private readonly obj3Ds: Object3DCollection,
        private readonly renderer: IRenderable,
        private readonly resizable: IResizable,
        private readonly animation: IAnimationLoop,
        private readonly stopwatch: IStopwatch,
        private readonly vrButtonFactory: IVRButtonFactory,
        private readonly history: History,
        private readonly location: Location,
    ) {
        const initialState = Program.initialState(location);
        this.dollyModel = new DollyModel(initialState.dolly, FORWARD_VELOCITY, VERTICAL_VELOCITY);
        this.dollyController = new DollyController(input, stopwatch, this.dollyModel);
        this.dollyView = new DollyView(env, dom, this.dollyModel, obj3Ds.dolly, obj3Ds.camera, vrButtonFactory);

        this.homeModel = new HomeModel(initialState.home);
        this.homeController = new HomeController(input, this.homeModel);
        this.homeView = new HomeView(this.homeModel, obj3Ds.homeDoorOpened, obj3Ds.homeDoorClosed);

        this.dollyStasisModel = new DollyStasisModel(this.dollyModel);
        this.dollyStasisController = new DollyStasisController(this.dollyStasisModel);
        this.dollyStasisView = new DollyStasisView(this.dollyModel, this.homeModel, this.dollyStasisModel, history);

        this.handleResize = () => {
            resizable.setSize(dom.window.innerWidth, dom.window.innerHeight);
            resizable.setPixelRatio(dom.window.devicePixelRatio);
        };
    }

    start() {
        this.dom.window.addEventListener('resize', this.handleResize);
        this.handleResize();

        this.dollyView.start();
    }

    update() {
        this.dollyController.update();
        this.homeController.update();
        this.dollyStasisController.update();

        this.dollyView.update();
        this.homeView.update();
        this.dollyStasisView.update()
    }

    private static initialState(location: Location): ProgramState {
        try {
            const url = new URL(location.href);
            return ProgramState.decodeFrom(<URLSearchParams>url.searchParams);
        } catch (e) {
            console.error(e);
            return ProgramState.DEFAULT.clone();
        }
    }
}