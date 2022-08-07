import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/configureStore";
import { deleteUser } from "../../redux/usersReducer";
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

interface DeleteUserModalProps {
    user: User;
}

export const DeleteUserModal: FC<DeleteUserModalProps> = ({ user }) => {
    const [open, setOpen] = React.useState<boolean>(false);

    const handleClickOpen: () => void = () => {
        setOpen(() => true);
    };

    const handleClose: () => void = () => {
        setOpen(() => false);
    };
    
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div>
            <Button variant="text" onClick={handleClickOpen}>
                Delete
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Delete user</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure want to delete {user.name}?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Go back</Button>
                    <Button onClick={() => {
                        dispatch(deleteUser(user.id));
                        handleClose();
                    }} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};