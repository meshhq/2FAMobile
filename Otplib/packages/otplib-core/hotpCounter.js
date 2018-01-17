import {intToHex, leftPad} from '../otplib-utils/index';

/**
 * Ensure HOTP counter is in correct format
 *
 * @module otplibhotpCounter
 * @param {number} counter - the OTP counter (usually it's an incremental count)
 * @return {string}
 */
function hotpCounter(counter) {
  const hexCounter = intToHex(counter);
  return leftPad(hexCounter, 16);
}

export default hotpCounter;
