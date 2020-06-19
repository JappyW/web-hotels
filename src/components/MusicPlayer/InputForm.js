import * as React from "react";
import { getInstrumentNames } from "mobx-music";
import { Scale as S, Note as N } from "tonal";
import AutoComplete from "./AutoComplete";
export class InputForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <AutoComplete
          label="Note : "
          initial={this.props.state.note}
          items={N.names()}
          onChange={(name) => {
            this.props.setState({ note: name });
          }}
        />
        <AutoComplete
          label="Scale : "
          initial={this.props.state.scale}
          items={S.names()}
          onChange={(name) => {
            this.props.setState({ scale: name });
          }}
        />
        <AutoComplete
          label="Instrument : "
          initial={this.props.state.instrument}
          items={getInstrumentNames()}
          onChange={(name) => {
            this.props.setState({ instrument: name });
          }}
        />
      </React.Fragment>
    );
  }
}
export default InputForm