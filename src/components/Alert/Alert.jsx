import { Alert } from '@mui/material';

const alertStyle = {
    position: "fixed",
    top: "100px",
    right: "0px",
    transition: 'transform 0.5s ease-in-out',
    transform: 'translateX(-10%)',
};

function AlertBox(props) {

    return (
        <div>
            <Alert severity={props.type}>{props.message}</Alert>
        </div>
    )
}

export { AlertBox, alertStyle };

// <Alert severity="error">This is an error alert — check it out!</Alert>
// <Alert severity="warning">This is a warning alert — check it out!</Alert>
// <Alert severity="info">This is an info alert — check it out!</Alert>
// <Alert severity="success">This is a success alert — check it out!</Alert>