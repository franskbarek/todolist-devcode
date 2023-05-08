import TodoEmptyState from "../assets/images/todo-empty-state.png";
import iconPlus from "../assets/images/icon-plus.svg";
import iconBack from "../assets/images/icon-back.svg";
import iconEdit from "../assets/images/icon-edit-h.svg";
import { Link } from "react-router-dom";

export default function ItemDetail() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* button-back */}
      <Link to="/">
        <img className="absolute w-[32px] h-[32px] left-[220px] top-[159px]" src={iconBack} alt="icon-back" />
      </Link>
      {/* todo-title */}
      <p className="absolute w-[233px] h-[54px] left-[271px] top-[155px] font-poppins font-bold text-[36px] leading-9 text-primary-black mx-auto text-center">New Activity</p>
      {/* button-edit */}
      <img className="absolute w-[24px] h-[24px] left-[523px] top-[164px] cursor-pointer" src={iconEdit} alt="icon-edit" />
      {/* todo-empty-state */}
      <img className="absolute w-2/5 left-[337px] top-[255px] z-10" src={TodoEmptyState} alt="emptystate" />

      {/* start todo-add-button */}
      <div className="flex flex-row justify-center items-center pt-[13px] pr-[21px] pb-[13px] pl-[14px]  gap-1.5">
        <button className="absolute bg-primary-500 w-[159px] h-[54px] left-[1150px] top-[154px] rounded-full">
          <div className="flex justify-center items-center">
            <img className="w-[24px] h-[24px]" src={iconPlus} alt="icon-plus" />
            <p className="font-poppins text-white not-italic font-semibold text-lg">Tambah</p>
          </div>
        </button>
      </div>
      {/* end todo-add-button */}
    </div>
  );
}
