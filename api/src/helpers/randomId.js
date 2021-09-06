/**
 *
 * @param {number} length
 */
const randomId = length => Math.random().toString(36).substr(2, length);

module.exports = randomId;
