import { AnimatePresence, motion } from "framer-motion";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDimensions, useMedia } from "react-recipes";
import { Link, useLocation } from "react-router-dom";
import { Easings } from "../animation";
import { getRouteObject, getRoutesWithout } from "../routing";
import Casenav from "./Case/Casenav";
import Container from "./Container";
import HamburgerMenu from "./HamburgerMenu";
import NavigateBackButton from "./NavigateBackButton";
import Panel from "./Panel";
import "./SiteHeader.scss";
import Time from "./Time";

import { uniqueId } from "lodash";
import { createTeleporter } from "react-teleporter";
import { gsap, ScrollTrigger } from "../gsap";
import { Flex } from "./Flex";
import HamburgerMenuHotspot from "./HamburgerMenuHotspot";
import { MaskedReveal } from "./Motion";
import SiteHeaderLinks from "./SiteHeaderLinks";
import { Icon } from "../components/icons";
import { TextButton } from "../components/Button";

import { useAtom } from "jotai";
import { lenisAtom } from "../atom/transitionAtom";
import { useAppContext } from "./AppContext";
import { isMobile } from "react-device-detect";

export const SiteHeaderMain = createTeleporter();

const caseItems = [
  {
    name: "Depoly SE",
    route: "/case/depoly-se",
    img: "/img/projects/depoly/desktop/depoly-hero-pet-plastic-seo-optimization-fiftyseven-design-studio.webp",
    hashtag: ["#HEALTHCARE", "#TECH"],
  },
  {
    name: "Roswell Biotech",
    route: "/case/roswell-biotech",
    img: "/img/projects/roswell/desktop/roswell-01-hero-image-molecular-electronics-molecular-diagnostics-seo-optimization-fiftyseven-design-studio.webp",
    hashtag: ["#HEALTHCARE", "#TECH"],
  },
  {
    name: "1910 Genetics",
    route: "/case/1910-genetics",
    img: "/img/projects/1910/desktop/1910-genetics-01-hero-image-protein-design-seo-optimization-fiftyseven-design-studio.webp",
    hashtag: ["#HEALTHCARE", "#TECH"],
  },
  {
    name: "Enzian Health",
    route: "/case/enzian-health",
    img: "/img/projects/enzian/desktop/enzian-health-swiss-01-hero-image-holistic-healthcare-seo-optimization-fiftyseven-design-studio.webp",
    hashtag: ["#HEALTHCARE", "#DIGITAL PLATFORM"],
  },
  {
    name: "Kollabo AG",
    route: "/case/kollabo-ag",
    img: "/img/projects/kollabo/desktop/kollabo-01-project-hero-image-construction-staffing-agency-branding-job-for-craftsmen-seo-optimization-fiftyseven-design-studio.webp",
    hashtag: ["#DIGITAL PLATFORM", "#SAAS"],
  },
];

