import {IInput} from "./InputMapping/IInput";
import {DollyModel, DollyState} from "./MVC/Dolly/Model/DollyModel";
import {Euler} from "three";
import {ENTRANCE_POSITION, FORWARD_VELOCITY, VERTICAL_VELOCITY} from "./Const";
import {DollyController} from "./MVC/Dolly/Controller/DollyController";
import {DOOR_OPENED_CLOSET_CLOSED, HomeModel} from "./MVC/Home/Model/HomeModel";
import {HomeController} from "./MVC/Home/Controller/HomeController";
import {DOM} from "./DOM/DOM";
import {IAnimationLoop} from "./IAnimationLoop";
import {HomeView} from "./MVC/Home/View/HomeView";
import {Object3DCollection} from "./Object3DCollection/Object3DCollection";
import {DollyView} from "./MVC/Dolly/View/DollyView";
import {IRenderable} from "./IRenderable";
import {IResizable} from "./IResizable";
import {Env} from "./EnvDetection";
import {IStopwatch} from "./InputMapping/IStopwatch";
import {IVRButtonFactory} from "./IVRButtonFactory";

export class EventLoop {
    private readonly dollyModel: DollyModel;
    private readonly dollyController: DollyController;
    private readonly dollyView: DollyView;
    private readonly homeModel: HomeModel;
    private readonly homeController: HomeController;
    private readonly homeView: HomeView;
    private readonly handleResize: () => void;

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
    ) {
        this.dollyModel = new DollyModel(
            new DollyState(
                new Euler(0, 0, 0, "YXZ"),
                ENTRANCE_POSITION,
            ),
            FORWARD_VELOCITY,
            VERTICAL_VELOCITY,
        );
        this.dollyController = new DollyController(input, stopwatch, this.dollyModel);
        this.dollyView = new DollyView(env, dom, this.dollyModel, obj3Ds.dollyBody, obj3Ds.dollyHead, obj3Ds.camera, vrButtonFactory);

        this.homeModel = new HomeModel(DOOR_OPENED_CLOSET_CLOSED);
        this.homeController = new HomeController(input, this.homeModel);
        this.homeView = new HomeView(this.homeModel, obj3Ds.homeDoorOpened, obj3Ds.homeDoorClosed);

        this.handleResize = () => {
            resizable.setSize(dom.window.innerWidth, dom.window.innerHeight);
            resizable.setPixelRatio(dom.window.devicePixelRatio);
        };
    }

    start() {
        this.stopwatch.start();
        this.input.start();

        this.dom.window.addEventListener('resize', this.handleResize);
        this.handleResize();
        this.stopwatch.start();
        this.dollyView.start();

        this.animation.setAnimationLoop(() => {
            this.stopwatch.lap();
            this.input.update();

            this.dollyController.update();
            this.homeController.update();

            this.dollyView.update();
            this.homeView.update();

            this.renderer.render();
            this.stopwatch.lap();
        });
    }
}