import { useDebounceFn } from 'ahooks';
import { motion, useIsPresent } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useCardSharedTransitions } from './contexts/cardSharedTrasitionContext';

// const Ripple = createRipples({
//   color: 'rgba(180, 174, 183, 0.4)',
//   during: 1000,
// });

function Card({
  href,
  image,
  index,
  isMobile,
  tags,
  title,
  type,
  video,
  year
}) {
  /** @type {import('react').MutableRefObject<HTMLDivElement>} */
  const elRef = useRef(null);
  const location = useLocation();
  const { rootVariants, contentVariants } = useCardSharedTransitions();
  const isPresent = useIsPresent();
  const [isPlayingReel, setIsPlayingReel] = useState(false);

  const routerState = useMemo(() => ({
    from: location.pathname
  }), [location]);

  const target = useMemo(() => (
    href.startsWith('/') ? '_self' : '_blank'
  ), [href]);

  const { run, cancel } = useDebounceFn(
    useCallback(() => setIsPlayingReel(true), []),
    { wait: 0 }
    <div
          <Link to={href} target={target} state={routerState} style={{ height: "100%", display: "contents" }}>
            <div className="Card__header Card--border">
              <div className="CardIndex">
                <motion.div
                  custom={[
                    { delay: 1.2, index }
                  ]}
                  variants={contentVariants}
                    <motion.div
                      custom={[
                        { delay: 1.2 + collection.length * 0.1, index }
                      ]}
                      variants={contentVariants}
                    >
                      #{tag}
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
            <div className="Card__body Card--border">
              <h2 className="CardTitle">
                <motion.div
                  custom={[
                    { delay: 0.52, duration: 1.20, index }
                  ]}
                  variants={contentVariants}
                <MotionImage
                  alt=""
                  custom={
                    [{ delay: 0.24, duration: 1.2, index, scale: 1 }, { index, delay: 0.2, duration: 1.2, scale: 1.1 }]
                  }
                  className="CardImage"
                  src={image.src}
                  preSrc={image.preSrc}
                  variants={{
                    enter: contentVariants.enter,
                    exit: isPresent ? contentVariants.exit : null
                  }}
                  style={{ transformOrigin: 'bottom center' }}
                />
              </div>

              {!isMobile && video && (
            )}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

Card.propTypes = {
  href: PropTypes.string,
    }
  }
};

Card.defaultProps = {
  tags: []
};

export default Card;
