import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StudioManagementNav extends Component {
    static propTypes = {
        onClick: PropTypes.func,
        subPathName: PropTypes.string,
    }

    constructor (props) {
        super(props);
    }

    render() {
        return (
            <>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="#" onClick={()=>this.props.onClick()}>Studios list</a>
                        </li>
                        {this.props.subPathName && (
                            <li className="breadcrumb-item active" aria-current="page">
                                {this.props.subPathName}
                            </li>)
                        }
                    </ol>
                </nav>
            </>
        )
    }
}

export default StudioManagementNav;
