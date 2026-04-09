/**
 * Formats a number as a currency string with comma as decimal separator.
 * @param {number} value - The numeric value to format.
 * @returns {string} - The formatted string.
 */
export const formatCurrency = (value) => {
    if (typeof value !== 'number') return '0,00';
    return value.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};

/**
 * Formats a number with comma as decimal separator.
 * @param {number} value - The numeric value to format.
 * @returns {string} - The formatted string.
 */
export const formatNumber = (value) => {
    if (typeof value !== 'number') return '0,00';
    return value.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};
