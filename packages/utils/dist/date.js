"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAY_MILIS = 24 * 60 * 60 * 1000;
exports.cloneDate = (date) => new Date(date.getTime());
exports.formatYYYYMMDD = (date, delimiter = '-') => date.getFullYear() +
    delimiter +
    exports.formatMM(date) +
    delimiter +
    exports.formatDD(date);
exports.formatMM = (date) => exports.formatTwoSignFromInt(date.getMonth() + 1);
exports.formatDD = (date) => exports.formatTwoSignFromInt(date.getDate());
exports.formatTwoSignFromInt = (value) => value >= 10 ? String(value) : '0' + value;
//# sourceMappingURL=date.js.map