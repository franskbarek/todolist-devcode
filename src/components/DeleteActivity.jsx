import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import iconDelete from "../assets/images/icon-delete.svg";
import iconAlert from "../assets/images/icon-alert.svg";

export default function DeleteActivity({ id, onDelete, title }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await onDelete(id);
    handleClose();
  };

  return (
    <div data-cy="todo-modal-delete">
      <Button variant="outlined" onClick={handleClickOpen}>
        <img src={iconDelete} alt="delete" className="cursor-pointer" />
      </Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          <img src={iconAlert} alt="alert" data-cy="modal-delete-icon" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText data-cy="modal-delete-title">
            Apakah anda yakin menghapus <i>{title}</i>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button data-cy="modal-delete-cancel-button" autoFocus onClick={handleClose}>
            Batal
          </Button>
          <Button data-cy="modal-delete-confirm-button" onClick={handleDelete} autoFocus>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
