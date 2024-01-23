import { useEventListener } from 'ahooks';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import classes from './Select.module.scss';


/** @type {import('framer-motion').ForwardRefComponent<HTMLSelectElement, SelectProps>} */
export const Select = React.forwardRef((props, ref) => {
  const {
    className,
    label,
    options = [],
    ...rest
  } = props;

  /** @type {import('react').MutableRefObject<HTMLSelectElement>} */
  const elRef = useRef();
  const [value, setValue] = useState(() => options?.[0].label)

  return (
    <div className={classes.root}>
      <div
        className={classes.controlWrapper}
        data-value={value}
      >
        <select
          {...rest}
          className={classNames(classes.control, className)}
          ref={(node) => {
            if (ref?.current) {
              ref.current = node;
            }

            elRef.current = node;
          }}
        >
        </select>
      </div>
    </div>
  );
});

Select.displayName = 'Select';
