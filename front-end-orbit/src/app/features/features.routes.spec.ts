import { featuresRoutes } from './features.routes';

describe('featuresRoutes', () => {
  it('should wrap authenticated routes in the app shell', () => {
    const shell = featuresRoutes.find((route) => route.path === '' && route.children);

    expect(shell).toBeTruthy();
    expect(shell?.children).toContainEqual({
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    });
  });
});
