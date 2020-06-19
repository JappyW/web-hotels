import * as React from "react";
import ReactKeyMaster from "react-keymaster";
import { observer } from "mobx-react";

export const defaultRenderNote = ({
  instrument,
  noteName,
  bindTo,
  isPlaying
}) => (
  <div
    onMouseDown={() => {
      if ("touchstart" in window) return;
      instrument.play(noteName, { gain: 10 });
    }}
    onMouseUp={() => {
      instrument.stop(noteName);
    }}
    onMouseLeave={() => {
      instrument.stop(noteName);
    }}
    onTouchStart={() => {
      instrument.play(noteName, { gain: 10 });
    }}
    onTouchEnd={() => {
      instrument.stop(noteName);
    }}
    style={{
      margin: 10,
      width: 100,
      height: 100,
      borderRadius: "50%"
    }}
    className={`button ${isPlaying ? "is-primary" : ""}`}
  >
    {bindTo} {noteName}
  </div>
);
var noteStart, noteEnd, notePresesed = false;
export const Note = observer(
  ({
    instrument,
    getStateToBubbleUp,
    name,
    bindTo = "",
    renderNote = defaultRenderNote,
    isPlaying = false,
  }) => {
    // return null;
    return (
      <React.Fragment>
        {bindTo && (
          <ReactKeyMaster
            keyName={bindTo}
            onKeyDown={() => {
              instrument.play(name, { gain: 10 });
            }}
            onKeyUp={() => {
              if(!notePresesed) { 
                noteStart = Date.now();
              } else {
                noteEnd = Date.now();
                getStateToBubbleUp(name, instrument, noteEnd - noteStart)
                noteStart = noteEnd;
              }
              notePresesed = true;
              instrument.stop(name);
            }}
          />
        )}
        {renderNote({ instrument, noteName: name, bindTo, isPlaying })}
      </React.Fragment>
    );
  }
);
