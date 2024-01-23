import { differenceWith, eq, memoize, merge, sortBy, startsWith } from 'lodash';

const registeredRoutes = new Map();

/**
 * Options proxy handler.
 */
const routeOptionsHandler = {
  get: function (target, prop) {
    if (prop === 'name') {

      if (target[prop] instanceof Function) {
        return target[prop]();
      }

      return target[prop] ?? '';
    }
    return Reflect.get(...arguments);
  }
};

/**
 * @typedef {'wait' | 'sync'} RouteTransitionType
 */

/**
 * @callback RouteTransitionCallbackFn
 * @param {ReturnType<typeof getRouteObject>} from
 * @param {ReturnType<typeof getRouteObject>} to
 * @returns {RouteTransitionType}
 */

/**
 * @typedef {RouteTransitionType | RouteTransitionCallbackFn} RouteTransition
 */

/**
 * @typedef {object} LayoutGuardProperties
 * @property {boolean} portrait
 * @property {boolean} landscape
 */

/**
 * @typedef {object} LayoutGuard
 * @property {LayoutGuardProperties} mobile
 * @property {LayoutGuardProperties} tablet
 */

/**
 * @typedef {object} RouteDataOptions
 * @property {object} navBackOptions
 * @property {boolean} navBackOptions.mobile
 * @property {boolean} navBackOptions.desktop
 * @property {boolean} withVideoBackground
 * @property {RouteTransition} transition
 * @property {boolean} resizableHeader
 * @property {LayoutGuard} layoutGuard
 */

/**
 * @type {object} RouteData
 * @type {any} component
 * @type {RouteDataOptions} options
 * @type {string} name
 * @type {string} route
 */

/**
 * @param {string} route Route to get object for
 * @returns {{ route: string, name: string, options: RouteDataOptions, component: any }|undefined}
 */
export function getRouteObject(route) {
  return registeredRoutes.get(route);
}

/**
 * @returns {[RouteData]}
 */
export function getRegisteredRoutes() {
  const values = memoize(() => sortBy(Array.from(registeredRoutes.values()), ['weight', 'name']));
  return values();
}

function withoutComparator(fn, { route }, exclude) {
  return fn(exclude, route);
}

/**
 * @param {string|string[]} exclude Routes to exclude
 * @param {boolean} strict Strict
 * @returns {[RouteData]}
 */
export function getRoutesWithout(exclude, strict = true) {
  const _exclude = (exclude instanceof Array) ? exclude : [exclude];
  const comparator = strict ? eq : startsWith;

  return differenceWith(getRegisteredRoutes(), _exclude, withoutComparator.bind(undefined, comparator));
}

/**
 * @typedef {object} RouteData
 * @property {string} route Route
 * @property {string} name Name shown in navigation
 * @property {number} weight Weight
 * @property {RouteDataOptions} options Options
*/

/**
 * Register`s the component as a page.
 * @param {*} Component Page Component
 * @param {RouteData} routeData
 * @returns {*} Component
 */
export function withRegisterRoute(Component, routeData) {
  if (process.env.NODE_ENV !== 'development' && registeredRoutes.has(routeData.route)) {
    throw new Error('Route already registered.');
  }

  if (!registeredRoutes.has(routeData.route)) {
    const options = merge(
      {
        weight: 10000,
        options: {
          resizableHeader: false,
          layoutGuard: {
            mobile: {
              portrait: false,
              landscape: true
            },
            tablet: {
              portrait: true,
              landscape: false
            }
          }
        }
      },
      routeData,
      {
        component: Component
      }
    );

    registeredRoutes.set(routeData.route, new Proxy(options, routeOptionsHandler));
  }

  return Component;
}
