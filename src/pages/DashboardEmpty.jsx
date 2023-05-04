import { useDispatch, useSelector } from "react-redux";
import bannerEmptyActivity from "../assets/images/activity-empty-state.png";
import iconPlus from "../assets/images/icon-plus.svg";

import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { createActivityGroup, deleteActivityGroup, getLists, todoSelectors } from "../redux/todoSlice";

export default function DashboardEmpty() {
  const [loading, setLoading] = useState(false);

  const lists = useSelector(todoSelectors.selectAll);

  const dispatch = useDispatch();

  console.log(lists);

  async function handleCreateActivity() {
    setLoading(true);
    await dispatch(createActivityGroup());
    setLoading(false);
  }

  const handleDeleteActivity = async (id) => {
    await dispatch(deleteActivityGroup(id));
    dispatch(getLists());
  };

  useEffect(() => {
    dispatch(getLists());
  }, [dispatch]);

  return (
    <div className="flex">
      {/* activity-title */}
      <p data-cy="activity-title" className="absolute w-[145px] h-[54px] left-[220px] top-[148px] font-poppins not-italic font-bold text-[36px] leading-10 text-primary-black">
        Activity
      </p>

      {/* activity-empty-state */}
      <img className="absolute w-[767px] h-[490px] left-[336px] top-[267px]" src={bannerEmptyActivity} alt="empty" />

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
              <p className="font-poppins text-white not-italic font-semibold text-lg" onClick={handleCreateActivity}>
                Tambah
              </p>
            </div>
          </button>
        </div>
      )}

      <div data-cy="activity-empty-state" className="flex mt-[170px] z-10">
        {lists.map((todo, idx) => (
          <ul data="activity-item-0" key={idx}>
            <li>id: {todo.id}</li>
            <li data-cy="activity-item-title">title: {todo.title}</li>
            <li data-cy="activity-item-date">created: {todo.created_at}</li>
            <button data-cy="activity-item-delete-button" className="p-2 m-2 bg-red-500" onClick={() => handleDeleteActivity(todo.id)}>
              Delete
            </button>
          </ul>
        ))}
      </div>
    </div>
  );
}
