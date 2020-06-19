import React from "react";
import PropTypes from "prop-types";
//import Button from "../reusableComponents/Button";


export class Comforts extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
       const id = 1;
        this.props.requestGetComforts(id);
    }

    render() {
        return (
            this.props.rooms && (
            <div className="col-6">
                {this.props.rooms.map(index =>
                    <ul className="list-group " key={index.id}>
                        <li className="list-group-item">
                            Room number - {room.roomNumber}
                            <span className="">
                                <button type="button" className="btn btn-primary mx-5">Add comfort</button>
                            </span>
                        </li>
                        {room.room_comforts.map(comforts =>
                            <ul className="list-group" key={comforts.id}>
                                <li className="list-group-item">
                                    {(comforts.comfort === null )
                                     ? "No comforts"
                                     :  comforts.comfort.name }
                                    <button type="button" className="btn btn-danger mx-5"
                                            onClick={() => this.props.requestDeleteComforts(comforts.room_id,comforts.comfort_id)}>
                                        Delete
                                    </button>
                                 </li>
                            </ul>
                        )}
                    </ul>
                )}
            </div>
        )
        );
    }
}


Comforts.propTypes = {
    comforts: PropTypes.array,
};

