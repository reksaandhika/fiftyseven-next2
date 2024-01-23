import React from 'react';
import { isMobileOnly, isTablet } from 'react-device-detect';
import { withRegisterRoute } from '../routing';
import { getRandomIntRange } from '../utils';
import './Home.scss';

const MotionTrailSettings = {
  dir: '/img/trail',
  numberOfItems: 30,
  total: 30
};

const set = getRandomIntRange(1, MotionTrailSettings.total, MotionTrailSettings.numberOfItems);

const srcSet = [...Array(MotionTrailSettings.numberOfItems)].map(
  (_, i) => `/img/trail/${set[i].toString().padStart(2, '0')}.jpg`
);

function Home() {
  const isMobile = useMedia(['(max-width: 640px)'], [true], false);

  return (
    <Page>
      {!isMobileOnly && !isTablet && <MotionTrail srcSet={srcSet} />}

      <div className="App Home">
        <Appear reverse>
          <div className="centerHolder">
            <MaskedReveal
              className="est"
              delay={[0, 0.5]}
            >
              EST.&nbsp;&nbsp;—&nbsp;&nbsp;2016
            </MaskedReveal>


            <MaskedReveal
              className="buttonHolder"
              delay={[1.15, 0]}
            >
              <TextButton
                asLink
                icon={(
                  <Icon type="link" />
                )}
                href="/work"
              >
                our work
              </TextButton>
            </MaskedReveal>
          </div>
        </Appear>
      </div>
    </Page>
  );
}

export default withRegisterRoute(Home, {
  route: '/',
  name: 'Index',
  title: "FIFTYSEVEN — Branding and design agency",
  weight: 0,
  options: {
    exact: true,
    navBackOptions: { mobile: true }
  }
});
