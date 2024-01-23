import React, { useCallback, useMemo } from 'react';
import Popover from '../Popover';

const defaultPopoverProps = {
  placement: 'auto',
  overlayProps: {
    invisible: true
  }
};

function Dropdown({
  children,
  opener: Opener,
  openerProps,
  popoverProps
}) {
  const opener = useCallback(({ ref, isVisible, boundEvents }) => {
    const { className, ...rest } = openerProps;

    return (
      <Opener
        className={className}
        isDropdownVisible={isVisible}
      />
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Opener, openerProps]);

  return (
    <Popover
      opener={opener}
      {...mergedPopoverProps}
    >
      {children}
    </Popover>
  );
}

export default Dropdown;
