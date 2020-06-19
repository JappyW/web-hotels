import React from "react";
import PropTypes from "prop-types";
import Pagination from "react-js-pagination";
import Select from 'react-select';
import Button from "../reusableComponents/Button";

const options = [
    { value:"", label: "All"},
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
];

export default class FeedbackSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            selectedOption: null,
        };
    }

    handleChange = selectedOption => {
        this.setState(
            { selectedOption,
                    activePage: 1}, () => {
                    const id = this.props.studioId;
                    this.props.requestGetFeedbackByStudioId(id, this.state.activePage, selectedOption.value);
            }
        );
    };


    handlePageChange(pageNumber,selectedOption) {
        this.setState({activePage: pageNumber});
        const id = this.props.studioId;
        this.props.requestGetFeedbackByStudioId(id, pageNumber,selectedOption);
    }

    closeModal() {
        this.props.onRequestClose();
    }

    componentDidMount() {
        const id = this.props.studioId;
        this.props.requestGetFeedbackByStudioId(id, this.state.activePage);
    }

    render() {
        const { selectedOption } = this.state;
        return (
            <>
                {this.props.feedback?
                (<div>
                    <Button
                        name="close"
                        type="button"
                        className="ch-btn-black w-100"
                        handleClick={() => this.closeModal()}
                        label={'CLOSE'}
                    />
                    <Select
                        value={selectedOption}
                        onChange={this.handleChange.bind(this)}
                        options={options}
                    />
                    <div className="list-group mt-4">
                        {this.props.feedback.map(comment =>
                            <div className="list-group-item" key={comment.id}>
                                <small className="d-flex justify-content-between">
                                    <span className="commentStar">{comment.star}</span>{comment.created_at}
                                </small>
                                <p className="m-1">
                                    {comment.message}
                                </p>
                            </div>
                        )}
                    </div>
                        <div>
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={3}
                                totalItemsCount={this.props.feedbackCount}
                                pageRangeDisplayed={3}
                                onChange={this.handlePageChange.bind(this)}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    </div>)
                    :"There are no feedback yet"}
            </>
        );
    }
}

FeedbackSearch.propTypes = {
    feedback: PropTypes.array,
    feedbackCount: PropTypes.string,
    requestGetFeedbackByStudioId: PropTypes.func,
    studioId: PropTypes.any,
    onRequestClose: PropTypes.func,
};

