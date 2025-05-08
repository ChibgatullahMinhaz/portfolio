import { Typewriter } from 'react-simple-typewriter';

export const TypingEffect = () => (
  <h1>
    I'm{' '}
    <span style={{ color: 'orange' }}>
      <Typewriter
        words={['Web Developer', 'Front End Developer', 'Web Designer', 'MERN Stack Developer','Full Stack Developer', 'React Developer']}
        loop={-1}
        cursor
        cursorStyle="_"
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1000}
      />
    </span>
  </h1>
);
