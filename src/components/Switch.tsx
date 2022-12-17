import { InputHTMLAttributes } from 'react';

export function Switch(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="w-14 h-7 rounded-full inline-block relative">
      <input type="checkbox" className="hidden peer" {...props} />
      <span className="transition-[background-color] cursor-pointer peer-disabled:cursor-not-allowed absolute left-0 right-0 top-0 bottom-0 bg-gray-300 peer-checked:bg-green-400 peer-disabled:bg-gray-300 peer-disabled:peer-checked:bg-green-300 rounded-full overflow-hidden" />
      <span className="cursor-pointer peer-disabled:cursor-not-allowed transition-transform h-7 w-7 bg-white rounded-full inline-block translate-x-0 shadow-[0px_2px_3px_0px_rgba(0,0,0,0.4)] peer-disabled:shadow-none  peer-checked:translate-x-7 absolute" />
    </label>
  );
}
