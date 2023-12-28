export function throttle(f: () => void, i: number) {
    let j = 0;
    return () => {
        if (j++ % i === 0) {
            f();
        }
        if (j === i) {
            j = 0;
        }
    };
}