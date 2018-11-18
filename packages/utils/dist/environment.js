"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:variable-name
let __production = true;
exports.setProduction = value => __production = value;
exports.isProduction = () => __production;
const isNodeEnvironment = typeof process === 'object' &&
    process + '' === '[object process]';
const isBackend = () => isNodeEnvironment;
exports.isBackend = isBackend;
const isFrontend = () => !isNodeEnvironment;
exports.isFrontend = isFrontend;
//# sourceMappingURL=environment.js.map