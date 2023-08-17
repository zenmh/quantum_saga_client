import { FC } from "react";

interface BtnProps {
  lebel: string;
}

const Btn: FC<BtnProps> = ({ lebel }) => {
  return (
    <button className="text-white bg-sky-400 rounded-md px-2 py-1 font-semibold">
      {lebel}
    </button>
  );
};

export default Btn;
