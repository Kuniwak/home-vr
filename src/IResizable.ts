export interface IResizable {
    setPixelRatio(pixelRatio: number): void;
    setSize(width: number, height: number): void;
}

export class ComposedResizable implements IResizable {
    constructor(private readonly resizables: ReadonlyArray<IResizable>) {
    }

    setPixelRatio(pixelRatio: number): void {
        for (const resizable of this.resizables) {
            resizable.setPixelRatio(pixelRatio);
        }
    }

    setSize(width: number, height: number): void {
        for (const resizable of this.resizables) {
            resizable.setSize(width, height);
        }
    }
}


