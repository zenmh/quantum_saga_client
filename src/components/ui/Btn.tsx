import { FC } from "react";

interface BtnProps {
  lebel: string;
  primary?: boolean;
  secondary?: boolean;
  denger?: boolean;
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  onClick?: () => void;
}

const Btn: FC<BtnProps> = ({
  lebel,
  primary,
  secondary,
  denger,
  xs,
  sm,
  md,
  lg,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`text-white 
      cursor-pointer px-2 font-semibold 
      ${primary && "bg-sky-500"}
      ${secondary && "bg-slate-500"} 
      ${denger && "bg-rose-500"}
      ${xs && "text-xs rounded-full"} 
      ${sm && "text-sm rounded-lg"} 
      ${md && "text-lg rounded-sm"} 
      ${lg && "text-xl"}`}
    >
      {lebel}
    </button>
  );
};

export default Btn;
