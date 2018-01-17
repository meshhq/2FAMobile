import hotp from '../otplib-hotp/index';
import totp from '../otplib-totp/index';
import authenticator from '../otplib-authenticator/index';
import crypto from './crypto';

/**
 * otplib-browser
 *
 * One-Time Password Library for browser
 *
 * @module otplib-browser
 * @since 3.0.0
 */
authenticator.options = {crypto}
hotp.options = {crypto}
totp.options = {crypto}

module.exports = {
  Authenticator: authenticator.Authenticator,
  HOTP: hotp.HOTP,
  TOTP: totp.TOTP,
  authenticator,
  hotp,
  totp,
};
