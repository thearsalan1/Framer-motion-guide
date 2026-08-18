# Learning Framer Motion

A practical guide to learning Framer Motion in React, from basic animations to variants, viewport animations, gestures, and orchestration.

---

## Table of Contents

1. [Installation](#1-installation)
2. [What Is Framer Motion?](#2-what-is-framer-motion)
3. [The Framer Motion Mental Model](#3-the-framer-motion-mental-model)
4. [The Three Most Important Animation Props](#4-the-three-most-important-animation-props)
5. [`initial`](#5-initial)
6. [`animate`](#6-animate)
7. [Common Animatable Properties](#7-common-animatable-properties)
8. [`transition`](#8-transition)
9. [Complete Basic Animation](#9-complete-basic-animation)
10. [`whileHover`](#10-whilehover)
11. [`whileTap`](#11-whiletap)
12. [`whileFocus`](#12-whilefocus)
13. [`whileInView`](#13-whileinview)
14. [`viewport`](#14-viewport)
15. [Feature Card Example](#15-feature-card-example)
16. [Variants](#16-variants)
17. [Why Variants Are Useful](#17-why-variants-are-useful)
18. [Parent and Child Variants](#18-parent-and-child-variants)
19. [Variant Propagation](#19-variant-propagation)
20. [`staggerChildren`](#20-staggerchildren)
21. [`delayChildren`](#21-delaychildren)
22. [Staggered Viewport Animations](#22-staggered-viewport-animations)
23. [Complete Hero Example](#23-complete-hero-example)
24. [Hero Example Using Variants](#24-hero-example-using-variants)
25. [Animation vs. Transition](#25-animation-vs-transition)
26. [When to Use Each Feature](#26-when-to-use-each-feature)
27. [Recommended Learning Order](#27-recommended-learning-order)
28. [Common Mistakes](#28-common-mistakes)
29. [Accessibility and Performance](#29-accessibility-and-performance)
30. [Project Structure](#30-project-structure)
31. [Complete Cheat Sheet](#31-complete-cheat-sheet)
32. [Core Formula](#32-core-formula)
33. [Next Topics to Learn](#33-next-topics-to-learn)

34. [Transition Types: `tween`, `spring`, `inertia`](#34-transition-types-tween-spring-inertia)
35. [`tween` — Time-Based Animation](#35-tween--time-based-animation)
36. [`spring` — Physics-Based Animation](#36-spring--physics-based-animation)
37. [`inertia` — Momentum-Based Animation](#37-inertia--momentum-based-animation)
38. [`useScroll` — Tracking Scroll Progress](#38-usescroll--tracking-scroll-progress)
39. [Tracking a Specific Element's Scroll](#39-tracking-a-specific-elements-scroll)
40. [`useTransform` — Mapping One Range to Another](#40-usetransform--mapping-one-range-to-another)
41. [Multi-Point Mapping](#41-multi-point-mapping)
42. [Drag Gestures — Basics](#42-drag-gestures--basics)
43. [`dragConstraints` — Setting Drag Boundaries](#43-dragconstraints--setting-drag-boundaries)
44. [`dragElastic` — Boundary Resistance](#44-dragelastic--boundary-resistance)
45. [`whileDrag` — Visual Feedback During Drag](#45-whiledrag--visual-feedback-during-drag)
46. [`onDragEnd` — Reacting to Where the Drag Ended](#46-ondragend--reacting-to-where-the-drag-ended)
47. [`layout` — Automatic Layout Transitions](#47-layout--automatic-layout-transitions)
48. [`layoutId` — Shared Element Transitions](#48-layoutid--shared-element-transitions)
49. [`LayoutGroup` — Coordinating Multiple Layout Animations](#49-layoutgroup--coordinating-multiple-layout-animations)
50. [GPU-Accelerated Properties — Fast vs. Slow Animations](#50-gpu-accelerated-properties--fast-vs-slow-animations)
51. [`useReducedMotion` — Respecting Accessibility Preferences](#51-usereducedmotion--respecting-accessibility-preferences)
52. [`will-change` — Advanced Optimization Hint](#52-will-change--advanced-optimization-hint)
53. [`exit` — Defining an Exit Animation](#53-exit--defining-an-exit-animation)
54. [`AnimatePresence` — Animating Elements on Removal](#54-animatepresence--animating-elements-on-removal)
55. [`useMotionValue` — Values Outside React's Render Cycle](#55-usemotionvalue--values-outside-reacts-render-cycle)
56. [`useSpring` — Smoothing a Motion Value](#56-usespring--smoothing-a-motion-value)
57. [Real Project Checklist](#57-real-project-checklist)

---

---

# 1. Installation

## Install Framer Motion

If you are using npm, install Framer Motion with:

```bash
npm install framer-motion
```

You can also use:

```bash
yarn add framer-motion
```

or:

```bash
pnpm add framer-motion
```

## Import `motion`

After installing the package, import `motion` into the React component where you want to create animations:

```jsx
import { motion } from "framer-motion";
```

## Example React Component

```jsx
import { motion } from "framer-motion";

function App() {
  return (
    <motion.div>
      Hello Framer Motion
    </motion.div>
  );
}

export default App;
```

---

# 2. What Is Framer Motion?

React provides normal HTML elements such as:

```jsx
<div>Hello</div>
```

A normal `<div>` understands normal HTML and CSS properties, such as:

```jsx
<div
  className="card"
  id="card"
>
  Hello
</div>
```

However, a normal `<div>` does not automatically understand Framer Motion props such as:

- `initial`
- `animate`
- `transition`
- `whileHover`
- `whileTap`
- `whileFocus`
- `whileInView`
- `variants`
- `viewport`

For example, this is not a Framer Motion element:

```jsx
<div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  Hello
</div>
```

The browser does not know what `initial` and `animate` mean on a normal `<div>`.

Framer Motion provides animated versions of HTML elements through the `motion` object:

```jsx
<motion.div>Hello</motion.div>
```

Common motion elements include:

```jsx
<motion.div />
<motion.section />
<motion.h1 />
<motion.h2 />
<motion.p />
<motion.button />
<motion.img />
<motion.ul />
<motion.li />
<input />
```

A motion element behaves like its normal HTML equivalent, but it also understands animation props.

For example:

```jsx
<motion.div
  className="card"
  id="card"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  Hello
</motion.div>
```

This element:

- Still accepts `className`.
- Still accepts `id`.
- Still contains normal children.
- Still uses CSS.
- Can now animate using Framer Motion props.

## Important Mental Model

Think of:

```jsx
<motion.div />
```

as:

```text
Normal HTML <div>
+
Framer Motion animation capabilities
```

---

# 3. The Framer Motion Mental Model

Before writing an animation, ask these questions:

```text
Where does the element start?
        ↓
      initial

Where should the element end?
        ↓
      animate

How should it move?
        ↓
    transition

When should it run?
        ↓
whileHover / whileTap / whileFocus / whileInView

How should several elements coordinate?
        ↓
      variants

How should children be sequenced?
        ↓
staggerChildren / delayChildren
```

This is more useful than trying to memorize every Framer Motion prop separately.

For example, if you want a card to fade in from below when it appears, decide:

1. Starting state: invisible and lower.
2. Ending state: visible and in its normal position.
3. Motion behavior: smooth and lasting 0.5 seconds.
4. Trigger: when the component appears.

That becomes:

```jsx
<motion.div
  initial={{
    opacity: 0,
    y: 30
  }}
  animate={{
    opacity: 1,
    y: 0
  }}
  transition={{
    duration: 0.5,
    ease: "easeOut"
  }}
>
  Card
</motion.div>
```

---

# 4. The Three Most Important Animation Props

Most basic Framer Motion animations are built with:

```text
initial → animate → transition
```

Example:

```jsx
<motion.div
  initial={{
    opacity: 0,
    y: 50
  }}
  animate={{
    opacity: 1,
    y: 0
  }}
  transition={{
    duration: 0.6
  }}
>
  Hello
</motion.div>
```

The three props have different responsibilities.

## `initial`

Defines the starting state.

```jsx
initial={{
  opacity: 0,
  y: 50
}}
```

The element starts:

- Invisible.
- 50 pixels lower than its normal position.

## `animate`

Defines the target state.

```jsx
animate={{
  opacity: 1,
  y: 0
}}
```

The element ends:

- Fully visible.
- At its normal position.

## `transition`

Defines how the element changes from the starting state to the target state.

```jsx
transition={{
  duration: 0.6,
  ease: "easeOut"
}}
```

This controls:

- Duration.
- Delay.
- Easing.
- Spring behavior.
- Repetition.
- Staggering.

---

# 5. `initial`

The `initial` prop defines the starting values of an animation.

```jsx
<motion.div
  initial={{
    opacity: 0,
    y: 50
  }}
>
  Hello
</motion.div>
```

This means:

```text
opacity: 0
```

The element is invisible.

```text
y: 50
```

The element is translated 50 pixels downward from its normal position.

The element begins like this:

```text
      Hello
        ↓
      50px
        ↓
   Original position
```

The `initial` prop does not define the final position. It defines only where the element starts.

## Example: Fade-In Starting State

```jsx
<motion.h1
  initial={{
    opacity: 0
  }}
>
  Welcome
</motion.h1>
```

The heading begins invisible.

## Example: Slide-In Starting State

```jsx
<motion.div
  initial={{
    x: -100
  }}
>
  Hello
</motion.div>
```

The element begins 100 pixels to the left.

## Example: Scale Starting State

```jsx
<motion.div
  initial={{
    scale: 0.5
  }}
>
  Hello
</motion.div>
```

The element begins at half its normal size.

## Disable the Initial Animation

If you do not want an element to animate from its initial state on the first render, use:

```jsx
<motion.div
  initial={false}
  animate={{
    opacity: 1
  }}
>
  Hello
</motion.div>
```

`initial={false}` tells Framer Motion to skip the initial animation and render the element using its current animation state.

---

# 6. `animate`

The `animate` prop defines the target state of the element.

```jsx
<motion.div
  initial={{
    opacity: 0,
    y: 50
  }}
  animate={{
    opacity: 1,
    y: 0
  }}
>
  Hello
</motion.div>
```

The element changes like this:

```text
START

opacity: 0
y: 50

       ↓

END

opacity: 1
y: 0
```

The element:

1. Starts invisible.
2. Starts 50 pixels lower.
3. Fades to full visibility.
4. Moves upward to its original position.

## Animation Without `initial`

You can use `animate` without manually providing `initial`:

```jsx
<motion.div
  animate={{
    x: 100
  }}
>
  Hello
</motion.div>
```

In this case, Framer Motion animates the element from its default position to `x: 100`.

## Animating to Multiple Keyframes

Some properties can animate through multiple values:

```jsx
<motion.div
  animate={{
    x:[0][100]
  }}
>
  Move
</motion.div>
```

This makes the element:

1. Start at `x: 0`.
2. Move to `x: 100`.
3. Return to `x: 0`.

You can also animate opacity through multiple values:

```jsx
<motion.div
  animate={{
    opacity:[0][1]
  }}
>
  Flash
</motion.div>
```

---

# 7. Common Animatable Properties

Framer Motion can animate many transform and CSS properties.

## Opacity

```jsx
opacity: 0
```

The element is invisible.

```jsx
opacity: 1
```

The element is fully visible.

Example:

```jsx
<motion.div
  initial={{
    opacity: 0
  }}
  animate={{
    opacity: 1
  }}
>
  Hello
</motion.div>
```

This creates a fade-in effect.

## X Position

The `x` property moves an element horizontally.

```jsx
<motion.div
  initial={{
    x: -100
  }}
  animate={{
    x: 0
  }}
>
  Hello
</motion.div>
```

The element starts 100 pixels to the left and moves to its normal position.

To move the element to the right:

```jsx
<motion.div
  animate={{
    x: 100
  }}
>
  Hello
</motion.div>
```

## Y Position

The `y` property moves an element vertically.

```jsx
<motion.div
  initial={{
    y: 50
  }}
  animate={{
    y: 0
  }}
>
  Hello
</motion.div>
```

The element starts 50 pixels below its normal position and moves upward.

## Scale

The `scale` property changes the size of an element.

Normal size:

```jsx
scale: 1
```

Half size:

```jsx
scale: 0.5
```

Larger size:

```jsx
scale: 1.2
```

Example:

```jsx
<motion.div
  initial={{
    scale: 0.5
  }}
  animate={{
    scale: 1
  }}
>
  Hello
</motion.div>
```

## Rotate

The `rotate` property rotates an element.

Rotation is measured in degrees:

```jsx
rotate: 180
```

Example:

```jsx
<motion.div
  initial={{
    rotate: 0
  }}
  animate={{
    rotate: 180
  }}
>
  🔄
</motion.div>
```

Rotate continuously:

```jsx
<motion.div
  animate={{
    rotate: 360
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "linear"
  }}
>
  🔄
</motion.div>
```

## Skew

You can also skew elements:

```jsx
<motion.div
  initial={{
    skewX: 0
  }}
  animate={{
    skewX: 20
  }}
>
  Skewed element
</motion.div>
```

## Background Color

Some CSS colors can be animated:

```jsx
<motion.div
  initial={{
    backgroundColor: "#000000"
  }}
  animate={{
    backgroundColor: "#0c4832"
  }}
>
  Hello
</motion.div>
```

## Text Color

You can animate text color:

```jsx
<motion.h1
  initial={{
    color: "#ffffff"
  }}
  animate={{
    color: "#14b8a6"
  }}
>
  Campus Connect
</motion.h1>
```

## Border Radius

You can animate rounded corners:

```jsx
<motion.div
  initial={{
    borderRadius: "0px"
  }}
  animate={{
    borderRadius: "24px"
  }}
>
  Rounded box
</motion.div>
```

## Performance Note

Transforms and opacity are usually good choices for smooth animations:

```jsx
opacity
x
y
scale
rotate
```

For complex layout changes, CSS layout properties may require more work from the browser. Prefer transform-based animations when possible.

---

# 8. `transition`

The `transition` prop controls how the animation happens.

```jsx
<motion.div
  initial={{
    opacity: 0,
    y: 50
  }}
  animate={{
    opacity: 1,
    y: 0
  }}
  transition={{
    duration: 0.6,
    delay: 0.2,
    ease: "easeOut"
  }}
>
  Hello
</motion.div>
```

## `duration`

Controls how long the animation takes.

```jsx
transition={{
  duration: 0.6
}}
```

The animation takes approximately 0.6 seconds.

Example:

```jsx
transition={{
  duration: 1
}}
```

This creates a slower one-second animation.

## `delay`

Waits before starting the animation.

```jsx
transition={{
  delay: 0.3
}}
```

The behavior is:

```text
Component renders
        ↓
Wait 0.3 seconds
        ↓
Animation starts
```

## `ease`

Controls the speed curve of the animation.

Common values:

```jsx
ease: "easeIn"
ease: "easeOut"
ease: "easeInOut"
ease: "linear"
```

### `easeIn`

Starts slowly and becomes faster.

```jsx
transition={{
  ease: "easeIn"
}}
```

### `easeOut`

Starts quickly and slows down near the end.

```jsx
transition={{
  ease: "easeOut"
}}
```

This is often a good choice for UI elements entering the screen.

### `easeInOut`

Starts slowly, becomes faster, and slows down again.

```jsx
transition={{
  ease: "easeInOut"
}}
```

### `linear`

Moves at a constant speed.

```jsx
transition={{
  ease: "linear"
}}
```

This is useful for continuously rotating elements.

## Spring Transitions

Instead of using a duration-based animation, you can use a spring:

```jsx
<motion.div
  initial={{
    scale: 0
  }}
  animate={{
    scale: 1
  }}
  transition={{
    type: "spring",
    stiffness: 200,
    damping: 20
  }}
>
  Spring animation
</motion.div>
```

### `stiffness`

Controls how strongly the spring moves.

Higher stiffness makes the animation more energetic.

### `damping`

Controls how much the spring slows down.

Higher damping reduces bouncing.

## Repeating Animations

Repeat an animation:

```jsx
<motion.div
  animate={{
    rotate: 360
  }}
  transition={{
    duration: 2,
    repeat: Infinity
  }}
>
  🔄
</motion.div>
```

Repeat a fixed number of times:

```jsx
transition={{
  duration: 1,
  repeat: 3
}}
```

Repeat in reverse:

```jsx
transition={{
  duration: 1,
  repeat: Infinity,
  repeatType: "reverse"
}}
```

---

# 9. Complete Basic Animation

```jsx
import { motion } from "framer-motion";

function Card() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut"
      }}
      className="rounded-xl bg-white p-6 shadow-md"
    >
      <h2>Feature Card</h2>

      <p>
        This card fades in and moves upward when the component appears.
      </p>
    </motion.div>
  );
}

export default Card;
```

## How This Example Works

```jsx
initial={{
  opacity: 0,
  y: 30
}}
```

The card starts invisible and 30 pixels lower.

```jsx
animate={{
  opacity: 1,
  y: 0
}}
```

The card ends fully visible and returns to its normal position.

```jsx
transition={{
  duration: 0.5,
  ease: "easeOut"
}}
```

The animation lasts half a second and slows down near the end.

---

# 10. `whileHover`

The `whileHover` prop runs an animation while the user hovers over an element.

```jsx
<motion.button
  whileHover={{
    scale: 1.05
  }}
>
  Get Started
</motion.button>
```

When the pointer moves over the button, it scales to 1.05, which means it becomes 5% larger.

When the pointer leaves, Framer Motion returns it to its normal size.

## Hover with Multiple Properties

```jsx
<motion.div
  whileHover={{
    scale: 1.05,
    rotate: 2,
    backgroundColor: "#14b8a6"
  }}
>
  Hover over me
</motion.div>
```

## Hover Transition

You can specify how the hover animation should move:

```jsx
<motion.button
  whileHover={{
    scale: 1.05
  }}
  transition={{
    duration: 0.2
  }}
>
  Hover
</motion.button>
```

## Common Button Pattern

```jsx
<motion.button
  whileHover={{
    scale: 1.05
  }}
  whileTap={{
    scale: 0.95
  }}
>
  Get Started
</motion.button>
```

Behavior:

```text
Normal
  ↓
Hover → button becomes slightly larger
  ↓
Press → button becomes slightly smaller
  ↓
Release → button returns to hover size
  ↓
Pointer leaves → button returns to normal size
```

---

# 11. `whileTap`

The `whileTap` prop runs while the user is pressing or clicking an element.

```jsx
<motion.button
  whileTap={{
    scale: 0.95
  }}
>
  Click Me
</motion.button>
```

This creates a small press effect.

When the user presses the button, it becomes slightly smaller. When the user releases the button, it returns to its normal state.

## Button with Hover and Tap

```jsx
<motion.button
  whileHover={{
    scale: 1.05
  }}
  whileTap={{
    scale: 0.95
  }}
>
  Get Started
</motion.button>
```

This is one of the most common interactive button animations.

---

# 12. `whileFocus`

The `whileFocus` prop runs while an element has keyboard or programmatic focus.

```jsx
<motion.input
  whileFocus={{
    scale: 1.02
  }}
  placeholder="Enter your name"
/>
```

When the input receives focus, it becomes slightly larger.

This can be useful for:

- Text inputs.
- Search bars.
- Form fields.
- Keyboard navigation.
- Accessibility-focused interactions.

## Focus with Border Color

```jsx
<motion.input
  whileFocus={{
    scale: 1.02,
    borderColor: "#14b8a6"
  }}
  placeholder="Search"
/>
```

Do not remove visible focus styles unless you replace them with another clear focus indicator.

---

# 13. `whileInView`

The `whileInView` prop runs an animation when an element enters the viewport.

A viewport is the visible area of the browser window.

Without `whileInView`, an element using `animate` usually begins its animation when the component renders.

With `whileInView`, the animation waits until the element becomes visible while scrolling.

```jsx
<motion.div
  initial={{
    opacity: 0,
    y: 50
  }}
  whileInView={{
    opacity: 1,
    y: 0
  }}
  transition={{
    duration: 0.6
  }}
>
  Feature Card
</motion.div>
```

## How It Works

```text
Page loads
    ↓
Element is below the visible screen
    ↓
User scrolls
    ↓
Element enters the viewport
    ↓
whileInView animation starts
```

## `whileInView` vs. `animate`

Use `animate` when the animation should run as part of the normal component lifecycle:

```jsx
<motion.div
  initial={{
    opacity: 0
  }}
  animate={{
    opacity: 1
  }}
>
  Appears when component renders
</motion.div>
```

Use `whileInView` when the animation should run after the element enters the visible screen:

```jsx
<motion.div
  initial={{
    opacity: 0
  }}
  whileInView={{
    opacity: 1
  }}
>
  Appears when element enters viewport
</motion.div>
```

---

# 14. `viewport`

The `viewport` prop controls how `whileInView` behaves.

```jsx
<motion.div
  initial={{
    opacity: 0,
    y: 50
  }}
  whileInView={{
    opacity: 1,
    y: 0
  }}
  transition={{
    duration: 0.6
  }}
  viewport={{
    once: true,
    amount: 0.3
  }}
>
  Feature Card
</motion.div>
```

## `once`

```jsx
viewport={{
  once: true
}}
```

The animation runs only the first time the element enters the viewport.

This is useful for reveal animations because the element does not repeatedly animate every time the user scrolls past it.

Without `once: true`, the animation may run again when the element leaves and re-enters the viewport.

## `amount`

```jsx
viewport={{
  amount: 0.3
}}
```

The `amount` option controls how much of the element must be visible before the animation starts.

For example:

```jsx
amount: 0.3
```

means approximately 30% of the element should be visible.

Common values:

```jsx
amount: 0.1
```

Starts when a small part is visible.

```jsx
amount: 0.3
```

Starts when roughly 30% is visible.

```jsx
amount: 0.5
```

Starts when roughly half is visible.

```jsx
amount: 1
```

Starts when the entire element is visible.

## Example

```jsx
<motion.section
  initial={{
    opacity: 0,
    y: 40
  }}
  whileInView={{
    opacity: 1,
    y: 0
  }}
  viewport={{
    once: true,
    amount: 0.5
  }}
>
  This section animates after about half of it is visible.
</motion.section>
```

---

# 15. Feature Card Example

```jsx
import { motion } from "framer-motion";

function FeatureCard({ title, description }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut"
      }}
      viewport={{
        once: true,
        amount: 0.3
      }}
      className="rounded-xl bg-white p-6 shadow-md"
    >
      <h3 className="text-xl font-bold">
        {title}
      </h3>

      <p className="mt-2 text-gray-600">
        {description}
      </p>
    </motion.div>
  );
}

export default FeatureCard;
```

## How This Example Works

```jsx
initial={{
  opacity: 0,
  y: 40
}}
```

The card begins invisible and 40 pixels lower.

```jsx
whileInView={{
  opacity: 1,
  y: 0
}}
```

When the card enters the viewport, it becomes visible and returns to its normal position.

```jsx
viewport={{
  once: true,
  amount: 0.3
}}
```

The animation starts when about 30% of the card is visible and runs only once.

---

# 16. Variants

When animations become larger, writing animation objects directly inside every component can become repetitive.

Without variants:

```jsx
<motion.div
  initial={{
    opacity: 0,
    y: 30
  }}
  animate={{
    opacity: 1,
    y: 0
  }}
>
  Hello
</motion.div>
```

If ten elements use the same animation, you would have to repeat the same values ten times.

Variants allow you to store named animation states in one object.

```jsx
const boxVariants = {
  hidden: {
    opacity: 0,
    y: 50
  },

  visible: {
    opacity: 1,
    y: 0
  }
};
```

This object contains two named states:

```text
hidden
visible
```

Use them like this:

```jsx
<motion.div
  variants={boxVariants}
  initial="hidden"
  animate="visible"
>
  Hello
</motion.div>
```

The strings refer to keys inside the variants object:

```jsx
initial="hidden"
```

uses:

```jsx
boxVariants.hidden
```

and:

```jsx
animate="visible"
```

uses:

```jsx
boxVariants.visible
```

## Complete Variants Example

```jsx
import { motion } from "framer-motion";

const boxVariants = {
  hidden: {
    opacity: 0,
    y: 50
  },

  visible: {
    opacity: 1,
    y: 0
  }
};

function Box() {
  return (
    <motion.div
      variants={boxVariants}
      initial="hidden"
      animate="visible"
      transition={{
        duration: 0.5
      }}
    >
      Hello
    </motion.div>
  );
}

export default Box;
```

---

# 17. Why Variants Are Useful

Variants become useful when:

- Multiple elements share the same animation.
- A parent needs to control its children.
- You need staggered animations.
- You have states such as `hidden`, `visible`, `exit`, `hover`, or `active`.
- Your component has several animation states.
- You want animation definitions outside the JSX markup.

Example named states:

```jsx
const buttonVariants = {
  initial: {
    scale: 1
  },

  hover: {
    scale: 1.05
  },

  tap: {
    scale: 0.95
  }
};
```

Variants make code easier to read:

```jsx
<motion.button
  variants={buttonVariants}
  initial="initial"
  whileHover="hover"
  whileTap="tap"
>
  Click
</motion.button>
```

However, variants are not required for every animation.

This simple code is perfectly valid:

```jsx
<motion.button
  whileHover={{
    scale: 1.05
  }}
  whileTap={{
    scale: 0.95
  }}
>
  Click
</motion.button>
```

Use variants when they improve organization and reusability.

---

# 18. Parent and Child Variants

Variants are especially powerful when a parent and its children use different variants.

Define a parent variant:

```jsx
const containerVariants = {
  hidden: {
    opacity: 0
  },

  visible: {
    opacity: 1
  }
};
```

Define a child variant:

```jsx
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },

  visible: {
    opacity: 1,
    y: 0
  }
};
```

Use both variants:

```jsx
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  <motion.div variants={itemVariants}>
    Item 1
  </motion.div>

  <motion.div variants={itemVariants}>
    Item 2
  </motion.div>

  <motion.div variants={itemVariants}>
    Item 3
  </motion.div>
</motion.div>
```

The parent changes from `hidden` to `visible`.

The children can receive the same state name automatically and use their own definitions for that state.

Conceptually:

```text
Parent
hidden → visible
   │
   ├── Child 1
   ├── Child 2
   └── Child 3
```

The parent controls the timing and state, while each child defines how it should animate.

---

# 19. Variant Propagation

Variant propagation means that a parent's active variant can be inherited by descendant motion components.

Example:

```jsx
const containerVariants = {
  hidden: {
    opacity: 0
  },

  visible: {
    opacity: 1
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },

  visible: {
    opacity: 1,
    y: 0
  }
};
```

Parent:

```jsx
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  <motion.div variants={itemVariants}>
    Item 1
  </motion.div>
</motion.div>
```

When the parent changes to:

```jsx
visible
```

the child can resolve its own:

```jsx
visible
```

variant.

This allows you to coordinate many child animations without manually writing `animate` on every child.

## Important Requirement

For variant propagation to work naturally:

- The parent must use `variants`.
- The parent must activate a variant using `initial`, `animate`, or `whileInView`.
- The child must use `variants`.
- The child variant should contain matching state names.

For example, the parent and child should both have:

```jsx
hidden
visible
```

---

# 20. `staggerChildren`

Suppose you have these items:

```text
Item 1
Item 2
Item 3
Item 4
```

You want them to appear one after another:

```text
Item 1 → appears
      ↓ 0.2 seconds
Item 2 → appears
      ↓ 0.2 seconds
Item 3 → appears
      ↓ 0.2 seconds
Item 4 → appears
```

One approach would be to manually add delays:

```jsx
delay: 0.2
delay: 0.4
delay: 0.6
```

This becomes difficult to maintain.

Instead, use `staggerChildren` in the parent variant:

```jsx
const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};
```

The parent tells Framer Motion to start each child 0.2 seconds after the previous child.

The child defines its own animation:

```jsx
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },

  visible: {
    opacity: 1,
    y: 0
  }
};
```

## Complete Example

```jsx
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },

  visible: {
    opacity: 1,
    y: 0
  }
};

function List() {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.li variants={itemVariants}>
        Item 1
      </motion.li>

      <motion.li variants={itemVariants}>
        Item 2
      </motion.li>

      <motion.li variants={itemVariants}>
        Item 3
      </motion.li>
    </motion.ul>
  );
}

export default List;
```

## What Happens?

```text
Parent activates visible
        ↓
Item 1 starts
        ↓
Wait 0.2 seconds
        ↓
Item 2 starts
        ↓
Wait 0.2 seconds
        ↓
Item 3 starts
```

The value:

```jsx
staggerChildren: 0.2
```

controls the delay between the start times of sibling children.

---

# 21. `delayChildren`

`delayChildren` adds a delay before the first child starts.

Suppose you want:

```text
Parent appears
      ↓
Wait 0.3 seconds
      ↓
Item 1
      ↓ 0.2 seconds
Item 2
      ↓ 0.2 seconds
Item 3
```

Use:

```jsx
const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};
```

## Meaning

```jsx
delayChildren: 0.3
```

Wait 0.3 seconds before starting the first child.

```jsx
staggerChildren: 0.2
```

Start each following child 0.2 seconds after the previous one.

## Complete Example

```jsx
const containerVariants = {
  hidden: {
    opacity: 0
  },

  visible: {
    opacity: 1,

    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};
```

---

# 22. Staggered Viewport Animations

Variants can be combined with `whileInView`.

This is useful when a list of items should animate one after another after the group enters the viewport.

```jsx
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },

  visible: {
    opacity: 1,
    y: 0
  }
};

function Features() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2
      }}
    >
      <motion.div variants={itemVariants}>
        Feature 1
      </motion.div>

      <motion.div variants={itemVariants}>
        Feature 2
      </motion.div>

      <motion.div variants={itemVariants}>
        Feature 3
      </motion.div>
    </motion.div>
  );
}

export default Features;
```

## Animation Sequence

```text
User scrolls
     ↓
Container enters the viewport
     ↓
Container becomes visible
     ↓
Feature 1 appears
     ↓ 0.15 seconds
Feature 2 appears
     ↓ 0.15 seconds
Feature 3 appears
```

This pattern is useful for:

- Feature sections.
- Card grids.
- Pricing cards.
- Navigation menus.
- Hero sections.
- Lists.
- Dashboard sections.
- Testimonials.

---

# 23. Complete Hero Example

```jsx
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="flex h-screen w-screen flex-col items-center justify-evenly">
      <motion.h1
        className="text-7xl font-semibold text-teal-500"
        initial={{
          opacity: 0,
          y: 30
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut"
        }}
      >
        Connect to your campus
      </motion.h1>

      <div className="flex flex-col items-center justify-center gap-2">
        <motion.p
          className="font-sans text-2xl text-teal-400"
          initial={{
            opacity: 0,
            y: 30
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: "easeOut"
          }}
        >
          College verified social platform for students
        </motion.p>

        <motion.button
          className="cursor-pointer bg-teal-500 px-3 py-2 text-xl hover:bg-teal-400"
          initial={{
            opacity: 0,
            y: 30
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6,
            delay: 0.4,
            ease: "easeOut"
          }}
          whileHover={{
            scale: 1.05
          }}
          whileTap={{
            scale: 0.95
          }}
        >
          Get Started
        </motion.button>
      </div>
    </section>
  );
}

export default Hero;
```

## How the Hero Works

### Heading

```jsx
initial={{
  opacity: 0,
  y: 30
}}
```

The heading starts invisible and 30 pixels below its normal position.

```jsx
animate={{
  opacity: 1,
  y: 0
}}
```

The heading fades in and moves to its normal position.

```jsx
transition={{
  duration: 0.6,
  ease: "easeOut"
}}
```

The heading takes 0.6 seconds to animate.

### Paragraph

The paragraph uses the same animation but has:

```jsx
delay: 0.2
```

This makes it start 0.2 seconds after the heading.

### Button

The button starts after:

```jsx
delay: 0.4
```

It also has:

```jsx
whileHover={{
  scale: 1.05
}}
```

so it grows slightly when hovered.

It has:

```jsx
whileTap={{
  scale: 0.95
}}
```

so it shrinks slightly while being pressed.

---

# 24. Hero Example Using Variants

Manually writing separate delays works, but it becomes repetitive.

A cleaner approach is to use parent and child variants.

```jsx
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {
    opacity: 0
  },

  visible: {
    opacity: 1,

    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },

  visible: {
    opacity: 1,
    y: 0
  }
};

function Hero() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 variants={itemVariants}>
        Connect to your campus
      </motion.h1>

      <motion.p variants={itemVariants}>
        College verified social platform for students
      </motion.p>

      <motion.button
        variants={itemVariants}
        whileHover={{
          scale: 1.05
        }}
        whileTap={{
          scale: 0.95
        }}
      >
        Get Started
      </motion.button>
    </motion.div>
  );
}

export default Hero;
```

## How This Is Better

The parent controls:

```jsx
staggerChildren: 0.2
```

The children all share:

```jsx
hidden
visible
```

The child animation is defined once:

```jsx
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },

  visible: {
    opacity: 1,
    y: 0
  }
};
```

This makes the animation easier to update.

If you later change the child animation from `y: 30` to `x: -30`, you only change one object.

---

# 25. Animation vs. Transition

This distinction is important.

## Animation

The animation defines **what changes**:

```jsx
animate={{
  opacity: 1,
  y: 0
}}
```

This says:

```text
Become fully visible
Move to y: 0
```

## Transition

The transition defines **how the change happens**:

```jsx
transition={{
  duration: 0.6,
  ease: "easeOut"
}}
```

This says:

```text
Take 0.6 seconds
Use an ease-out motion curve
```

Think of it this way:

```text
animate = destination

transition = journey
```

Another example:

```jsx
<motion.div
  initial={{
    scale: 0.5
  }}
  animate={{
    scale: 1
  }}
  transition={{
    type: "spring",
    stiffness: 200,
    damping: 20
  }}
>
  Hello
</motion.div>
```

Here:

- `animate` says the element should reach `scale: 1`.
- `transition` says it should reach that destination using a spring.

---

# 26. When to Use Each Feature

| Requirement | Feature to Use | Explanation |
|---|---|---|
| Animate when a component appears | `initial` + `animate` | Defines a starting state and a target state. |
| Fade an element in | `opacity` | Animate from `opacity: 0` to `opacity: 1`. |
| Slide an element in | `x` or `y` | Start with a non-zero position and animate to zero. |
| Scale an element | `scale` | Use values such as `0.5`, `1`, or `1.05`. |
| Rotate an element | `rotate` | Values are measured in degrees. |
| Animate on hover | `whileHover` | Runs while the pointer is over the element. |
| Animate while pressing | `whileTap` | Runs while a pointer or touch press is active. |
| Animate when focused | `whileFocus` | Runs while an input or control has focus. |
| Animate while scrolling into view | `whileInView` | Starts when the element enters the viewport. |
| Run a viewport animation once | `viewport={{ once: true }}` | Prevents repeated animation triggers. |
| Control when viewport animation starts | `viewport.amount` | Sets how much of the element must be visible. |
| Reuse animation states | `variants` | Stores named states such as `hidden` and `visible`. |
| Coordinate parent and children | Parent and child variants | Allows variant propagation. |
| Animate children one after another | `staggerChildren` | Adds a delay between child start times. |
| Wait before the first child | `delayChildren` | Delays the start of the child sequence. |
| Control animation speed | `transition.duration` | Sets the animation length. |
| Wait before animation starts | `transition.delay` | Adds a starting delay. |
| Control the motion curve | `transition.ease` | Uses easing such as `easeOut` or `linear`. |
| Create natural movement | Spring transition | Uses `type: "spring"` with stiffness and damping. |

---

# 27. Recommended Learning Order

Do not try to learn every Framer Motion feature at once.

Learn in this order:

## 1. Motion Components

Learn the difference between:

```jsx
<div />
```

and:

```jsx
<motion.div />
```

## 2. `initial`

Learn how to define the starting state.

## 3. `animate`

Learn how to define the target state.

## 4. `transition`

Learn how to control timing and easing.

## 5. `whileHover`

Build hover interactions for cards and buttons.

## 6. `whileTap`

Build press feedback for buttons.

## 7. `whileFocus`

Build focus feedback for inputs and form controls.

## 8. `whileInView`

Build scroll reveal animations.

## 9. `viewport`

Control when and how often viewport animations run.

## 10. Variants

Organize reusable animation states.

## 11. `staggerChildren`

Animate lists and groups sequentially.

## 12. `delayChildren`

Delay the start of a child animation sequence.

## 13. Gestures

Learn drag and pointer-based interactions.

## 14. `useScroll`

Create animations connected to page or element scrolling.

## 15. `useTransform`

Transform one motion value into another value.

## 16. `useMotionValue`

Work directly with values that update without causing normal React re-renders.

## 17. Layout Animations

Animate changes in layout and position.

---

# 28. Common Mistakes

## Mistake 1: Forgetting a Comma

Incorrect:

```jsx
transition={{
  duration: 0.6,
  delay: 0.2
  ease: "easeOut"
}}
```

There is no comma after `delay: 0.2`.

Correct:

```jsx
transition={{
  duration: 0.6,
  delay: 0.2,
  ease: "easeOut"
}}
```

## Mistake 2: Using Animation Props on Normal HTML Elements

Incorrect:

```jsx
<div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  Hello
</div>
```

A normal `<div>` does not understand Framer Motion props.

Correct:

```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  Hello
</motion.div>
```

## Mistake 3: Forgetting the Import

Make sure this exists:

```jsx
import { motion } from "framer-motion";
```

Without the import, `motion` will not be available.

## Mistake 4: Confusing `animate` with `whileInView`

This starts through the normal component animation lifecycle:

```jsx
animate={{
  opacity: 1
}}
```

This starts when the element enters the viewport:

```jsx
whileInView={{
  opacity: 1
}}
```

## Mistake 5: Repeating Delays Manually

Avoid writing:

```jsx
delay: 0.1
delay: 0.2
delay: 0.3
delay: 0.4
```

For lists and groups, use:

```jsx
staggerChildren
```

This is easier to maintain when items are added or removed.

## Mistake 6: Missing Matching Variant Names

This can cause problems:

```jsx
const parentVariants = {
  hidden: {},
  visible: {}
};

const childVariants = {
  start: {},
  end: {}
};
```

The parent uses `hidden` and `visible`, but the child uses `start` and `end`.

Use matching names:

```jsx
const parentVariants = {
  hidden: {},
  visible: {}
};

const childVariants = {
  hidden: {},
  visible: {}
};
```

## Mistake 7: Forgetting to Add `variants` to Children

This parent cannot control a child that does not define variants:

```jsx
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  <motion.div>
    Item
  </motion.div>
</motion.div>
```

Add the child variant:

```jsx
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  <motion.div variants={itemVariants}>
    Item
  </motion.div>
</motion.div>
```

## Mistake 8: Putting Everything Into Variants

Variants are useful for reusable animation states, but not every small interaction needs them.

This is perfectly fine:

```jsx
<motion.button
  whileHover={{
    scale: 1.05
  }}
  whileTap={{
    scale: 0.95
  }}
>
  Click
</motion.button>
```

Do not over-engineer a simple animation.

## Mistake 9: Using Too Much Movement

Large movements can make an interface feel distracting.

Prefer small values for normal UI transitions:

```jsx
y: 20
```

or:

```jsx
scale: 1.03
```

rather than extremely large values unless the design specifically requires them.

## Mistake 10: Forgetting Mobile Users

Hover interactions are not available in the same way on touch devices.

Do not depend on hover alone for important functionality.

The button should remain usable without:

```jsx
whileHover
```

---

# 29. Accessibility and Performance

## Respect Reduced Motion Preferences

Some users prefer less motion because animation can cause discomfort or distraction.

You can use Framer Motion's reduced-motion support:

```jsx
import { motion } from "framer-motion";

function Card() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.5
      }}
    >
      Card
    </motion.div>
  );
}
```

For a larger application, consider configuring reduced motion behavior so users who request reduced motion receive less movement.

A fade-only animation is often less distracting than a large slide or scale animation.

## Keep Focus Visible

When animating buttons and inputs, do not remove the browser's focus outline unless you provide another clear visual focus style.

Example:

```jsx
<motion.button
  whileHover={{
    scale: 1.05
  }}
  whileTap={{
    scale: 0.95
  }}
  className="focus:outline-none focus:ring-2 focus:ring-teal-500"
>
  Get Started
</motion.button>
```

## Prefer Transform and Opacity

These properties are commonly used for performant UI animations:

```jsx
opacity
x
y
scale
rotate
```

Example:

```jsx
<motion.div
  initial={{
    opacity: 0,
    y: 20
  }}
  animate={{
    opacity: 1,
    y: 0
  }}
>
  Smooth animation
</motion.div>
```

## Avoid Excessive Animation

Animation should support the interface, not distract from it.

Use animation to:

- Show a state change.
- Give feedback.
- Guide attention.
- Reveal content.
- Make interactions feel responsive.

Avoid animating every element without a clear purpose.

---

# 30. Project Structure

For a small component, keeping variants inside the component is completely fine:

```jsx
const variants = {
  hidden: {
    opacity: 0
  },

  visible: {
    opacity: 1
  }
};
```

For a larger React project, animation definitions can be separated when they become reusable.

```text
src/
├── components/
│   ├── Hero/
│   │   ├── Hero.tsx
│   │   └── hero.variants.ts
│   │
│   ├── Features/
│   │   ├── Features.tsx
│   │   └── features.variants.ts
│   │
│   └── Button/
│       ├── Button.tsx
│       └── button.variants.ts
│
├── animations/
│   ├── fade.ts
│   ├── slide.ts
│   ├── scale.ts
│   └── stagger.ts
│
└── pages/
```

## Example Shared Animation File

```jsx
export const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },

  visible: {
    opacity: 1,
    y: 0
  }
};
```

Use it in a component:

```jsx
import { motion } from "framer-motion";
import { fadeUpVariants } from "../../animations/fade";

function Card() {
  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
    >
      Card
    </motion.div>
  );
}

export default Card;
```

---

# 31. Complete Cheat Sheet

## Basic Animation

```jsx
<motion.div
  initial={{
    opacity: 0
  }}
  animate={{
    opacity: 1
  }}
>
  Hello
</motion.div>
```

## Fade and Slide Animation

```jsx
<motion.div
  initial={{
    opacity: 0,
    y: 30
  }}
  animate={{
    opacity: 1,
    y: 0
  }}
  transition={{
    duration: 0.5,
    ease: "easeOut"
  }}
>
  Hello
</motion.div>
```

## Transition

```jsx
transition={{
  duration: 0.5,
  delay: 0.2,
  ease: "easeOut"
}}
```

## Spring Transition

```jsx
transition={{
  type: "spring",
  stiffness: 200,
  damping: 20
}}
```

## Hover

```jsx
whileHover={{
  scale: 1.05
}}
```

## Tap

```jsx
whileTap={{
  scale: 0.95
}}
```

## Focus

```jsx
whileFocus={{
  scale: 1.02
}}
```

## Viewport Animation

```jsx
whileInView={{
  opacity: 1,
  y: 0
}}
```

## Viewport Configuration

```jsx
viewport={{
  once: true,
  amount: 0.3
}}
```

## Variants

```jsx
const variants = {
  hidden: {
    opacity: 0
  },

  visible: {
    opacity: 1
  }
};
```

Use variants:

```jsx
<motion.div
  variants={variants}
  initial="hidden"
  animate="visible"
>
  Hello
</motion.div>
```

## Stagger Children

```jsx
const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};
```

## Delay Children

```jsx
const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};
```

## Repeating Animation

```jsx
<motion.div
  animate={{
    rotate: 360
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "linear"
  }}
>
  🔄
</motion.div>
```

## Button Animation

```jsx
<motion.button
  whileHover={{
    scale: 1.05
  }}
  whileTap={{
    scale: 0.95
  }}
>
  Get Started
</motion.button>
```

## Scroll Reveal Animation

```jsx
<motion.section
  initial={{
    opacity: 0,
    y: 40
  }}
  whileInView={{
    opacity: 1,
    y: 0
  }}
  viewport={{
    once: true,
    amount: 0.3
  }}
  transition={{
    duration: 0.6,
    ease: "easeOut"
  }}
>
  Scroll Reveal Section
</motion.section>
```

---

# 32. Core Formula

When building an animation, ask yourself these five questions:

## 1. Where Does It Start?

Use:

```jsx
initial
```

Example:

```jsx
initial={{
  opacity: 0,
  y: 30
}}
```

## 2. Where Should It End?

Use:

```jsx
animate
```

Example:

```jsx
animate={{
  opacity: 1,
  y: 0
}}
```

## 3. How Should It Move?

Use:

```jsx
transition
```

Example:

```jsx
transition={{
  duration: 0.5,
  ease: "easeOut"
}}
```

## 4. When Should It Happen?

Use:

```jsx
whileInView
whileHover
whileTap
whileFocus
```

Examples:

```jsx
whileInView={{
  opacity: 1
}}
```

```jsx
whileHover={{
  scale: 1.05
}}
```

```jsx
whileTap={{
  scale: 0.95
}}
```

```jsx
whileFocus={{
  scale: 1.02
}}
```

## 5. How Should Multiple Elements Coordinate?

Use:

```jsx
variants
```

and:

```jsx
staggerChildren
delayChildren
```

Example:

```jsx
const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};
```

---

# 33. Next Topics to Learn

After mastering the fundamentals in this guide, continue with:

```text
useScroll
    ↓
useTransform
    ↓
useMotionValue
    ↓
Scroll-linked animations
    ↓
Parallax effects
    ↓
Horizontal scrolling
    ↓
Layout animations
    ↓
Drag gestures
    ↓
Exit animations
    ↓
AnimatePresence
    ↓
Shared layout transitions
```

The main progression is:

```text
Basic animations
        ↓
Interaction animations
        ↓
Viewport animations
        ↓
Variants
        ↓
Staggering
        ↓
Gestures
        ↓
Motion values
        ↓
Scroll-linked animations
        ↓
Layout animations
```

Master these core concepts first:

```text
motion components
initial
animate
transition
whileHover
whileTap
whileFocus
whileInView
viewport
variants
staggerChildren
delayChildren
```

Once these concepts are clear, Framer Motion becomes much easier to understand and use in real React projects.

# 34. Transition Types: `tween`, `spring`, `inertia`

These three describe **which physics/algorithm the animation runs on**.

Every `duration` and `ease` used earlier in the guide was actually part of the default `tween` type, just without explicitly stating `type`.

```text
type: "tween"    → time-based, you manually control duration/ease
type: "spring"   → physics-based, natural and bouncy feel
type: "inertia"  → momentum-based, used for drag/fling
```

Mental model:

```text
Do you know exactly how long it should take?
        ↓ Yes
      tween

Want a natural, bouncy feel, exact time doesn't matter?
        ↓ Yes
      spring

Should it keep moving with momentum after a drag is released?
        ↓ Yes
      inertia
```

---

# 35. `tween` — Time-Based Animation

`tween` is the **default** for most animatable values.

It's time-based — you manually control `duration` and `ease`. This gives predictable, fixed timing.

```jsx
<motion.div
  animate={{ x: 100 }}
  transition={{
    type: "tween",
    duration: 0.5,
    ease: "easeOut"
  }}
/>
```

## When to Use It

- When you know exactly how many seconds the animation should take.
- For predictable UI animations like fades, slides, scroll-reveals.
- When consistency matters (the exact same timing every time).

---

# 36. `spring` — Physics-Based Animation

With `spring`, you don't specify duration — instead you give physical properties (`stiffness`, `damping`), and Framer Motion calculates how long it takes based on realistic spring physics.

This gives the animation a natural, bouncy feel.

```jsx
<motion.div
  animate={{ x: 100 }}
  transition={{
    type: "spring",
    stiffness: 300,
    damping: 20
  }}
/>
```

## Key Spring Properties

```text
stiffness  → how strongly the spring pulls toward the target (default: 100)
damping    → how much oscillation/bounce is controlled (default: 10)
             lower damping = more bouncy
             higher damping = smoother / no bounce
mass       → the "weight" of the object (default: 1)
             higher mass = slower, more sluggish feel
```

## Button Example

```jsx
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  transition={{
    type: "spring",
    stiffness: 400,
    damping: 17
  }}
>
  Click me
</motion.button>
```

## `tween` vs `spring`

| Requirement | Use |
|---|---|
| Need an exact, predictable duration | `tween` |
| Want a natural, physical, bouncy feel | `spring` |
| Buttons, toggles, playful UI | `spring` |
| Scroll-reveal, fade-in sections | `tween` |

---

# 37. `inertia` — Momentum-Based Animation

`inertia` is used when you want drag/fling-like motion — for example, when the user drags an element and releases it, and it keeps moving with its own momentum before slowing to a stop (like real-world friction).

```jsx
<motion.div
  drag
  dragTransition={{
    type: "inertia",
    bounceStiffness: 300,
    bounceDamping: 20
  }}
/>
```

## Meaning

```text
bounceStiffness → how strongly it bounces back after hitting a boundary
bounceDamping   → how quickly the bounce settles down
```

`inertia` is normally used inside `dragTransition`, not `transition` — because it's specifically for controlling drag-release momentum.

---

# 38. `useScroll` — Tracking Scroll Progress

`useScroll` is a hook that converts scroll position into a value between **0 and 1** (like a progress bar). You can track scroll for the whole page or for a specific element.

```jsx
import { motion, useScroll } from "framer-motion";

function Page() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 h-2 bg-teal-500 origin-left"
    />
  );
}
```

## How It Works

`scrollYProgress` is a **motion value** (not a normal number) that automatically updates as scrolling happens:

```text
At the top of the page     → scrollYProgress = 0
At the bottom of the page  → scrollYProgress = 1
```

You can pass it directly into the `style` prop — no extra state or re-render needed.

This example creates a **scroll progress bar** that stays fixed at the top and grows in width as you scroll.

---

# 39. Tracking a Specific Element's Scroll

If instead of the whole page you want to track just one specific section (for example, when that section enters/exits the viewport):

```jsx
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";

function Section() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  return (
    <div ref={ref} className="h-screen">
      {/* scrollYProgress goes from 0 to 1 as this section passes through the viewport */}
    </div>
  );
}
```

## What `offset` Means

The `offset` array describes when tracking starts and when it ends:

```text
"start end" → the element's START touches the viewport's END (bottom)
              (the element is just entering from below)

"end start" → the element's END touches the viewport's START (top)
              (the element is exiting from the top)
```

Visually:

```text
        viewport
      ┌──────────┐
      │          │  ← "end" of viewport
      │          │
      │          │  ← "start" of viewport
      └──────────┘

offset: ["start end", "end start"]
         ↑              ↑
   element enters   element exits
```

---

# 40. `useTransform` — Mapping One Range to Another

`scrollYProgress` always gives you **0 to 1**, but you often need different ranges like `opacity: 0-1`, `scale: 0.5-1`, `x: -100 to 100`.

`useTransform` handles this conversion — it maps one range to another.

```jsx
import { motion, useScroll, useTransform } from "framer-motion";

function ParallaxSection() {
  const { scrollYProgress } = useScroll();

  // maps scrollYProgress (0 to 1) to opacity (0 to 1)
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // maps scrollYProgress (0 to 1) to a y position (-100 to 0)
  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  return (
    <motion.div style={{ opacity, y }}>
      Parallax Content
    </motion.div>
  );
}
```

## Syntax Breakdown

```jsx
useTransform(
  scrollYProgress,   // input motion value
  [0, 1],             // input range
  [-100, 0]            // output range
)
```

```text
When scrollYProgress = 0   → y = -100
When scrollYProgress = 0.5 → y = -50
When scrollYProgress = 1   → y = 0
```

---

# 41. Multi-Point Mapping

For finer control you can give multiple points, not just two.

```jsx
const opacity = useTransform(
  scrollYProgress,
  [0, 0.5, 1],
  [0, 1, 0]
);
```

This makes the element **fade in and then fade out**:

```text
scrollYProgress: 0    → opacity: 0   (invisible, start)
scrollYProgress: 0.5  → opacity: 1   (fully visible, middle)
scrollYProgress: 1    → opacity: 0   (invisible, end)
```

You can give as many points as you need for fine-grained control.

---

# 42. Drag Gestures — Basics

Enabling simple drag just needs the `drag` prop:

```jsx
<motion.div
  drag
  className="w-20 h-20 bg-teal-500 rounded-xl"
/>
```

Just adding `drag` lets the element be dragged in any direction (both x and y) with mouse or touch. If you drag it and let go, the element snaps back to its original position — that's the default behavior, animated with a spring.

## Restricting Direction

```jsx
<motion.div drag="x" />   // horizontal only
<motion.div drag="y" />   // vertical only
```

---

# 43. `dragConstraints` — Setting Drag Boundaries

Without constraints, an element can be dragged infinitely — even off-screen. To limit it:

## Using Fixed Pixel Values

```jsx
<motion.div
  drag
  dragConstraints={{
    left: -100,
    right: 100,
    top: -50,
    bottom: 50
  }}
/>
```

These values describe how far the element can move away from its original position, in each direction.

## Using a Parent Container (more common, practical pattern)

```jsx
import { useRef } from "react";
import { motion } from "framer-motion";

function DragBox() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="w-full h-64 border-2 border-teal-500">
      <motion.div
        drag
        dragConstraints={containerRef}
        className="w-16 h-16 bg-teal-500 rounded-xl"
      />
    </div>
  );
}
```

This keeps the element restricted inside the parent, no matter what size the parent is — a very common pattern in real UIs (e.g. a draggable modal that should stay within its screen).

---

# 44. `dragElastic` — Boundary Resistance

`dragElastic` controls how much "resistance/stretch" is felt when trying to cross the boundary.

```jsx
<motion.div
  drag
  dragConstraints={containerRef}
  dragElastic={0.2}
/>
```

## Value Range

```text
dragElastic: 0    → boundary is rigid, won't cross at all
dragElastic: 0.5  → some "stretch" when crossing the boundary,
                     then snaps back like a rubber band
dragElastic: 1    → a lot of stretch allowed (almost free movement
                     even past the boundary)
```

---

# 45. `whileDrag` — Visual Feedback During Drag

`whileDrag` applies a style only while the user is actively dragging the element — as soon as they let go, it returns to its normal state.

```jsx
<motion.div
  drag
  dragConstraints={containerRef}
  whileDrag={{ scale: 1.1, cursor: "grabbing" }}
/>
```

This is the same pattern as `whileHover` and `whileTap`, just triggered by dragging instead. Useful for giving the user clear feedback that the element is "picked up" — a slight scale-up, a shadow, a cursor change, etc.

---

# 46. `onDragEnd` — Reacting to Where the Drag Ended

`onDragEnd` is a callback that fires once the drag gesture finishes — useful when you want to take an action based on where (or how fast) the element was dragged.

```jsx
<motion.div
  drag
  dragConstraints={containerRef}
  onDragEnd={(event, info) => {
    console.log("Final position:", info.point.x, info.point.y);
    console.log("Velocity:", info.velocity.x, info.velocity.y);
  }}
/>
```

## The `info` Object

```text
info.point     → final x/y position of the drag
info.velocity  → how fast the element was moving when released
info.offset    → how far the element moved from its start point
```

This is especially useful for drag-based decisions — for example, a **swipe-to-delete** pattern: if `info.velocity.x` exceeds a certain threshold, delete or dismiss the item instead of snapping it back.

```jsx
onDragEnd={(event, info) => {
  if (Math.abs(info.velocity.x) > 500) {
    // treat it as a swipe — dismiss the item
  }
}}
```

---

## Quick Reference: Part 2 Cheat Sheet

```jsx
// Tween (default, time-based)
transition={{ type: "tween", duration: 0.5, ease: "easeOut" }}

// Spring (physics-based)
transition={{ type: "spring", stiffness: 300, damping: 20 }}

// Inertia (drag momentum)
dragTransition={{ type: "inertia", bounceStiffness: 300, bounceDamping: 20 }}

// Scroll progress
const { scrollYProgress } = useScroll();

// Scroll progress of a specific element
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "end start"]
});

// Map scroll progress to another range
const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);

// Drag
<motion.div
  drag
  dragConstraints={containerRef}
  dragElastic={0.2}
  whileDrag={{ scale: 1.1 }}
  onDragEnd={(event, info) => {
    console.log(info.point, info.velocity);
  }}
/>
```

---
 
# 47. `layout` — Automatic Layout Transitions
 
When an element's size or position changes because of DOM changes (an item being added/removed from a list causing a resize, or a CSS class changing), that change is normally instant and jerky. Adding the `layout` prop tells Framer Motion to automatically animate that change smoothly — without you manually calculating `initial`/`animate` values.
 
```jsx
<motion.div layout className="w-20 h-20 bg-teal-500" />
```
 
That's it. Whenever this element's size/position changes for any reason (parent resize, flex/grid reflow, a conditional className), Framer Motion automatically transitions smoothly from the old position to the new one.
 
```jsx
import { motion } from "framer-motion";
import { useState } from "react";
 
function ExpandableCard() {
  const [isExpanded, setIsExpanded] = useState(false);
 
  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className="bg-teal-500 rounded-2xl p-4 cursor-pointer"
      style={{
        width: isExpanded ? 400 : 200,
        height: isExpanded ? 300 : 100
      }}
    >
      <h2>Click to expand</h2>
      {isExpanded && <p>Extra content that shows up when expanded...</p>}
    </motion.div>
  );
}
```
 
---
 
# 48. `layoutId` — Shared Element Transitions
 
This is used when you want a "morphing" transition between two different components/elements — one element disappears and another one appears in its place, transforming smoothly from the first (not teleporting, but morphing).
 
## Classic Use Case: An Active Tab Indicator
 
```jsx
function Tabs() {
  const [activeTab, setActiveTab] = useState("home");
  const tabs = ["home", "profile", "settings"];
 
  return (
    <div className="flex gap-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className="relative px-4 py-2"
        >
          {tab}
          {activeTab === tab && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-teal-500 rounded-full -z-10"
            />
          )}
        </button>
      ))}
    </div>
  );
}
```
 
## What's Happening
 
When you change `activeTab`, the old highlighted background (`layoutId="activeTab"`) disappears from that tab, and a new element with the same `layoutId="activeTab"` appears on the new tab. Framer Motion treats them as the same element (because the `layoutId` matches) and smoothly animates/slides the gap between them — as if the background "slid" over to the new tab.
 
## Key Rule
 
Two (or more) motion components with the same `layoutId` string get an automatic morph transition between them, created by Framer Motion — even if they're in completely different places in the DOM.
 
---
 
# 49. `LayoutGroup` — Coordinating Multiple Layout Animations
 
When you have multiple separate components each running their own layout animation, and you want their layout measurements to happen together, synchronized (so they don't incorrectly trigger each other), use `LayoutGroup`:
 
```jsx
import { LayoutGroup, motion } from "framer-motion";
 
function App() {
  return (
    <LayoutGroup>
      <Card1 />
      <Card2 />
    </LayoutGroup>
  );
}
```
 
This is an advanced use case — most simple scenarios don't need it, only when multiple independent layout animations are interacting/conflicting with each other.
 
---
 
## Quick Reference: Part 2 Cheat Sheet
 
```jsx
// Tween (default, time-based)
transition={{ type: "tween", duration: 0.5, ease: "easeOut" }}
 
// Spring (physics-based)
transition={{ type: "spring", stiffness: 300, damping: 20 }}
 
// Inertia (drag momentum)
dragTransition={{ type: "inertia", bounceStiffness: 300, bounceDamping: 20 }}
 
// Scroll progress
const { scrollYProgress } = useScroll();
 
// Scroll progress of a specific element
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "end start"]
});
 
// Map scroll progress to another range
const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);
 
// Drag
<motion.div
  drag
  dragConstraints={containerRef}
  dragElastic={0.2}
  whileDrag={{ scale: 1.1 }}
  onDragEnd={(event, info) => {
    console.log(info.point, info.velocity);
  }}
/>
 
// Automatic layout transition
<motion.div layout />
 
// Shared element transition
<motion.div layoutId="activeTab" />
 
// Coordinating multiple layout animations
<LayoutGroup>
  <Card1 />
  <Card2 />
</LayoutGroup>
```
 
---
# 50. GPU-Accelerated Properties — Fast vs. Slow Animations
 
The browser renders some CSS properties on the **GPU** (very fast, smooth), and others on the **CPU / main thread** (slower, can cause jank — especially on mobile).
 
## Fast (GPU-accelerated) — prefer these
 
```text
transform  → includes x, y, scale, rotate
opacity
```
 
## Slow (layout-triggering) — avoid animating these where possible
 
```text
width, height
top, left, right, bottom
margin, padding
```
 
## Why It Matters
 
When properties like `width`, `height`, `top`, `left` change, the browser has to recalculate the layout of the entire page (a "reflow") — this is expensive. `transform` and `opacity`, on the other hand, only operate on a compositing layer and don't touch layout — the GPU handles them, which is much smoother.
 
## Practical Example
 
```jsx
// SLOW — avoid animating width/height directly
<motion.div animate={{ width: 300, height: 200 }} />
 
// FAST — use scale instead, when possible
<motion.div animate={{ scale: 1.5 }} />
```
 
If you genuinely need to change `width`/`height` (like an expandable card where the actual content size changes), use the `layout` prop (covered in section 47) — Framer Motion optimizes this internally using the FLIP technique, which performs better than animating width/height directly.
 
---
 
# 51. `useReducedMotion` — Respecting Accessibility Preferences
 
Some users enable "Reduce Motion" in their OS settings (due to motion sensitivity, vestibular disorders, or to save battery). Framer Motion provides a hook to detect this:
 
```jsx
import { motion, useReducedMotion } from "framer-motion";
 
function Card() {
  const shouldReduceMotion = useReducedMotion();
 
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0.1 : 0.6 }}
    >
      Content
    </motion.div>
  );
}
```
 
## Logic
 
If the user has reduce motion turned on, minimize or skip the animation (just an opacity fade, no movement) — for respectful UX. This is expected in production-quality apps, especially anything meant for real-world/professional use.
 
---
 
# 52. `will-change` — Advanced Optimization Hint
 
The CSS property `will-change: transform` tells the browser in advance that an element is about to animate, so the browser can prepare a GPU layer ahead of time.
 
Framer Motion applies this automatically when you use `motion` components — you don't need to add it manually in most cases. Only consider it manually when working with custom CSS animations outside of Framer Motion.
 
---
 
# 53. `exit` — Defining an Exit Animation
 
The `exit` prop defines how an element should animate **out** when it's removed from the DOM.
 
```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
  Content
</motion.div>
```
 
## Important Requirement
 
By default, React removes elements from the DOM instantly — there's no time for an exit animation to play. `exit` only works when the element is wrapped inside `AnimatePresence` (see the next section), because `AnimatePresence` is what delays the actual DOM removal until the exit animation finishes.
 
```jsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
```
 
This means:
 
```text
initial → element appears from below, invisible
animate → element becomes fully visible, in place
exit    → element fades out and moves upward, right before removal
```
 
---
 
# 54. `AnimatePresence` — Animating Elements on Removal
 
`AnimatePresence` is a wrapper component that enables exit animations. Without it, an element with an `exit` prop simply disappears instantly — React removes it from the DOM before Framer Motion gets a chance to animate it out.
 
```jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
 
function Modal() {
  const [isOpen, setIsOpen] = useState(false);
 
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50"
        >
          <div className="bg-white rounded-xl p-6">
            Modal Content
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```
 
## How It Works
 
```text
isOpen becomes false
        ↓
Instead of removing the element immediately,
AnimatePresence detects the exit prop
        ↓
Plays the exit animation
        ↓
Only after the exit animation finishes,
the element is actually removed from the DOM
```
 
## Key Requirements
 
- The element that should animate out needs an `exit` prop.
- That element must be a **direct child** of `AnimatePresence`.
- The element must be conditionally rendered (e.g. `{isOpen && <motion.div ... />}`), not just hidden with CSS.
## Common Use Cases
 
- Modals and dialogs opening/closing.
- Toast notifications appearing and disappearing.
- Items being removed from a list.
- Route/page transitions.
- Dropdown menus and tooltips.
## List Example (Items Animating Out)
 
```jsx
<AnimatePresence>
  {items.map((item) => (
    <motion.li
      key={item.id}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
    >
      {item.text}
    </motion.li>
  ))}
</AnimatePresence>
```
 
Each item needs a stable, unique `key` — this is how `AnimatePresence` knows which specific item was removed, so it can play that item's exit animation instead of just re-rendering the whole list.
 
---
 
# 55. `useMotionValue` — Values Outside React's Render Cycle
 
Normally in React, updating a value (with `useState`) causes a re-render. For animations that update very frequently (like tracking mouse position, or a drag position), triggering a full React re-render on every update would be wasteful and slow.
 
`useMotionValue` creates a value that Framer Motion can update directly, without causing a React re-render.
 
```jsx
import { motion, useMotionValue } from "framer-motion";
 
function DraggableCard() {
  const x = useMotionValue(0);
 
  return (
    <motion.div
      drag="x"
      style={{ x }}
      className="w-20 h-20 bg-teal-500 rounded-xl"
    />
  );
}
```
 
## Reading a Motion Value
 
Motion values aren't plain numbers — to read the current value (for example, inside an event handler), use `.get()`:
 
```jsx
function DraggableCard() {
  const x = useMotionValue(0);
 
  const handleDragEnd = () => {
    console.log("Current x:", x.get());
  };
 
  return (
    <motion.div
      drag="x"
      style={{ x }}
      onDragEnd={handleDragEnd}
    />
  );
}
```
 
## Listening to Changes
 
You can subscribe to a motion value's changes with `.on("change", ...)`:
 
```jsx
import { useEffect } from "react";
 
useEffect(() => {
  const unsubscribe = x.on("change", (latest) => {
    console.log("x changed to:", latest);
  });
 
  return () => unsubscribe();
}, [x]);
```
 
## Why Not Just `useState`?
 
```text
useState        → triggers a React re-render on every update
                   (fine for occasional changes, e.g. modal open/close)
 
useMotionValue  → updates outside React's render cycle
                   (needed for high-frequency changes, e.g. scroll
                   position, drag position, cursor tracking)
```
 
`useMotionValue` is also the foundation that `useScroll` and `useTransform` are built on — `scrollYProgress` from section 38 is itself a motion value.
 
---
 
# 56. `useSpring` — Smoothing a Motion Value
 
`useSpring` takes a motion value (or a plain number) and smooths its changes using spring physics — useful for things like a custom smooth cursor follower, or smoothing out a jittery scroll-linked value.
 
```jsx
import { motion, useMotionValue, useSpring } from "framer-motion";
 
function SmoothCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
 
  const smoothX = useSpring(cursorX, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(cursorY, { stiffness: 300, damping: 30 });
 
  const handleMouseMove = (event) => {
    cursorX.set(event.clientX);
    cursorY.set(event.clientY);
  };
 
  return (
    <div onMouseMove={handleMouseMove} className="w-full h-screen">
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="w-6 h-6 bg-teal-500 rounded-full fixed pointer-events-none"
      />
    </div>
  );
}
```
 
## What's Happening
 
```text
cursorX / cursorY → update instantly on every mouse move (raw, jittery)
smoothX / smoothY → follow cursorX/cursorY, but "catch up" smoothly
                     using spring physics, instead of snapping instantly
```
 
This gives a natural "lag behind and settle" feel, commonly used for custom cursors, drag handles, and parallax effects.
 
---
 
# 57. Real Project Checklist
 
A practical checklist to apply when building a landing page or feature section in a real project:
 
- **Entrance animations** — use `opacity` + `y`/`scale` (transform-based); avoid animating `width`/`height` directly.
- **Scroll-triggered reveals** — use `whileInView` with `viewport={{ once: true }}` to avoid repeated triggers, for both correctness and performance.
- **Stagger for lists/grids** — use `staggerChildren` for feature cards, testimonials, pricing cards, etc.
- **Hover/tap feedback** — use spring transitions for a natural, "alive" feel.
- **Page/modal transitions** — use `AnimatePresence` for route changes or modal open/close.
- **Accessibility** — check `useReducedMotion` for critical or lengthy animations.
- **Avoid over-animating** — not everything needs to animate. Only animate what directs the user's attention or gives feedback; too many animations distract and hurt perceived performance.
---
 
## Quick Reference: Part 2 Cheat Sheet
 
```jsx
// Tween (default, time-based)
transition={{ type: "tween", duration: 0.5, ease: "easeOut" }}
 
// Spring (physics-based)
transition={{ type: "spring", stiffness: 300, damping: 20 }}
 
// Inertia (drag momentum)
dragTransition={{ type: "inertia", bounceStiffness: 300, bounceDamping: 20 }}
 
// Scroll progress
const { scrollYProgress } = useScroll();
 
// Scroll progress of a specific element
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "end start"]
});
 
// Map scroll progress to another range
const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);
 
// Drag
<motion.div
  drag
  dragConstraints={containerRef}
  dragElastic={0.2}
  whileDrag={{ scale: 1.1 }}
  onDragEnd={(event, info) => {
    console.log(info.point, info.velocity);
  }}
/>
 
// Automatic layout transition
<motion.div layout />
 
// Shared element transition
<motion.div layoutId="activeTab" />
 
// Coordinating multiple layout animations
<LayoutGroup>
  <Card1 />
  <Card2 />
</LayoutGroup>
 
// Reduced motion check
const shouldReduceMotion = useReducedMotion();
 
// Exit animation (needs AnimatePresence)
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>
 
// Motion value outside React's render cycle
const x = useMotionValue(0);
<motion.div drag="x" style={{ x }} />
 
// Smoothing a motion value with spring physics
const smoothX = useSpring(x, { stiffness: 300, damping: 30 });
```
 
---
 
## Where This Fits in the Learning Order
 
```text
Phase 1: Basics           → motion components, initial, animate, transition
Phase 2: Interactions      → whileHover, whileTap, whileFocus
Phase 3: Coordination      → whileInView, viewport, variants, staggerChildren
Phase 4: Gestures/Scroll   → tween/spring/inertia, useScroll, useTransform,
                              drag, whileDrag, onDragEnd
Phase 5: Layout            → layout, layoutId, LayoutGroup
Phase 6: Performance/Real  → GPU-safe properties, useReducedMotion,
          Project           will-change, exit, AnimatePresence,
                             useMotionValue, useSpring  ← (this doc)
```
 