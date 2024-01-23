import React from 'react';
import classes from './Badge.module.scss';
import classNames from 'classnames';

/**
 * @typedef {object} BadgeProps
 * @property {boolean} [rounded=true]
 */

/** @type {import('react').ForwardRefRenderFunction<any, import('react').PropsWithChildren<import('react').HTMLAttributes<'div'> & BadgeProps>} */
export const Badge = React.forwardRef((props, ref) => {
  const {
    children,
    className,
    rounded = true,
    ...rest
  } = props;

  return (
    <div
      {...rest}
      ref={ref}
      className={
        classNames(
          classes.root,
          {
            [classes.rounded]: rounded
          },
          className
        )
      }
    >
      <div className={classes.content}>
        <div className={classes.text}>
          {children}
        </div>
      </div>
    </div>
  );
});

Badge.displayName = 'Badge';
