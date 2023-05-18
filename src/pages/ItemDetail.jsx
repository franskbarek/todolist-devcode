import TodoEmptyState from "../assets/images/todo-empty-state.png";
import iconPlus from "../assets/images/icon-plus.svg";
import iconBack from "../assets/images/icon-back.svg";
import iconEdit from "../assets/images/icon-edit-h.svg";
import { Link, useLocation } from "react-router-dom";
import { getActivityGroupDetail, getTodoItems, todoSelectors, updateActivityTitle } from "../redux/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import useOutsideClick from "../utils/useOutSideClick";

export default function ItemDetail() {
  const location = useLocation();

  const id = location.pathname.split("/")[2];

  const activity = useSelector((state) => todoSelectors.selectById(state, id));

  console.log(activity.todo_items);

  const [showForm, setShowForm] = useState(false);

  const dispatch = useDispatch();

  const [title, setTitle] = useState(activity.title);

  const ref = useRef();

  const handleEditTitle = async () => {
    try {
      setShowForm(true);
      if (activity.title !== title) {
        await dispatch(updateActivityTitle({ id: id, title: title }));
        setShowForm(false);
      }
      return title;
    } catch (err) {
      console.error(err.message);
    }
  };

  useOutsideClick(ref, () => {
    handleEditTitle();
  });

  useEffect(() => {
    dispatch(getActivityGroupDetail(id));
  }, [dispatch, id]);

  const handleAddTodo = () => {
    return (
      <div className="text-red">
        <label>NAMA LIST ITEM</label>
        <br />
        <input placeholder="Tambahkan nama activity" />
        <label htmlFor="priority">PRIORITY</label>
        <br />
        <select name="priority" id="priotiry">
          <option value="Very High">Very High</option>
          <option value="High">High</option>
          <option value="Medium">Mercedes</option>
          <option value="Low">Low</option>
          <option value="Very Low">Very Low</option>
        </select>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* button-back */}
      <Link to="/">
        <img data-cy="todo-back-button" className="absolute w-[32px] h-[32px] left-[220px] top-[159px]" src={iconBack} alt="icon-back" />
      </Link>
      {/* todo-title */}
      {showForm ? (
        <>
          <input
            data-cy="todo-title"
            className="absolute w-[400px] h-[54px] left-[271px] top-[147px] font-poppins font-bold text-[36px] leading-9 text-primary-black mx-auto text-center"
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            ref={ref}
          />
          {/* button-edit */}
          <img data-cy="todo-title-edit-button" className="absolute w-[24px] h-[24px] left-[680px] top-[164px] cursor-pointer" src={iconEdit} alt="icon-edit" onClick={handleEditTitle} />
        </>
      ) : (
        <>
          <p data-cy="todo-title" className="absolute w-[400px] h-[54px] left-[271px] top-[157px] font-poppins font-bold text-[36px] leading-9 text-primary-black mx-auto text-center" onClick={handleEditTitle}>
            {title}
          </p>
          {/* button-edit */}
          <img data-cy="todo-title-edit-button" className="absolute w-[24px] h-[24px] left-[670px] top-[164px] cursor-pointer" src={iconEdit} alt="icon-edit" onClick={handleEditTitle} />
        </>
      )}

      {/* start todo-add-button */}
      <div className="flex flex-row justify-center items-center pt-[13px] pr-[21px] pb-[13px] pl-[14px]  gap-1.5" onClick={() => handleAddTodo()}>
        <button data-cy="todo-add-button" className="absolute bg-primary-500 w-[159px] h-[54px] left-[1150px] top-[154px] rounded-full">
          <div className="flex justify-center items-center">
            <img className="w-[24px] h-[24px]" src={iconPlus} alt="icon-plus" />
            <p className="font-poppins text-white not-italic font-semibold text-lg">Tambah</p>
          </div>
        </button>
      </div>
      {/* end todo-add-button */}

      {/* todo-empty-state */}
      <img data-cy="todo-empty-state" className="absolute w-2/5 left-[337px] top-[255px] z-10" src={TodoEmptyState} alt="todo-empty-state" />
      {handleAddTodo}
    </div>
  );
}
