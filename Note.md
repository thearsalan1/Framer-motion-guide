LEARNING FRAMER MOTIONS

INSTALLATION
npm i framer-motion

IMPORT 
import {motion} from 'framer-motion';

MOTION COMPONENTS
Normal react elements are not animatable. Framer motion provides a motion element crossponds to all the react elements.

// Normal div - can't animate
<div className="card">Hello</div>

// Motion div - can animate
<motion.div className="card">Hello</motion.div

HOW IT WORKS?
motion.div is a normal element but motion provide special animations props like initial, animate, whileHover etc. other things works same as normal

INITIAL PROP
<motion.div 
  initial={{opacity:0,y:50}}
>
  Hello
</motion.div>
<!-- Here opacity 0 (invisible) and Y:50 (50px down) -->

ANIMATE PROP
<motion.div 
  initial={{opacity:0,y:50}}
  animate={{opacity:1,y:0}}
>
  Hello
</motion.div>
<!-- Using this, elements comes on it original place after  fade in-->

COMMON ANIMATEABLE PROPS
opacity — 0 se 1
x, y — position shift (pixels ya %)
scale — size (1 = normal, 0.5 = half, 1.2 = big)
rotate - in degrees
backgroundColor, color — calors can also animamte

TRANSITION
This controlles speed and styles
<motion.div
   initial={{opacity:0,y:50}}
  animate={{opacity:1,y:0}}
  transition={{duration:0.6,delay:0.2ease:"easeOut"}}
>
Hello
</motion.div>
duration- in how many seconds
delay - after how many sec animation starts
ease - motion curve: "easeIn","easeOut","linear"

function Card() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="p-6 bg-white rounded-xl shadow-md"
    >
      <h2>Feature Card</h2>
      <p>Ye card fade-in aur slide-up ke saath page load pe dikhega</p>
    </motion.div>
  );
}

import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="h-screen w-screen flex items-center flex-col gap-10 justify-evenly">
      <motion.h1
        className="text-7xl font-semibold text-teal-500"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
      >
        Connect to your campus
      </motion.h1>
      <div className="flex items-center justify-center flex-col gap-2">
        <motion.p
          className="text-2xl font-sans text-teal-400"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          College verified social platform for students
        </motion.p>
        <motion.button
          className="px-3 py-2 text-xl bg-teal-500 hover:bg-teal-400 cursor-pointer"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          Get Started
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;

while in view 
this helps when we scroll down and section comes in viewport the this start visible 
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Feature Card
</motion.div>

this whileInView prop triggers everytime when element comes in viewport to control this there is a prop named "viewport" this helps in controlling the whileInView

<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true, amount: 0.3 }}
>
  Feature Card
</motion.div>
once: true - Animation work only once at the first time then stop
amount:0.3- how much amount of element visble to start the anumation 

function FeatureCard({ title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="p-6 rounded-xl bg-white shadow-md"
    >
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </motion.div>
  );
}

VARIANTS
when multiple elements share same animation or there is parent child relationship, then we use variants

const boxVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

Basically variant is a named object in which different states are defined

function Box() {
  return (
    <motion.div
      variants={boxVariants}
      initial="hidden"
      animate="visible"
    >
      Hello
    </motion.div>
  );
}

STAGGERCHILDREN parent-child orchestration
when we have multiple childern and want to animate them one by one using delay.Without writing delay in each children manually

LOGIC - In parent define stagger children and chilren will "inherit" there variants automatically

const containerVariants={
  hidden:{},
  visible:{
    transition:{
      staggerChildren:0.2 {each child will have o.2 delay gaps}
    }
  }
}

const itemVariants = {
  hidden:{opacity:0,y:30},
  visible:{opacity:1,y:0}
}

function List() {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.li variants={itemVariants}>Item 1</motion.li>
      <motion.li variants={itemVariants}>Item 2</motion.li>
      <motion.li variants={itemVariants}>Item 3</motion.li>
    </motion.ul>
  );
}

important note - Sirf parents need initial/animate strings childrens only take varient prop initial/animate they get automatically from there parents "propagate"

DELAYCHILDREN
Delay before starting of first children
visible: {
  transition: {
    staggerChildren: 0.2,
    delayChildren: 0.3 // first delay with 0.3 sec after that all with 0.2 sec
  }
}