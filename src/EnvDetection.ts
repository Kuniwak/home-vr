export type Env = "XR" | "MOUSE" | "TOUCH"

export async function detectEnv(): Promise<Env> {
    if (await isXR()) {
        return "XR";
    }

    return isTouch() ? "TOUCH" : "MOUSE";
}

function isTouch(): boolean {
    return "ontouchstart" in window;
}

async function isXR(): Promise<boolean> {
    const xr = (navigator as any).xr;
    if (!xr) {
        return false;
    }

    return await xr.isSessionSupported('immersive-vr');
}