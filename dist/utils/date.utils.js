"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeDate = normalizeDate;
exports.formatDate = formatDate;
function normalizeDate(dateStr) {
    const d = new Date(dateStr);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function formatDate(dateObj) {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
