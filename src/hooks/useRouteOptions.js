import { useMemo } from 'react';
import { useLocation } from 'react-recipes';
import { getRouteObject } from '../routing';

/**
 * Custom hook that returns the options for the current route.
 * @returns {import('../routing').RouteDataOptions} The options for the current route.
 */
export const useRouteOptions = () => {
  const location = useLocation();

  return useMemo(() => {
    return getRouteObject(location.pathname)?.options ?? {};
  }, [location.pathname]);
}
