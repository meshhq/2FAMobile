import hotp from '../otplib-hotp/index';
import totp from '../otplib-totp/index';
import authenticator from '../otplib-authenticator/index';
import crypto from '../../../crypto/crypto';

/**
 * otplib
 *
 * One-Time Password Library
 *
 * ```js
 * {
 *    Authenticator // class
 *    HOTP // class
 *    TOTP // class
 *
 *    authenticator // instance
 *    hotp // instance
 *    totp // instance
 * }
 * ```
 *
 * @module otplib
 * @since 3.0.0
 */
authenticator.options = {crypto}
hotp.options = {crypto}
totp.options = {crypto}

export default {
  Authenticator: authenticator.Authenticator,
  HOTP: hotp.HOTP,
  TOTP: totp.TOTP,
  authenticator,
  hotp,
  totp,
};
