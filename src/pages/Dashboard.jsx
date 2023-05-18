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
    <div className="items-center justify-center">
      {/* start div for title and button */}
      <div className="flex justify-around my-6">
        {/* activity-title */}
        <p data-cy="activity-title" className="flex w-[145px] h-[54px] font-poppins font-bold text-[36px] text-primary-black">
          Activity
        </p>

        {/* start activity-add-button */}
        <button data-cy="activity-add-button" className="bg-primary-500 flex-initial w-[159px] h-[54px] rounded-full" onClick={handleCreateActivity}>
          <div className="flex justify-center items-center">
            <img className="w-[24px] h-[24px]" src={iconPlus} alt="icon-plus" />
            {addLoading ? <CircularProgress size={30} sx={{ color: "white" }} /> : <p className="font-poppins text-white not-italic font-semibold text-lg">Tambah</p>}
          </div>
        </button>
        {/* end activity-add-button */}
      </div>
      {/* end div for title and button */}

      <div className="flex justify-center items-center flex-wrap">
        {/* activity-empty-state */}
        {activityGroups?.length < 1 ? (
          <img data-cy="activity-empty-state" className="w-1/2 flex justify-center items-center" src={ImageEmptyActivity} alt="empty-state" />
        ) : (
          <>
            {/* start box group activity */}
            {activityGroups?.map((activity, idx) => (
              <div key={idx} data-cy="activity-item" className="flex justify-center">
                <div className="flex flex-col justify-between items-center shadow-xl rounded-xl w-[254px] h-[258px] my-2 mx-2 border-solid border-2 py-2">
                  <h4 data-cy="activity-item-title" className="text-md font-bold hover:underline cursor-pointer" onClick={() => handleGroupDetail(activity.id)}>
                    {activity.title}
                  </h4>
                  <div className="flex flex justify-between items-center w-[230px]">
                    <div data-cy="activity-item-date" className="text-md text-gray-500">
                      {format(new Date(activity.created_at), "dd MMMM yyyy", { locale: id })}
                    </div>
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
