"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (pred) => (array) => Object
    .keys(array)
    .reduce((r, key) => {
    const test = pred(array[key]);
    return test
        ? Object.assign({}, r, { [key]: array[key] }) : r;
}, {});
//# sourceMappingURL=filterObj.js.map