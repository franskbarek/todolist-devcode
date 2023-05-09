import { useDispatch, useSelector } from "react-redux";
import ImageEmptyActivity from "../assets/images/activity-empty-state.png";
import iconPlus from "../assets/images/icon-plus.svg";

import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { createActivityGroup, deleteActivityGroup, getActivityGroupDetail, getActivityGroups, todoSelectors } from "../redux/todoSlice";

import DeleteActivity from "../components/DeleteActivity";

import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

export default function DashboardEmpty() {
  const [addLoading, setAddLoading] = useState(false);

  const activityGroups = useSelector(todoSelectors.selectAll);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleCreateActivity = async () => {
    setAddLoading(true);
    await dispatch(createActivityGroup());
    setAddLoading(false);
  };

  const handleDeleteActivity = async (id) => {
    await dispatch(deleteActivityGroup(id));
    dispatch(getActivityGroups());
  };

  const handleGroupDetail = async (groupId) => {
    await dispatch(getActivityGroupDetail(groupId));
    navigate(`/itemdetail/${groupId}`);
  };

  useEffect(() => {
    dispatch(getActivityGroups());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* activity-title */}
      <p data-cy="activity-title" className="absolute w-[145px] h-[54px] left-[268px] top-[148px] font-poppins font-bold text-[36px] leading-10 text-primary-black mx-auto text-center">
        Activity
      </p>

      {/* start activity-add-button */}
      <div className="flex flex-row justify-center items-center pt-[13px] pr-[21px] pb-[13px] pl-[14px]  gap-1.5" onClick={handleCreateActivity}>
        <button data-cy="activity-add-button" className="absolute bg-primary-500 w-[159px] h-[54px] left-[1150px] top-[154px] rounded-full">
          <div className="flex justify-center items-center">
            <img className="w-[24px] h-[24px]" src={iconPlus} alt="icon-plus" />
            {addLoading ? <CircularProgress size={30} sx={{ color: "white" }} /> : <p className="font-poppins text-white not-italic font-semibold text-lg">Tambah</p>}
          </div>
        </button>
      </div>
      {/* end activity-add-button */}

      <div className="flex justify-center items-center flex-wrap mx-auto w-5/6 mt-[150px]">
        {/* activity-empty-state */}
        {activityGroups?.length < 1 ? (
          <img data-cy="activity-empty-state" className="absolute w-1/8 left-[337px] top-[255px] z-10" src={ImageEmptyActivity} alt="empty-state" />
        ) : (
          <>
            {/* start box group activity */}
            {activityGroups?.map((activity, idx) => (
              <div key={idx} data-cy="activity-item" className="flex justify-center pt-0 pr-2 pb-0 pl-3">
                <div className="h-[258px] w-[254px] bg-white rounded-xl shadow-2xl px-8 py-10 mb-8 relative">
                  <h4 data-cy="activity-item-title" className="text-md font-bold hover:underline cursor-pointer" onClick={() => handleGroupDetail(activity.id)}>
                    {activity.title}
                  </h4>
                  <div className="absolute z-2 bottom-5 bg-white flex justify-between items-center rounded-none w-[200px]">
                    <span data-cy="activity-item-date" className="text-md text-gray-500">
                      {format(new Date(activity.created_at), "dd MMMM yyyy", { locale: id })}
                    </span>
                    {/* Modal box delete confirm */}
                    <DeleteActivity id={activity.id} title={activity.title} onDelete={handleDeleteActivity} />
                  </div>
                </div>
              </div>
            ))}
            {/* end box group activity */}
          </>
        )}
      </div>
    </div>
  );
}
