import * as React from "react";

import iconDelete from "../assets/images/icon-delete.svg";
import iconAlert from "../assets/images/icon-alert.svg";
import iconAlertSm from "../assets/images/icon-alert-sm.svg";
import useOutsideClick from "../utils/useOutSideClick";

export default function DeleteActivity({ id, onDelete, title }) {
  const [open, setOpen] = React.useState(false);

  const [succesDelete, setSuccesDelete] = React.useState(false);

  const ref = React.useRef();

  useOutsideClick(ref, async () => {
    if (open) {
      await setOpen(false);
    }
    if (succesDelete) {
      await setSuccesDelete(false);
    }
  });

  const handleClickOpen = async () => {
    await setOpen(true);
  };

  const handleCancel = async () => {
    await setOpen(false);
  };

  const handleCloseSm = async () => {
    await setSuccesDelete(false);
  };

  const handleDelete = async () => {
    await onDelete(id);
    await handleCancel();
    setSuccesDelete(true);
  };

  return (
    <div className="flex" ref={ref}>
      <div onClick={handleClickOpen}>
        <img src={iconDelete} alt="delete" className="cursor-pointer ml-10" />
      </div>
      {open && (
        <div onClick={handleClickOpen} className="absolute w-[490px] h-[355px] left-[72vh] top-[35vh] bg-white z-50 rounded-xl shadow-2xl border-solid border-2 py-2">
          <div className="flex flex-col justify-center items-center">
            <div>
              <img src={iconAlert} alt="alert" data-cy="modal-delete-icon" className="mt-7 mb-0" />
            </div>

            <div className="flex justify-center items-center my-10">
              <p className="font-poppins text-center">
                Apakah anda yakin menghapus <br />
                <strong data-cy="modal-delete-title" className="font-poppins">
                  “{title}” ?
                </strong>
              </p>
            </div>

            <div className="flex mt-[190px]">
              <p
                data-cy="modal-delete-cancel-button"
                className="flex justify-center items-center px-14 py-13 gap-6 absolute w-[150px] h-[54px] left-[85px] top-[258px] border-solid border-2 py-2 rounded-full cursor-pointer"
                onClickCapture={handleCancel}
              >
                Batal
              </p>
              <p
                data-cy="modal-delete-confirm-button"
                className="flex justify-center items-center px-14 py-13 gap-5 absolute w-[150px] h-[54px] left-[255px] top-[258px] bg-red-500 rounded-full font-poppins text-white cursor-pointer"
                onClick={handleDelete}
              >
                Hapus
              </p>
            </div>
          </div>
        </div>
      )}
      <>
        {succesDelete && (
          <div data-cy="modal-information-icon" className="absolute w-[490px] h-[58px] left-[72vh] top-[50vh] rounded-xl shadow-2xl border-solid border-2 bg-white" onClick={handleCloseSm}>
            <div className="flex justify-start mt-4 mb-0">
              <img src={iconAlertSm} alt="alertsm" className="mx-2" />
              <p data-cy="modal-information-title" className="font-poppins">
                Activity berhasil dihapus
              </p>
            </div>
          </div>
        )}
      </>
    </div>
  );
}
