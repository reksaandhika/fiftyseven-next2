import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { CustomEase } from 'gsap/dist/CustomEase';
import { Draggable } from 'gsap/dist/Draggable';
import { InertiaPlugin } from 'gsap/dist/InertiaPlugin';
import { SplitText } from 'gsap/dist/SplitText';
import { DrawSVGPlugin } from 'gsap/dist/DrawSVGPlugin';
import { Flip } from 'gsap/dist/Flip';

gsap.registerPlugin(
  CustomEase,
  Draggable,
  InertiaPlugin,
  ScrollTrigger,
  SplitText,
  DrawSVGPlugin,
  Flip,
);
