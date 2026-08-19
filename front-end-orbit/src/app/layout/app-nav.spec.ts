import { APP_NAV_ITEMS } from './app-nav';

describe('APP_NAV_ITEMS', () => {
  it('should expose nav items as a signal', () => {
    const items = APP_NAV_ITEMS();
    expect(items.length).toBeGreaterThan(0);
    expect(items[0].url).toBe('/home');
    expect(items[0].title).toBe('Início');
  });
});
