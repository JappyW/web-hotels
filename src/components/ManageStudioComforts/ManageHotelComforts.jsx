import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './manageStudioComforts.scss';
import Button from '../reusableComponents/Button';
import { MODAL_BUTTON } from '../../constants/buttons';

class ManageStudioComforts extends Component {
    static propTypes = {
        onLeaveManageComforts: PropTypes.func,
        selectedStudio: PropTypes.object,
        userId: PropTypes.number,
        selectedRoomId: PropTypes.number,
        selectedRoomComforts: PropTypes.any
    }

    constructor (props) {
        super(props);
    }

    onLeaveManageComforts = () => {
        this.props.onLeaveManageComforts();
    }

    render() {
        return (
            <div className="container">

                <h5>Manage studio comforts</h5>

                <div className="col-3 offset-2">
                    <Button
                        name={MODAL_BUTTON.OK}
                        type='button'
                        label={MODAL_BUTTON.OK}
                        className='btn btn-main-success text-white'
                        handleClick={this.onLeaveManageComforts}
                    />
                </div>
            </div>
        )
    }
}

export default ManageStudioComforts;
