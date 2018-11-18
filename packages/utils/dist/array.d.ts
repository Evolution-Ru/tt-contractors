export declare function sortBy(f: any): any;
export declare type IndexedArray<T> = T[];
export declare type AssociativeArray<T> = {
    [key: string]: T;
};
export declare const toAssociativeArray: <T>(property?: string) => (array: T[]) => AssociativeArray<T>;
export declare const toIndexedArray: <T>(array: AssociativeArray<T>, withKey?: string) => T[];
export declare type ToIndexedArray<T> = <T>(array: AssociativeArray<T>, withKey?: string) => IndexedArray<T>;
export declare const orderBy: <T>(propertyName: string) => (a: T, b: T) => number;
export declare const arrify: <T>(val: T | T[]) => T[];
export declare const isArray: (arg: any) => arg is any[];
