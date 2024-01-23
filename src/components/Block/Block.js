import classnames from 'classnames';
import { motion } from 'framer-motion';
import { isString } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Durations, Easings } from '../../animation';
import './Block.scss';

function Block({
  className,
  delay,
  stagger,
  text,
  title
}) {
  const withTitle = isString(title);

  return (
    <div
      className={classnames([
        'Block',
        className
      ])}
    >
      {withTitle && (
        <div className="Block__title">
          <motion.div
            className="BlockTitle"
            variants={{
              enter: {
                y: '0%',
                transition: {
                  ease: Easings.easeOutCubic
                }
              },
              exit: {
                y: '100%',
                transition: {
                  delay: delayExit + text.length * stagger,
                  ease: Easings.easeInCubic
                }
              }
            }}
          >
            {title}
          </motion.div>
        </div>
      )}
    </div>
  );
}

Block.propTypes = {
  className: PropTypes.string,
  delay: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ]),
  stagger: PropTypes.number,
  text: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string
};

Block.defaultProps = {
  delay: 0,
  stagger: Durations.gap
};

export default Block;
