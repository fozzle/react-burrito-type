// @flow
import * as React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

type Props = {
  text: string,
  verticalAmp: number,
  horizontalAmp: number,
  rotationAmp: number,
  verticalFreq: number,
  horizontalFreq: number,
  rotationFreq: number,
};

type State = {
  frame: number,
};

const FRAME_INCR = 0.08
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
        <span key={i} style={{
          display: 'inline-block',
        }}>
          <span style={{
            transform: `translate(${x}px, ${y}px) rotateZ(${rot}deg)`,
            display: 'inline-block',
          }}>
            {letter}
          </span>
        </span>
      );
    });

    return (
      <span style={{ whiteSpace: 'pre-wrap', fontFamily: 'Helvetica, sans-serif' }}>
        <ReactCSSTransitionGroup
          transitionName="fly"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {letters}
        </ReactCSSTransitionGroup>
      </span>
    );
  }
}
