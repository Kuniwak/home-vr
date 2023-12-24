export interface IAnimationLoop {
    setAnimationLoop(callback: XRFrameRequestCallback | null): void;
}