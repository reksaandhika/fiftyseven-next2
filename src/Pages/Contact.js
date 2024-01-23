import { useMount, useSize } from 'ahooks';
import { motion, useForceUpdate } from 'framer-motion';
import { merge } from 'lodash';
import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { useMedia } from 'react-recipes';
import { Durations } from '../animation';
import svgAddress from '../assets/img/address.svg';

/**
 * @typedef {Pick<import('framer-motion').TargetAndTransition, 'transition'>} TitleMotionVariant
 */

/**
 * @typedef {object} TitleMotionValues
 * @property {TitleMotionVariant} enter
 * @property {TitleMotionVariant} exit
 */

/**
 * @typedef {object} TitleProps
 * @property {'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'} [as='h1']
 * @property {React.ReactNode} children
 * @property {number | [number, number]} [delay=0]
 * @property {TitleMotionValues} [motionValues]
*/

/** @type {TitleMotionValues} */
const defaultTitleMotionValues = {
  enter: {
    transition: {
      staggerChildren: Durations.gap
    }
  },
  exit: {
    transition: {
      staggerChildren: Durations.gap
    }
  }
};

/** @type {import('react').FC<TitleProps & import('react').HTMLAttributes<HTMLHeadingElement>} */
const Title = (props) => {
  const {
    as = 'h1',
    children,
    delay = 0,
    motionValues = {},
    ...restProps
  } = props;

  return (
    React.createElement(
      motion[as],
      {
        ...restProps,
        animate: 'enter',
        exit: 'exit',
        initial: 'exit',
        variants
      },
      React.Children.map(children, (child, key) => (
        React.createElement(
          MaskedReveal,
          {
            key,
            auto: true,
            withoutDelay: true
          },
          child.props.children
        )
      ))
    )
  );
}

/** @type {import('react').FC<{ delay: number|[number, number]}} */
const HorizontalSeparator = (props) => {
  const delay = useNormalizeValue(props.delay ?? 0);

  return (
    <motion.div
      animate="enter"
      className={classes.horizontalSeparator}
      custom={delay}
      exit="exit"
      initial="exit"
      variants={HorizontalSeparatorMotionVariants}
    />
  )
}

function Contact() {
  const dummyElRef = useRef(null);
  const [forceRender] = useForceUpdate();

  const size = useSize(dummyElRef);

  useMount(() => {
    // Fix render issue when switching from about page.
    forceRender();
  });

  useLayoutEffect(() => {
    // Fixed not being updated on layout change.
    forceRender();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRenderInHeader])

  return (
    <Page className="Contact__page">
      <Container
        className={classes.container}
        frame
      >
        {/* {shouldRenderInHeader && (
          <Appear>
            <SiteHeaderMain.Source>
              <ContactInfo />
            </SiteHeaderMain.Source>
          </Appear>
        )} */}

        {shouldRenderInHeader && (
          <SiteHeaderMain.Source>
            <div ref={dummyElRef} style={{ width: '100%' }} />
          </SiteHeaderMain.Source>
        )}

        {shouldRenderInHeader && (
          <Appear>
            <ContactInfo
              inline
              style={{
                position: 'relative',
                marginLeft: 455,
                width: size?.width,
                top: `calc(var(--header-height, 0) / 2 - 0.6em)`,
              }}
            />
          </Appear>
        )}

        <Flex
          className={classes.content}
          direction="column"
          justifyContent="center"
        >
          <Flex direction="column">
            {!isMobile && (
              <Title className={classes.title} delay={0.2}>
                <div>Take your</div>
                <div>story further</div>
              </Title>
            )}

            {isMobile && (
              <Title as="h2" className={classes.title}>
                <div>Take your</div>
                <div>story</div>
                <div>further</div>
              </Title>
            )}

            <Flex
              className={classes.buttons}
              justifyContent="center"
            >
              <MaskedReveal delay={isMobile ? 1.4 : 1.4}>
                <EmailInquiryButton email="hello@fiftyseven.co" />
              </MaskedReveal>

              <MaskedReveal as={Flex} delay={isMobile ? 1.6 : 1.6}>
                <div className={classes.buttonsDivider} />
              </MaskedReveal>
            </Flex>
          </Flex>
        </Flex>

        <Flex
          alignItems="flex-end"
          className={classes.containerBottom}
          justifyContent="space-between"
        >
          <Flex className={classes.blocks}>
            <Appear>
              <Block
                className={classes.block}
                delay={isMobile ? 0 : [1.4, 0.07]}
                text={[
                  'We’re always looking for talent',
                  'with integrity. <a href="mailto:hello@fiftyseven.co" target="_blank" rel="noopener noreferrer">Send us your CV</a>'
                ]}
                title="BECOME A PART OUR STORY"
              />
            </Appear>

          {isMobile && (
            <HorizontalSeparator />
          )}

          <Flex className={classes.images}>

            <Appear>
              <ClipPathMask maskDirection="bottom" delay={isMobile ? 0.2 : 2.4}>
                <img
                  alt=""
                  className={classes.image}
                  draggable={false}
                  src={svgAddress}
                />
              </ClipPathMask>
            </Appear>
          </Flex>
        </Flex>
      </Container>
    </Page>
  )
}

export default withRegisterRoute(Contact, {
  route: '/contact',
  name: 'Contact',
  weight: 30,
  options: {
    navBackOptions: { mobile: true }
  }
});
