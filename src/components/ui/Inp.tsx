import { ChangeEvent, FC } from "react";

interface InpProps {
  type: string;
  name?: string;

  placeholder?: string;
  dafault_value?: string;
  disabled: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Inp: FC<InpProps> = ({
  type,

  name,
  placeholder,

  disabled,
  onChange,
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      className="w-full p-3 text-lg bg-gray-800 border-sky-800 rounded-md outline-none text-white focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
    />
  );
};

export default Inp;
