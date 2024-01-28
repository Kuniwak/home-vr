import {
    BODY_HEIGHT,
    DOOR_CLOSED_MODEL_URL,
    DOOR_OPENED_MODEL_URL,
    SKY_COLOR, HOME_MODEL_URL
} from "./Const";
import {
    AmbientLight,
    BackSide,
    Color,
    DirectionalLight,
    Mesh,
    Object3D,
    PerspectiveCamera,
    Scene,
    ShaderMaterial,
    SphereGeometry,
    WebGLRenderer
} from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {Env} from "./EnvDetection";
import {skyFragment, skyVertex} from "./Shaders";
import {ComposedResizable,} from "./IResizable";
import {ResizablePerspectiveCamera} from "./Object3DCollection/ResizablePerspectiveCamera";
import {VRButtonFactory} from "./IVRButtonFactory";
import {buildRenderable} from "./Renderable/buildRenderable";
import {Object3DCollection} from "./Object3DCollection/Object3DCollection";

export async function load(env: Env, canvas: HTMLCanvasElement) {
    const loader = new GLTFLoader();
    const [homeGLTF, doorClosedGLTF, doorOpenedGLTF] = await Promise.all([
        loader.loadAsync(HOME_MODEL_URL),
        loader.loadAsync(DOOR_CLOSED_MODEL_URL),
        loader.loadAsync(DOOR_OPENED_MODEL_URL),
    ]);

    const home = homeGLTF.scene;
    const doorClosed = doorClosedGLTF.scene;
    const doorOpened = doorOpenedGLTF.scene;
    const scene = new Scene();
    scene.add(home);
    scene.add(doorClosed);
    scene.add(doorOpened);
    home.visible = true;
    doorClosed.visible = false;
    doorOpened.visible = true;

    const sky = new Mesh(
        new SphereGeometry(400, 32, 15),
        new ShaderMaterial({
            uniforms: {
                'topColor': {value: new Color(SKY_COLOR)},
                'bottomColor': {value: new Color(0xffffff)},
                'offset': {value: 33},
                'exponent': {value: 0.6}
            },
            vertexShader: skyVertex,
            fragmentShader: skyFragment,
            side: BackSide,
        }),
    );
    scene.add(sky);

    const renderer = new WebGLRenderer({
        powerPreference: "high-performance",
        antialias: false,
        stencil: false,
        depth: true,
        canvas: canvas,
    });

    const dollyBody = new Object3D();
    scene.add(dollyBody);
    const dollyHead = new Object3D();
    dollyBody.add(dollyHead);

    const camera = new PerspectiveCamera(50, 800 / 600);
    camera.rotation.set(0, 0, 0, 'YXZ');
    camera.position.set(0, BODY_HEIGHT, 0);
    dollyHead.add(camera)


    const renderable = buildRenderable(env, renderer, camera, scene);

    scene.add(new AmbientLight(0xffffff, 2));

    const l2 = new DirectionalLight(0xffffff, 0.5);
    l2.position.set(-0.7, 0.2, 0.2);
    scene.add(l2);

    const object3DCollection: Object3DCollection = {
        homeDoorOpened: doorOpened,
        homeDoorClosed: doorClosed,
        dollyBody,
        dollyHead,
        camera,
    };

    return {
        object3DCollection,
        renderable,
        resizable: new ComposedResizable([
            renderable,
            new ResizablePerspectiveCamera(camera),
        ]),
        xrsFactory: renderer.xr,
        animationLoop: renderer,
        vrButtonFactory: new VRButtonFactory(renderer),
    };
}
