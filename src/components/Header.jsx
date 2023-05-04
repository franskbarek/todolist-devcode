export default function Header() {
  return (
    <div data-cy="header-background" className="h-24 bg-primary-500 flex">
      <div className="flex container">
        <h2 data-cy="header-title" className="flex m-auto text-[18px] lg:absolute lg:w-[229px] lg:h-[36px] lg:left-[220px] lg:top-[38px] lg:text-[24px] font-poppins font-bold uppercase text-white">
          to do list app
        </h2>
      </div>
    </div>
  );
}
