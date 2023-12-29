export type TouchEventName = 'touchstart' | 'touchend' | 'touchmove' | 'touchcancel';
export type MouseEventName = 'mousedown' | 'mouseup' | 'mousemove' | 'click' | 'mouseleave';
export type KeyboardEventName = 'keydown' | 'keyup';
export type VisibilityEventName = 'visibilitychange';

export type Window = {
    readonly innerWidth: number;
    readonly innerHeight: number;
    readonly devicePixelRatio: number;

    addEventListener(type: TouchEventName, listener: (ev: TouchEvent) => void): void;
    addEventListener(type: 'resize', listener: (ev: UIEvent) => void): void;
    addEventListener(type: MouseEventName, listener: (ev: MouseEvent) => void): void;
    addEventListener(type: KeyboardEventName, listener: (ev: KeyboardEvent) => void): void;
    addEventListener(type: VisibilityEventName, listener: (ev: KeyboardEvent) => void): void;
};