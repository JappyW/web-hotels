import React from "react";
import * as helpers from "../../helpers";
import PropTypes from 'prop-types';

export default function CardWithFiles(props) {
    const {label, files} = props;
    return (
        <div className="card mt-3 mx-auto">
            <div className="card-header">
                <h4>{label}</h4>
            </div>
            <ul className="list-group list-group-flush">
                {helpers.getListOfFiles(files)}
            </ul>
            
        </div>
    )
}

CardWithFiles.propTypes = {
    label: PropTypes.string,
    files: PropTypes.array
}