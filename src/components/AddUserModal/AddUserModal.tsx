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
import { addUser } from "../../redux/usersReducer";
import { User } from "../pages/Account/Account";
import { v4 as uuidv4 } from 'uuid';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        //MUI implementation
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const AddUserModal: FC = () => {
    const [open, setOpen] = useState(false);
    const [newUserInfo, setNewUserInfo] = useState<User>({
        id: '',
        name: '',
        gender: '',
        location: '',
        major: ''
    });

    const handleClickOpen: () => void = () => {
        setNewUserInfo({...newUserInfo, id: uuidv4()});
        setOpen(true);
    };

    const handleClose: () => void = () => {
        setOpen(false);
    };

    const dispatch = useDispatch<AppDispatch>();

    return (
        <div>
            <Button variant="text" onClick={handleClickOpen}>
                Add new user
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description">
                <DialogTitle>Add new user</DialogTitle>
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
                            required
                            sx={{ margin: '15px' }}
                            id="outlined-name"
                            label="Name"
                            value={newUserInfo.name}
                            error={!newUserInfo.name}
                            helperText={!newUserInfo.name ? "name can't be empty" : ''}
                            onChange={(event) => setNewUserInfo({ ...newUserInfo, name: event.target.value })}
                        />
                        <TextField
                            required
                            sx={{ margin: '15px' }}
                            id="outlined-major"
                            label="Major"
                            value={newUserInfo.major}
                            error={!newUserInfo.major}
                            helperText={!newUserInfo.major ? "major can't be empty" : ''}
                            onChange={(event) => setNewUserInfo({ ...newUserInfo, major: event.target.value })}
                        />
                        <TextField
                            required
                            sx={{ margin: '15px' }}
                            id="outlined-gender"
                            label="Gender"
                            value={newUserInfo.gender}
                            error={!newUserInfo.gender}
                            helperText={!newUserInfo.gender ? "gender can't be empty" : ''}
                            onChange={(event) => setNewUserInfo({ ...newUserInfo, gender: event.target.value })}
                        />
                        <TextField
                            required
                            sx={{ margin: '15px' }}
                            id="outlined-location"
                            label="Location"
                            value={newUserInfo.location}
                            error={!newUserInfo.location}
                            helperText={!newUserInfo.location ? "location can't be empty" : ''}
                            onChange={(event) => setNewUserInfo({ ...newUserInfo, location: event.target.value })}
                        />

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Go back</Button>
                    <Button onClick={() => {
                            dispatch(addUser(newUserInfo));
                            setNewUserInfo({id: '', name: '', major: '', gender: '', location: ''});
                            handleClose();
                    }} disabled={!Object.values(newUserInfo).every(item => item)}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};