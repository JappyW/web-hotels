import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './studioManagement.scss';
import CreateStudio from '../../containers/CreateStudio';
import Button from '../reusableComponents/Button';
import OwnerStudiosList from './OwnerStudiosList/OwnerStudiosList.jsx';
import StudioManagementNav from './StudioManagementNav.jsx';
import { STUDIO_MANAGEMENT_SUBPAGE, UNKNOWN_STUDIO } from '../../constants/appCommonConsts';
import ManageStudioRooms from '../../containers/ManageStudioRooms';
import { CREATE_STUDIO_MESSAGES } from '../../constants/messages';
import UploadMultiPhotos from "../../containers/UploadMultiPhotos";

const {
    DEFAULT: SUBPAGE_DEFAULT,
    CREATE_STUDIO: SUBPAGE_CREATE_STUDIO,
    ROOMS: SUBPAGE_ROOMS,
    PHOTOS: SUBPAGE_PHOTOS,
} = STUDIO_MANAGEMENT_SUBPAGE;

class StudioManagement extends Component {
    static propTypes = {
        studioManagementSubPage: PropTypes.string,
        selectedStudio: PropTypes.object,
        userId: PropTypes.number,
        changeStudioManagementSubPage: PropTypes.func,
        requestGetListOwnerStudios: PropTypes.func,
        ownerStudios: PropTypes.array
    }

    static defaultProps = {
        ownerStudios: []
    }

    constructor(props) {
        super(props);
        this.state = {
            subPage: SUBPAGE_DEFAULT,
            ownerStudios: [],
            selectedStudioId: 0
        }
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            ownerStudios: nextProps.ownerStudios
        };
    }

    componentDidMount = () => {
        this.getListOwnerStudios()
    }

    setSubPage = (subPage, selectedStudioId) => {
        this.props.changeStudioManagementSubPage({ subPage });
        this.setState({ subPage: subPage, selectedStudioId: selectedStudioId });
        this.getListOwnerStudios();
    }

    onLeaveSubPage = () => {
        this.setSubPage(SUBPAGE_DEFAULT);
    }

    handleManageStudioClick = ({ subPage, selectedStudioId }) => {
        this.setSubPage(subPage, selectedStudioId)
    }

    getListOwnerStudios = () => {
        this.props.requestGetListOwnerStudios(this.props.userId);
    }

    renderSubPage = () => {
        const newSubPage = this.state.subPage;
        switch (newSubPage) {
            case SUBPAGE_CREATE_STUDIO: return (
                <CreateStudio
                    onLeaveCreateStudio={this.onLeaveSubPage}
                    userId={this.props.userId}>
                </CreateStudio>
            );
            case SUBPAGE_ROOMS: return (
                <ManageStudioRooms
                    onLeaveManageStudioRooms={this.onLeaveSubPage}
                    selectedStudioId={this.state.selectedStudioId}>
                </ManageStudioRooms>
            );

            case SUBPAGE_PHOTOS: return (
                <UploadMultiPhotos
                    onLeaveUploadMultiPhotos={this.onLeaveSubPage}
                    selectedStudioId={this.state.selectedStudioId}>
                </UploadMultiPhotos>
            );
            default: return (
                <>
                    <div className="row">
                        <div className="col-3 m-0">
                            <Button
                                type='button'
                                label={CREATE_STUDIO_MESSAGES.CREATE_STUDIO}
                                className='btn ch-btn-main-success create-studio-button m-0'
                                handleClick={() => this.setSubPage(SUBPAGE_CREATE_STUDIO)}
                            />
                        </div>
                    </div>
                    <OwnerStudiosList
                        onClick={this.handleManageStudioClick}
                        ownerStudios={this.state.ownerStudios}>
                    </OwnerStudiosList>
                </>
            );
        }
    }

    renderNav = () => {
        const { selectedStudio = UNKNOWN_STUDIO } = this.state;
        const subPathName = selectedStudio.name !== '' ? `${selectedStudio.name}: ${this.state.subPage}` : this.state.subPage;
        return (
            <StudioManagementNav
                subPathName={subPathName}
                onClick={() => this.setSubPage(SUBPAGE_DEFAULT)}>
            </StudioManagementNav>
        );
    }

    render() {
        return (
            <div className="container">
                {this.renderNav()}
                {this.renderSubPage()}
            </div>
        )
    }
}

export default StudioManagement;


