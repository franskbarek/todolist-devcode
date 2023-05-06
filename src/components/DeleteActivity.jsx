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
import iconAlertSm from "../assets/images/icon-alert-sm.svg";

export default function DeleteActivity({ id, onDelete, title }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [succesDelete, setSuccesDelete] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSm = () => {
    setSuccesDelete(false);
  };

  const handleDelete = async () => {
    await onDelete(id);
    await handleClose();
    setSuccesDelete(true);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} data-cy="activity-item-delete-button">
        <img src={iconDelete} alt="delete" className="cursor-pointer" />
      </Button>
      <div className="">
        {/* Modal delete confirm */}
        <Dialog open={open} onClose={handleClose} data-cy="modal-delete">
          <DialogTitle id="responsive-dialog-title" data-cy="modal-delete-icon">
            <img src={iconAlert} alt="alert" data-cy="modal-delete-icon" className="" />
          </DialogTitle>
          <DialogContent>
            <DialogContentText className="font-poppins" data-cy="modal-delete-title">
              Apakah anda yakin menghapus <strong data-cy="modal-delete-title">“{title}”</strong>?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button data-cy="modal-delete-cancel-button" autoFocus onClick={handleClose}>
              Batal
            </Button>
            <Button className="flex justify-center items-center px-14 py-13 gap-6 absolute w-150 h-54 left-255 top-258 bg-red-500 rounded-full" data-cy="modal-delete-confirm-button" onClick={handleDelete} autoFocus>
              Hapus
            </Button>
          </DialogActions>
        </Dialog>

        {/* Toast succes delete */}
        <Dialog open={succesDelete} onClose={handleCloseSm} data-cy="modal-information" autoFocus className="rounded-lg">
          <DialogContent data-cy="modal-information">
            {/* <DialogContentText> */}
            <div className="flex justify-start items-center">
              <img src={iconAlertSm} data-cy="modal-information-icon" alt="alertsm" className="mr-2" />
              <p data-cy="modal-information-title" className="pr-[200px]">
                Activity berhasil dihapus
              </p>
            </div>
            {/* </DialogContentText> */}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
