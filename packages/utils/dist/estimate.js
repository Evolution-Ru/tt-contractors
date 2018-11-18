"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimate = (test, label = 'someFunction') => {
    console.time('estimate ' + label);
    const result = test();
    console.timeEnd('estimate ' + label);
    return result;
};
//# sourceMappingURL=estimate.js.map