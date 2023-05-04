import bannerEmptyActivity from "../assets/images/activity-empty-state.png";
import iconPlus from "../assets/images/icon-plus.svg";

import { CircularProgress } from "@mui/material";
import { useState } from "react";

export default function DashboardEmpty() {
  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
  }
  return (
    <div className="flex">
      {/* activity-title */}
      <p data-cy="activity-title" className="absolute w-[145px] h-[54px] left-[220px] top-[148px] font-poppins not-italic font-bold text-[36px] leading-10 text-primary-black">
        Activity
      </p>

      {/* activity-empty-state */}
      <img data-cy="activity-empty-state" className="absolute w-[767px] h-[490px] left-[336px] top-[267px]" src={bannerEmptyActivity} alt="empty" />

      {/* activity-add-button */}
      {loading ? (
        <div className="flex flex-row justify-center items-center pt-[13px] pr-[21px] pb-[13px] pl-[14px]  gap-1.5">
          <button data-cy="activity-add-button" className="absolute bg-primary-500 w-[159px] h-[54px] left-[1061px] top-[154px] rounded-full">
            <div className="flex justify-evenly items-center">
              <p className="font-poppins text-white not-italic font-semibold text-lg">
                <CircularProgress size={30} color="inherit" />
              </p>
            </div>
          </button>
        </div>
      ) : (
        <div className="flex flex-row justify-center items-center pt-[13px] pr-[21px] pb-[13px] pl-[14px]  gap-1.5">
          <button data-cy="activity-add-button" className="absolute bg-primary-500 w-[159px] h-[54px] left-[1061px] top-[154px] rounded-full">
            <div className="flex justify-evenly items-center">
              <img className="w-[24px] h-[24px]" src={iconPlus} alt="icon-plus" />
              <p className="font-poppins text-white not-italic font-semibold text-lg">Tambah</p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
