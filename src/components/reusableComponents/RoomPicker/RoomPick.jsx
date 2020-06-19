import React from "react";
import { Field } from "redux-form";
import PropTypes from 'prop-types';


export const RoomPick = props => {
  const { roomTypes, name, label } = props;
  return (
    <div>
      <label className="form-label">{label}</label>
      <Field name={name} component="select" className="form-control">
        {roomTypes.map(type => (
          <option key={type.id} id={type.id} value={type.name}>
            {type.name}
          </option>
        ))}
      </Field>
    </div>
  );
};

RoomPick.propTypes = {
  roomTypes: PropTypes.array, 
  name: PropTypes.string, 
  label: PropTypes.string,
}