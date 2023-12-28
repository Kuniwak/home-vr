export interface History {
    replaceState(state: any, title: string, url?: string | null): void;
}