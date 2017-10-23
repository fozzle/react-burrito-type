// @flow
import React from 'react';
import BurritoTransition from './BurritoTransition';

type Props = {
  x: number,
  y: number,
  rot: number,
  in: boolean,
};

export default class BurritoLetter extends React.Component<Props> {
  render() {
    const { x, y, rot, children } = this.props;
    return (
      <BurritoTransition in={this.props.in}>
        <span style={{
          transform: `translate(${x}px, ${y}px) rotateZ(${rot}deg)`,
          display: 'inline-block',
        }}>
          {children}
        </span>
      </BurritoTransition>
    );
  }
};
