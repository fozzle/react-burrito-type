// @flow
import * as React from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import BurritoLetter from './BurritoLetter';


type Props = {
  text: string,
  verticalAmp: number,
  horizontalAmp: number,
  rotationAmp: number,
  verticalFreq: number,
  horizontalFreq: number,
  rotationFreq: number,
  style: mixed,
};

type State = {
  frame: number,
};

const FRAME_INCR = 1/30;
export default class BurritoType extends React.Component<Props, State> {
  animationFrame: Function;

  static defaultProps = {
    verticalAmp: 1,
    verticalFreq: 1/8,
    rotationAmp: 2,
    rotationFreq: 1/8,
    horizontalAmp: 1,
    horizontalFreq: 1/4,
    text: '',
    style: {},
  };

  constructor(props: Props) {
    super(props);

    this.animationFrame = this.animationFrame.bind(this);

    this.state = {
      frame: 0,
    };
  }

  componentDidMount() {
    requestAnimationFrame(this.animationFrame);
  }

  animationFrame() {
    this.setState({ frame: this.state.frame + FRAME_INCR });
    requestAnimationFrame(this.animationFrame);
  }

  render() {
    const {
      horizontalAmp,
      verticalAmp,
      rotationAmp,
      verticalFreq,
      horizontalFreq,
      rotationFreq,
    } = this.props;

    const letters = this.props.text.split('').map((letter, i) => {
      const y = Math.sin(this.state.frame + (i * Math.PI * verticalFreq)) * verticalAmp;
      const x = Math.sin(this.state.frame + (i * Math.PI * horizontalFreq)) * horizontalAmp;
      const rot = Math.cos(this.state.frame + (i * Math.PI * rotationFreq)) * rotationAmp;
      return (
        <BurritoLetter key={i} x={x} y={y} rot={rot}>
          {letter}
        </BurritoLetter>
      );
    });

    const containerStyles = Object.assign(
      {},
      {
        whiteSpace: 'pre-wrap',
        fontFamily: 'Helvetica, sans-serif',
      },
      this.props.style
    );

    return (
      <span style={containerStyles}>
        <TransitionGroup>
          {letters}
        </TransitionGroup>
      </span>
    );
  }
}
