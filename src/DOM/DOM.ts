import {Window} from "../DOMTestable/Window";

export function getDOM() {
    const canvas = document.querySelector('canvas.main') as HTMLCanvasElement | null;
    if (!canvas) {
        throw new Error("canvas.main not found");
    }

    const moveForwardBtn = document.querySelector('button.move-forward') as HTMLButtonElement | null;
    if (!moveForwardBtn) {
        throw new Error("button.move-forward not found");
    }

    const moveTo1FBtn = document.querySelector('button.move-to-1F') as HTMLButtonElement | null;
    if (!moveTo1FBtn) {
        throw new Error("button.move-to-1f not found");
    }

    const moveTo2FBtn = document.querySelector('button.move-to-2F') as HTMLButtonElement | null;
    if (!moveTo2FBtn) {
        throw new Error("button.move-to-2f not found");
    }

    const openBtn = document.querySelector('button.open') as HTMLButtonElement | null;
    if (!openBtn) {
        throw new Error("button.open not found");
    }

    const closeBtn = document.querySelector('button.close') as HTMLButtonElement | null;
    if (!closeBtn) {
        throw new Error("button.close not found");
    }

    const startBtn = document.querySelector('button.start') as HTMLButtonElement | null;
    if (!startBtn) {
        throw new Error("button.start not found");
    }

    const controller = document.querySelector('.controller') as HTMLDivElement | null;
    if (!controller) {
        throw new Error(".controller not found");
    }

    const help = document.querySelector('.help') as HTMLElement | null;
    if (!help) {
        throw new Error(".help not found");
    }

    return {
        body: document.body,
        canvas,
        help,
        moveForwardBtn,
        moveTo1FBtn,
        moveTo2FBtn,
        openBtn,
        closeBtn,
        startBtn,
        controller,
        window: window as Window,
    };
}

export type DOM = ReturnType<typeof getDOM>;