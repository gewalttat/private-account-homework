import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    TextField
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/configureStore";
import { editUser } from "../../redux/usersReducer";
import { User } from "../pages/Account/Account";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        //MUI implementation
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface EditUserModalProps {
    user: User;
}

export const EditUserModal: FC<EditUserModalProps> = ({ user }) => {
    const [open, setOpen] = useState(false);
    const [updatedInfo, setUpdatedInfo] = useState<User>(user);

    const handleClickOpen: () => void = () => {
        setOpen(true);
    };

    const handleClose: () => void = () => {
        setOpen(false);
    };

    const dispatch = useDispatch<AppDispatch>();

    return (
        <div>
            <Button variant="text" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description">
                <DialogTitle>{user.name}</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            '& .MuiTextField-root': { width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off">
                        <TextField
                            sx={{ margin: '15px' }}
                            id="outlined-name"
                            label="Name"
                            value={updatedInfo.name}
                            error={!updatedInfo.name}
                            helperText={!updatedInfo.name ? "name can't be empty" : ''}
                            onChange={(event) => setUpdatedInfo({ ...user, name: event.target.value })}
                        />
                        <TextField
                            sx={{ margin: '15px' }}
                            id="outlined-major"
                            label="Major"
                            value={updatedInfo.major}
                            error={!updatedInfo.major}
                            helperText={!updatedInfo.name ? "major can't be empty" : ''}
                            onChange={(event) => setUpdatedInfo({ ...user, major: event.target.value })}
                        />
                        <TextField
                            sx={{ margin: '15px' }}
                            id="outlined-gender"
                            label="Gender"
                            value={updatedInfo.gender}
                            error={!updatedInfo.gender}
                            helperText={!updatedInfo.name ? "gender can't be empty" : ''}
                            onChange={(event) => setUpdatedInfo({ ...user, gender: event.target.value })}
                        />
                        <TextField
                            sx={{ margin: '15px' }}
                            id="outlined-location"
                            label="Location"
                            value={updatedInfo.location}
                            error={!updatedInfo.location}
                            helperText={!updatedInfo.name ? "location can't be empty" : ''}
                            onChange={(event) => setUpdatedInfo({ ...user, location: event.target.value })}
                        />

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Go back</Button>
                    <Button onClick={() => {
                            dispatch(editUser({id: user.id, body: updatedInfo}))
                            handleClose();
                    }} disabled={!Object.values(updatedInfo).every(item => item)}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};