export default function SiteHeader() {
  const elPanel = useRef();
  const elLinks = useRef();
  const elRightPanel = useRef();
  const elCasenav = useRef();
  const location = useLocation();
  const [isOpen, setOpen] = useState(false);
  const panelRef = useRef();
  const isMobileBreakpoint = useMedia(["(max-width: 640px)"], [true], false);
  const [hamburgerRef, dimensions] = useDimensions();
  const [containerRef, containerDimensions] = useDimensions();
  const { navButtonVisible } = useAppContext();

  const [lenis] = useAtom(lenisAtom);

  const routerState = useMemo(() => {
    if (location.pathname === "/") {
      return location.state;
    }

    return {
      from: location.pathname,
    };
  }, [location]);

  const routeObject = useMemo(
    () => getRouteObject(location.pathname),
    [location.pathname]
  );

  const isNavigateBackButtonVisible = useMemo(() => {
    if (routeObject) {
      const {
        route,
        options: { navBackOptions },
      } = routeObject;

      if (route.startsWith("/case") || !location?.state?.from) {
        return false;
      }

      const key = isMobileBreakpoint ? "mobile" : "desktop";

      return (navBackOptions[key] ?? false) && navButtonVisible;
    }

    return false;
  }, [
    isMobileBreakpoint,
    location?.state?.from,
    navButtonVisible,
    routeObject,
  ]);

  const navigateBackDelay = useMemo(() => {
    if (location?.state?.from?.startsWith("/case")) {
      return 2.2;
    } else {
      return 0;
    }
  }, [location?.state?.from]);

  const links = useMemo(() => {
    return getRoutesWithout(location.pathname);
  }, [location]);

  const active = useMemo(() => {
    return getRouteObject(location.pathname)?.name || "";
  }, [location.pathname]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const activeId = useMemo(() => uniqueId(), [active]);

  const handleOpen = useCallback(() => {
    setOpen((state) => !state);
  }, []);

  const capturePanelRef = useCallback(
    (node) => {
      panelRef.current = node;
      hamburgerRef(node);
    },
    [hamburgerRef]
  );

  const handleCloseMenu = useCallback((value, e) => {
    const relatedTarget = e.relatedTarget;

    if (
      relatedTarget instanceof HTMLElement &&
      !relatedTarget.hasAttribute("data-hotspot")
    ) {
      return value;
    }

    return !value;
  }, []);

  const handleMenuState = useCallback(
    (open, fn) => (e) => {
      setOpen(fn?.(open, e) ?? open);
    },
    []
  );

  const handleCurrentRouteClick = useCallback(() => {
    window.location.reload();
  }, []);

  // Reset header on route change
  useLayoutEffect(() => {
    if (!location?.state?.from) return;

    const footer = document.querySelector(".MainFooter");

    setTimeout(() => {
      footer.classList.remove("active");
      elPanel.current.classList.remove("active");
      elPanel.current.classList.remove("activecolor");
      elLinks.current.classList.remove("active");
      elRightPanel.current.classList.remove("active");
      elRightPanel.current.classList.remove("activeclock");
      elCasenav.current.classList.remove("active");
      document.documentElement.style.setProperty(
        "--color-headerlinks",
        "#c4c4c4"
      );
    }, 2000);

    setTimeout(() => {
      footer.classList.remove("hide");
    }, 2300);
  }, [location.pathname]);

  useLayoutEffect(() => {
    document.documentElement.style.setProperty(
      "--header-height",
      `${containerDimensions.height}px`
    );
  }, [containerDimensions.height]);

  useLayoutEffect(() => {
    if (!lenis) return;
    let ctx = null;
    if (routeObject?.options?.resizableHeader) {
      const casePage = location.pathname.includes("/case");

      ctx = gsap.context(() => {
        const footer = document.querySelector(".MainFooter");

        const startCondition = casePage
          ? isMobileBreakpoint
            ? "clamp(600vh top)"
            : "clamp(800vh top)"
          : "clamp(100vh top)";

        // Intro
        ScrollTrigger.create({
          trigger: lenis.rootElement,
          start: startCondition,
          onEnter: () => {
            const headerText = getComputedStyle(
              document.documentElement
            ).getPropertyValue("--color-headertext");
            document.documentElement.style.setProperty(
              "--color-headerlinks",
              headerText
            );

            if (!isMobileBreakpoint) {
              footer.classList.add("hide");
            }

            elPanel.current.classList.add("active");
            elLinks.current.classList.add("active");

            if (casePage) {
              elRightPanel.current.classList.add("active");
              setTimeout(() => {
                elRightPanel.current.classList.add("activeclock");
              }, 300);
            }

            elCasenav.current.classList.add("active");
          },
          onLeaveBack: () => {
            document.documentElement.style.setProperty(
              "--color-headerlinks",
              "#c4c4c4"
            );

            if (!isMobileBreakpoint) {
              footer.classList.remove("hide");
            }

            elPanel.current.classList.remove("active");
            elLinks.current.classList.remove("active");

            if (casePage) {
              elRightPanel.current.classList.remove("active");
              elRightPanel.current.classList.remove("activeclock");
            }

            elCasenav.current.classList.remove("active");
          },
        });

        // Footer
        ScrollTrigger.create({
          trigger: lenis.options.content,
          start: "bottom bottom",
          onEnter: () => {
            if (casePage) {
              elRightPanel.current.classList.remove("active");
              elRightPanel.current.classList.add("activeclock");
            } else {
              elRightPanel.current.classList.add("active");
            }
          },
          onLeaveBack: () => {
            if (casePage) {
              elRightPanel.current.classList.remove("activeclock");
              elRightPanel.current.classList.add("active");
            } else {
              elRightPanel.current.classList.remove("active");
            }
          },
        });

        // Footer (early)
        ScrollTrigger.create({
          trigger: lenis.options.content,
          start: `${
            casePage
              ? "clamp(bottom bottom+=130px)"
              : "clamp(bottom bottom+=50px)"
          }`,
          onEnter: () => {
            setTimeout(() => {
              footer.classList.remove("hide");

              if (isMobileBreakpoint) {
                elPanel.current.classList.add("activecolor");
              }
            }, 300);
          },
          onLeaveBack: () => {
            footer.classList.add("hide");

            if (isMobileBreakpoint) {
              elPanel.current.classList.remove("activecolor");
            }
          },
        });
      });
    }

    return () => ctx?.revert();
  }, [lenis, routeObject?.options?.resizableHeader]);

  useEffect(() => {
    setOpen(false);

    if (location?.state?.from?.startsWith("/case")) {
      console.log("exit from case from", location?.state?.from);
    }
  }, [location.pathname, location?.state?.from]);

  return (
    <Container ref={containerRef} className="SiteHeader" size="l">
      <motion.div
        animate={isOpen ? "open" : "closed"}
        className="SiteHeaderPanel__wrapper"
      >
        <Panel ref={elPanel} className="SiteHeaderPanel">
          <Link className="SiteBranding" to="/" state={routerState}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none">
              <path
                className="f"
                d="M8.8938 2.26936V0.0123596H0V9.39416H2.7938V5.84396H6.6246C6.954 5.84396 7.2224 5.62436 7.2224 5.35596V3.58696H2.7572V2.26936H8.8938Z"
                fill="white"
              />
              <path
                className="slash"
                d="M7.30889 0L0.799805 11.6521L2.28197 12.4529L8.79106 0.800808L7.30889 0Z"
                fill="white"
              />
              <path
                className="i hide"
                d="M11.9805 9.3818H14.8841V0H11.9805V9.3818Z"
                fill="white"
              />
              <path
                className="f2 hide"
                d="M27.2549 2.26921V0.012207H18.3611V9.39401H21.1549V5.84381H24.9857C25.3151 5.84381 25.5835 5.62421 25.5835 5.35581V3.58681H21.1427V2.26921H27.2671H27.2549Z"
                fill="white"
              />
              <path
                className="t hide"
                d="M34.0989 9.3818H36.8561V2.257H40.6015V0H30.3535V2.257H34.0989V9.3818Z"
                fill="white"
              />
              <path
                className="y hide"
                d="M48.4829 4.27H45.2377L42.9197 0H46.1649L48.4829 4.27ZM50.6545 9.3818H47.4093L52.0453 0H55.2905L50.6545 9.3818Z"
                fill="white"
              />

              <path
                className="s"
                d="M60.9635 3.2696V2.257H64.6845V2.9036H67.4661V0.488C67.4661 0.2318 67.1977 0 66.8805 0H58.7797C58.4503 0 58.1941 0.2196 58.1941 0.488V4.3432C58.1941 4.5628 58.3893 4.7702 58.6577 4.8068L64.6967 6.1V7.1126H60.9757V6.466H58.1941V8.8694C58.1941 9.1256 58.4625 9.3574 58.7797 9.3574H66.8805C67.2099 9.3574 67.4661 9.1378 67.4661 8.8694V5.0386C67.4661 4.819 67.2709 4.6116 67.0025 4.575L60.9635 3.2696Z"
                fill="white"
              />

              <path
                className="e hide"
                d="M80.0442 2.26921V0.012207H71.1504V9.39401H80.0442V7.13701H73.9442V5.84381H77.775C78.1044 5.84381 78.3728 5.62421 78.3728 5.35581V3.58681H73.932V2.26921H80.0564H80.0442Z"
                fill="white"
              />

              <path
                className="v hide"
                d="M92.171 0H95.4162L93.086 4.27H89.8408L92.171 0ZM83.0332 0H86.2784L90.9144 9.3818H87.6692L83.0332 0Z"
                fill="white"
              />

              <path
                className="e2 hide"
                d="M107.299 2.26921V0.012207H98.4053V9.39401H107.299V7.13701H101.199V5.84381H105.03C105.359 5.84381 105.628 5.62421 105.628 5.35581V3.58681H101.187V2.26921H107.311H107.299Z"
                fill="white"
              />

              <path
                className="n hide"
                d="M119.218 5.68521L113.57 0.012207H110.971V9.39401H113.765V3.90401L119.414 9.39401H122V0.012207H119.218V5.68521Z"
                fill="white"
              />
            </svg>
          </Link>

          <div className="SiteNavigation">
            <div
              className="SiteNavigation__active"
              onClick={handleCurrentRouteClick}
              onMouseEnter={handleMenuState(true)}
            >
              <MaskedReveal key={activeId}>{active}</MaskedReveal>
            </div>

            <HamburgerMenu isActive={isOpen} onClick={handleOpen} />

            {!isMobile && (
              <HamburgerMenuHotspot
                menuOpen={isOpen}
                width={dimensions.width}
                onMouseEnter={handleMenuState(true)}
                onMouseLeave={handleMenuState(false)}
              />
            )}
          </div>
        </Panel>

        <motion.div
          ref={elLinks}
          className="SiteHeaderLinks__wrapper"
          animate={isOpen ? "open" : "closed"}
          initial="closed"
          variants={{
            closed: { height: 0 },
            open: { height: panelRef.current?.getBoundingClientRect().height },
          }}
          transition={{
            duration: 0.6,
            ease: Easings.easeOutCubic,
          }}
          onMouseLeave={handleMenuState(false, handleCloseMenu)}
        >
          <SiteHeaderLinks
            ref={capturePanelRef}
            links={links}
            isOpen={isOpen}
          />
        </motion.div>

        <div className="SiteHeaderNavigateBack__wrapper">
          <motion.div
            animate={location.pathname.includes("/case") ? "show" : "hide"}
            exit="hide"
            initial="hide"
            variants={{
              hide: {
                y: "-100%",
                pointerEvents: "none",
                position: "absolute",
                transitionEnd: {
                  display: "none",
                },
                transition: {
                  duration: 0.7,
                  ease: Easings.easeInCubic,
                },
              },
              show: {
                display: "block",
                position: "relative",
                y: 0,
                pointerEvents: "auto",
                transition: {
                  duration: 0.7,
                  delay: 1,
                  ease: Easings.easeOutCubic,
                },
              },
            }}
            transition={{
              ease: Easings.easeOutCubic,
            }}
          >
            <Casenav ref={elCasenav} items={caseItems} />
          </motion.div>

          <AnimatePresence>
            {isNavigateBackButtonVisible && (
              <motion.div
                animate={isNavigateBackButtonVisible ? "show" : "hide"}
                exit="hide"
                initial="hide"
                variants={{
                  hide: {
                    x: "-100%",
                    transition: {
                      duration: 0.7,
                      ease: Easings.easeInCubic,
                    },
                  },
                  show: {
                    x: 0,
                    transition: {
                      duration: 0.7,
                      delay: navigateBackDelay,
                      ease: Easings.easeOutCubic,
                    },
                  },
                }}
                transition={{
                  ease: Easings.easeOutCubic,
                }}
              >
                <NavigateBackButton />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {!isMobileBreakpoint && <SiteHeaderMain.Target as={Flex} grow={1} />}

      <div ref={elRightPanel} className="RightPanel">
        <Time className="HeaderTime" />

        <div className="button">
          <Link to="/contact" state={routerState}>
            <TextButton icon={<Icon type="link" />}>Book Call</TextButton>
          </Link>
        </div>
      </div>
    </Container>
  );
}
