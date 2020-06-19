import React, { useEffect, useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import CardWithFiles from "./CardWithFiles.jsx";
import { exportMessages } from "../../constants";
import Button from "../reusableComponents/Button";
import { withToastManager, useToasts } from 'react-toast-notifications';
import PropTypes from 'prop-types';
import i18n from "i18next";
import { withTranslation } from "react-i18next";

function DropZone(props) {
    const { uploadCollection } = props;
    const { addToast } = useToasts();
    const fileSizeRestriction = "1 MB!";
    const ACTIVE_STYLE = "#2196f3";
    const ACCEPT_STYLE = "#00e676";
    const REJECT_STYLE = "#8c011c";
    const MAX_FILE_IN_COLLECTION_SIZE = 1 * 1024 * 1024;
    const [files, setFiles] = useState([]);
    const { acceptedFiles,
        rejectedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject } = useDropzone({
            accept: 'image/jpeg, image/png, image/webp',
            onDrop: acceptedFiles => {
                setFiles(acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })));
            },
            maxSize: MAX_FILE_IN_COLLECTION_SIZE
        });

    const thumbs = files.map(file => (
        <div className="thumb" key={file.name + Date.now()}>
            <div className="thumbInner">
                <img src={file.preview} alt="preview photo" />
            </div>
        </div>
    ))

    const activeStyle = {
        borderColor: ACTIVE_STYLE
    };

    const acceptStyle = {
        borderColor: ACCEPT_STYLE
    };

    const rejectStyle = {
        borderColor: REJECT_STYLE
    };

    const style = useMemo(() => ({
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject
    ]);

    useEffect(() => {

        if (props.collectionSuccess) {
            addToast(props.collectionSuccess,
                {
                    appearance: 'success',
                });
            props.clearReduxField();
        }
        if (props.collectionError) {
            addToast(props.collectionError,
                {
                    appearance: 'error',
                });
            props.clearReduxField();
        }
    }, [props]);

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview))
    }, [files]);

    const interactionWithDropzone = i18n.t("DROP_ZONE.DRAG_AND_DROP");

    return (
        <>
            <header>
                <h3 className="container upload-heading">{i18n.t("DROP_ZONE.UPLOAD_HEADING")}</h3>
            </header>
            <section className="container">
                <div {...getRootProps({ className: 'dropzone', style })}>
                    <input {...getInputProps()} />
                    <p>{interactionWithDropzone}</p>
                    <em>{i18n.t("DROP_ZONE.FILES_ARE_ALLOWED")}</em>
                </div>
                <div
                    className="info-warning-block my-2">
                    {i18n.t("DROP_ZONE.MAXIMUM_SIZE_UPLOAD")}
                </div>
                <aside>
                    <div className="info-about-upload">
                        {(rejectedFiles.length) ? <CardWithFiles files={rejectedFiles} label="Rejected Files" /> : null}
                    </div>
                    <div className="thumbsContainer">
                        {thumbs}
                    </div>
                </aside>

                <div className="dropzone-controls">
                    <Button
                        type="button"
                        label="Upload"
                        className="btn ch-btn-success"
                        disabled={acceptedFiles.length === 0}
                        handleClick={(acceptedFiles.length > 0) ? () => uploadCollection(files, props.selectedStudioId)
                            : null}
                    />
                    <Button
                        type='button'
                        label='Cancel'
                        className='btn ch-btn-danger'
                        handleClick={() => props.onLeaveUploadMultiPhotos()}
                    />
                </div>
            </section>
        </>
    )
}

export default withToastManager(DropZone);

DropZone.propTypes = {
    onLeaveUploadMultiPhotos: PropTypes.func,
    uploadCollection: PropTypes.any,
    selectedStudio: PropTypes.object,
    userId: PropTypes.number,
    selectedStudioId: PropTypes.number,
    collectionSuccess: PropTypes.string,
    clearReduxField: PropTypes.func,
    collectionError: PropTypes.string,
}
