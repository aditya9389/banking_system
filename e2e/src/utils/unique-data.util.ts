/**
 * Utility functions for generating unique, disposable test data.
 * Used only in UI regression tests.
 */
export class UniqueDataUtil {

  /**
   * Generate a unique username
   * @param prefix optional prefix (default: 'user')
   */
  static username(prefix = 'user'): string {
    return `${prefix}_${Date.now()}`;
  }

  /**
   * Generate a unique phone number
   * Always starts with 7 to avoid invalid formats
   */
  static phoneNumber(): string {
    return `7${Math.floor(100000000 + Math.random() * 900000000)}`;
  }

  /**
   * Generate a standard test password
   * Centralized to avoid magic strings
   */
  static password(): string {
    return 'password123';
  }
}
