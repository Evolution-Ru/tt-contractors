"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (f, interrup = true) => ((...args) => {
    if (interrup)
        debugger;
    return f(...args);
});
//# sourceMappingURL=debug.js.map