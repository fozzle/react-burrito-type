// @flow
import React from 'react';
import Transition from 'react-transition-group/Transition';

type Props = {
  duration: number
};

const defaultStyle = {
  display: 'inline-block',
  transition: 'transform 0.3s ease-in'
};

const transitionStyles = {
  entering: {
    transform: 'scale(1.4, 1.4) translate(0, 8px)',
  },
  entered: {
    transform: 'scale(1, 1) translate(0, 0)',
  }
};

const BurritoTransition = ({ in: inProp, children }) => (
  <Transition in={inProp} timeout={0}>
    {(state) => {
      if (state === 'exited') return null;
      return (
        <div style={{
          ...defaultStyle,
          ...transitionStyles[state],
        }}>
          {children}
        </div>
      );
    }}
  </Transition>
);

export default BurritoTransition;
