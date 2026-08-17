import { featuresRoutes } from './features.routes';

describe('featuresRoutes', () => {
  it('should redirect the root route to login', () => {
    expect(featuresRoutes).toContainEqual({
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
    });
  });
});
