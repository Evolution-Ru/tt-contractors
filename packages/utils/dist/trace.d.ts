/**
 * Tap function to test incoming arguments and the result of a function call
 *
 * <example>
 *     const fnc = (a, b) => a + b
 *     const tracedSum = trace('sum call', 'log')
 *     tracedSum(fnc)(2, 3)
 *     // console outputs :  sum call, fnc,
 *     // ARGS: 2, 3
 *     // RESULT: 5
 *
 * </example>
 */
export declare type TraceLevel = 'log' | 'debug' | 'warn' | 'error' | 'info';
export declare const trace: (message?: string, traceLevel?: TraceLevel) => <T>(f: (...params: any[]) => T) => (...args: any[]) => T;
