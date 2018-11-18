"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PropertyMap {
    constructor(keyProperty = 'id', source = []) {
        this._map = new Map();
        this.remap = (source = []) => {
            for (let i = 0; i < source.length; i++)
                this.set(String(source[i][this.keyProperty]), source[i]);
        };
        this.addToMap = (source = []) => {
            for (let i = 0; i < source.length; i++)
                this.set(String(source[i][this.keyProperty]), source[i]);
        };
        this.get = (key) => this._map.get(String(key));
        this.set = (key, value) => this._map.set(String(key), value);
        this.has = (key) => this._map.has(key);
        this.clear = () => this._map.clear();
        this.delete = (key) => this._map.delete(key);
        this.keyProperty = keyProperty;
        this.remap(source);
    }
}
exports.PropertyMap = PropertyMap;
class PropertyMultiMap {
    constructor(keyProperty = 'type_id', source = []) {
        this._map = new Map();
        this.secondProperty = 'id';
        this.remap = (source = []) => {
            for (let i = 0; i < source.length; i++)
                this.getCreate(source[i][this.keyProperty]).push(source[i]);
        };
        this.addToMap = (source = []) => {
            let quant = source.length;
            for (let i = 0; i < quant; i++) {
                var key = String(source[i][this.keyProperty]);
                var subKey = String(source[i][this.secondProperty]);
                var array = this.getCreate(key);
                var index = array.findIndex(o => o[this.secondProperty] == subKey);
                index != -1 ?
                    array.splice(index, 1, source[i])
                    :
                        array.push(source[i]);
            }
        };
        this.getCreate = (keyProperty) => {
            if (!this.has(keyProperty))
                this.set(keyProperty, []);
            return this.get(keyProperty);
        };
        this.get = (key) => this._map.get(String(key));
        this.set = (key, value) => this._map.set(String(key), value);
        this.has = (key) => this._map.has(String(key));
        this.clear = () => this._map.clear();
        this.delete = (key) => this._map.delete(String(key));
        this.keyProperty = keyProperty;
        this.remap(source);
    }
}
exports.PropertyMultiMap = PropertyMultiMap;
//# sourceMappingURL=maps.js.map