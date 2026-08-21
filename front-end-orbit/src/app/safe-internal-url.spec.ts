import { safeInternalUrl } from '../../core/auth/safe-internal-url';

describe('safeInternalUrl', () => {
  it('keeps an internal app path', () => {
    expect(safeInternalUrl('/user/edit')).toBe('/user/edit');
  });

  it('rejects open redirects and guest routes', () => {
    expect(safeInternalUrl('https://evil.com')).toBe('/home');
    expect(safeInternalUrl('//evil.com')).toBe('/home');
    expect(safeInternalUrl('/login')).toBe('/home');
  });
});
