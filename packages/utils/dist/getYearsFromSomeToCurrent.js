"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYearsFromSomeToCurrent = (from = 1950) => {
    const currentYear = (new Date()).getFullYear();
    const years = [];
    for (let i = currentYear; i >= from; i--)
        years.push(i);
    return years;
};
//# sourceMappingURL=getYearsFromSomeToCurrent.js.map