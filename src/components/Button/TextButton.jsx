import { useMount } from 'ahooks';
import classNames from 'classnames';
/** @type {import('framer-motion').Variants} */
const HoverVariants = {
  hover: ([[y], [[ease]], [delay] = [0]]) => ({
    y,
    transition: {
      ease,
      duration: 0.48,
      delay
    }
  }),
  normal: ([[, y], [, [ease]], [, delay] = [0, 0]]) => ({
    y,
    transition: {
      ease,
      duration: 0.48,
      delay
    }
  })
};

/** @type {import('framer-motion').Variants} */
const DecoratorVariants = {
  enter: {
    x: '0%'
  },
  exit: {
    x: '-110%'
  }
};

/**
 * @typedef {object} TextButtonProps
 * @property {boolean} [asLink=false]
 * @property {import('react').ReactNode} [children=null]
 * @property {string} [className=null]
 * @property {string|number} [hotspot=-10]
 * @property {string} [href=null]
 * @property {import('react').ReactNode} [icon=null]
 * @property {boolean} [internal=false]
 * @property {'none'|'all'} [pointerEvents='all']
 * @property {React.CSSProperties} [style]
 * @property {import('react').AnchorHTMLAttributes['target']} [target=null]
 * @property {(e: HTMLElement) => void} [onClick=null]
 */

/**
 * @type {ReturnType<typeof import('react').forwardRef<HTMLElement, TextButtonProps>>}
 */
const TextButton = forwardRef((
  {
    asLink,
    children,
    className,
    hotspot,
    href,
    icon,
    internal,
    pointerEvents,
    style,
    target,
    onClick
  },
  ref
) => {
  const [hoverState, setHoverState] = useState('normal');
  const { pathname } = useLocation();
    if (asLink) {
      const isInternal = internal || href.startsWith('/');
      const link = isInternal ? { to: href } : { href };
      const state = isInternal ? { from: pathname } : {};

      return {
        ...link,
        el: isInternal ? Link : 'a',
        target,
        rel: 'noopener noreferrer',
        state

  useMount(() => {
    // Dummy check to see if the element has a reveal animation.
    const fn = ref?.current?.onrevealcomplete || ref?.current?.onrevealupdate;

    setIsListeningForReveal(fn instanceof Function);
  });

  return (
    <MotionFlex
      ref={ref}
      {...rootAttributes}
      alignItems="center"
      className={classNames(classes.root, className)}
      justifyContent="center"
      style={style}
      onClick={handleClick}
    >
      <div
        style={{
          inset: hotspot,
          pointerEvents,
          position: 'absolute'
        }}
        onMouseEnter={handleHoverStart('hover')}
        onMouseLeave={handleHoverStart('normal')}
      />

      <div className={classes.text} data-textbutton-text>
        <div className={classes.textInner}>
          <motion.div
            animate={hoverState}
            className={classes.textUpper}
            custom={[['0', '-100%'], [[Easings.easeOutCubic], [Easings.easeInCubic]], [0.48, 0]]}
            initial={false}
            variants={HoverVariants}
          </motion.div>
        </div>

        <div className={classes.decorator}>
          <motion.div
            animate={!isListeningForReveal ? DecoratorVariants.enter : decoratorAnimation}
            className={classes.decoratorInner}
            initial={isInteractive ? DecoratorVariants.exit : DecoratorVariants.enter}
            transition={{
              ease: Easings.easeOutCubic,
              duration: 1.2
            }}
            variants={{
              exit: {
                x: '-110%'
              }
            }}
          />
        </div>
      </div>

      {icon && (
        <MotionFlex
          alignItems="center"
          className={classes.icon}
          justifyContent="center"
          style={{
            scale: isListeningForReveal ? iconScaleValue : 1,
            transformOrigin: 'center'
          }}
        >
          {icon}
    PropTypes.string
  ]),
  href: (props, propName, componentName) => {
    if (typeof props[propName] !== 'string' && props.asLink) {
      throw new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Expected \`string\`.`);
    }
  },
  icon: PropTypes.node,
  internal: PropTypes.bool,
  pointerEvents: PropTypes.oneOf(['all', 'none']),
