import * as React from "react";
import { observer } from "mobx-react";
import ReactMobxMusic from "react-mobx-music";
import { Scale } from "./Scale";
import { InputForm } from "./InputForm";
import Spinner from "react-spinkit";
import { FaPlay } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

const ScaleRow = observer(({ children }) => {
  return <div>{children}</div>;
});

const LoadingInstrument = ({ name = "" }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    }}
  >
    <h3 className="subtitle">Loading instrument {name}</h3>
    <Spinner name={"ball-grid-pulse"} />
  </div>
);

export const LoadedInstrument = observer(
  ({ instruments, scale, note, name, playingNotes, getStateToBubbleUp }) => {
    return (
      <div>
        <Scale
          instrument={instruments.get(name)}
          name={scale}
          note={note}
          octave={2}
          count={5}
          playingNotes={playingNotes}
          ScaleRow={ScaleRow}
          getStateToBubbleUp={getStateToBubbleUp}
        />
      </div>
    );
  }
);

export class MusicPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instrument: "acoustic_grand_piano",
      scale: "minor",
      note: "C",
      time: 0,
      stop: false,
    };
    this.do_timeout = this.do_timeout.bind(this);
  }

  onHandleChange(state) {
    this.setState(state);
  }

  getStateToBubbleUp(note, instrument, time) {
    this.setState({ time });
    this.props.getStateToBubbleUp(
      note,
      instrument,
      this.state.instrument,
      time
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.getStateToBubbleUp != nextProps.getStateToBubbleUp ||
      this.state.time != nextState.time ||
      this.state.stop != nextState.stop
    ) {
      return false;
    }
    return true;
  }

  playMusic(note) {
    const instrument = note.instrument;
    instrument.play(note.note, {
      duration: 1000,
    });
    setTimeout(() => {
      instrument.stop(note.note, {
        duration: 1000,
      });
    }, 1000);
  }

  // assume this is inside an async function

  async doAsync() {
    if (this.state.stop) {
      this.setState({ stop: false });
    }
    this.do_timeout(this.props.song, this.playMusic, this.state.time, 0, this);
  }

  do_timeout(items = [], callback = () => {}, delay = 50, index = 0, context) {
    if (index < items.length) {
      window.setTimeout(function () {
        callback(items[index]);
        if (context.state.stop) {
          return;
        }
        context.do_timeout(items, callback, delay, ++index, context);
      }, delay);
    }
  }

  resetMusic = () => {
    if (!this.state.stop) {
      this.setState({ stop: true });
    }
    this.props.resetMusic();
  };

  render() {
    return (
      <div className="container">
        <ReactMobxMusic instrumentNames={[this.state.instrument]}>
          {({ isLoading, instruments, playingNotes }) =>
            isLoading ? (
              <LoadingInstrument name={this.state.instrument} />
            ) : (
              <div>
                <LoadedInstrument
                  instruments={instruments}
                  playingNotes={playingNotes}
                  name={this.state.instrument}
                  scale={this.state.scale}
                  note={this.state.note}
                  getStateToBubbleUp={this.getStateToBubbleUp.bind(this)}
                />
              </div>
            )
          }
        </ReactMobxMusic>
        <InputForm
          state={this.state}
          setState={this.onHandleChange.bind(this)}
        />
        <div className="container d-flex justify-content-end my-2">
          <button
            onClick={this.doAsync.bind(this)}
            className="btn ch-btn-primary mr-3"
          >
            <FaPlay />
          </button>
          <button onClick={this.resetMusic} className="btn ch-btn-warning">
            <GrPowerReset />
          </button>
        </div>
      </div>
    );
  }
}

export default MusicPlayer;
