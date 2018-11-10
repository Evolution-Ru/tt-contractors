export default <F extends Function>(f: F, interrup: boolean = true): F => (
    (...args) => {
        if (interrup)
            debugger
        return f(...args)
    }
) as any as F