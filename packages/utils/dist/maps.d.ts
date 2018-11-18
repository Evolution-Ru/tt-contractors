export declare class PropertyMap<P extends any> {
    private _map;
    keyProperty: string;
    constructor(keyProperty?: string, source?: P[]);
    remap: (source?: P[]) => void;
    addToMap: (source?: P[]) => void;
    get: (key: any) => P;
    set: (key: any, value: P) => Map<string, P>;
    has: (key: string) => boolean;
    clear: () => void;
    delete: (key: string) => boolean;
}
export declare class PropertyMultiMap<P extends any> {
    private _map;
    keyProperty: string;
    secondProperty: string;
    constructor(keyProperty?: string, source?: P[]);
    remap: (source?: P[]) => void;
    addToMap: (source?: P[]) => void;
    getCreate: (keyProperty: any) => P[];
    get: (key: any) => P[];
    set: (key: any, value: P[]) => any;
    has: (key: any) => boolean;
    clear: () => void;
    delete: (key: any) => boolean;
}
