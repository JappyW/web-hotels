import * as React from "react";
import { transpose, scale } from "tonal";
import { observer } from "mobx-react";
import { Note, NoteProps } from "./Note";
import { getKeyBindingFromIndex } from "./utils";

export const Scale = observer(
  ({
    instrument,
    getStateToBubbleUp,
    playingNotes = new Map(),
    name = "minor",
    note = "C",
    octave = 3,
    count = 2,
    renderNote,
    ScaleRow = React.Fragment
  }) => {
    const getScaleNotes = () => {
      let scaleNotes = [];
      if (!scale(name)) return [];
      for (let i = 0; i < count; i += 1) {
        const currentOctaveNotes = scale(name).map(
          transpose(`${note}${octave + i}`)
        );
        scaleNotes = [...scaleNotes, ...currentOctaveNotes];
      }
      return scaleNotes;
    };

    return (
      <ScaleRow>
        {getScaleNotes().map((noteName, i) => (
          <Note
            name={noteName}
            key={noteName}
            instrument={instrument}
            bindTo={getKeyBindingFromIndex(i)}
            renderNote={renderNote}
            isPlaying={playingNotes.has(noteName)}
            getStateToBubbleUp={getStateToBubbleUp}
          />
        ))}
      </ScaleRow>
    );
  }
);
