import Link from "next/link";
import React, { useState } from "react";
import { PiCaretDownBold } from "react-icons/pi";

function Dropdown({ title, data }: { title: string; data: any[] }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex w-full flex-col gap-1">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full flex-row items-center justify-between font-light hover:text-blue-600  dark:hover:text-blue-400"
      >
        {title} <PiCaretDownBold />
      </button>
      {open && (
        <div className="ml-2 flex w-full flex-col gap-y-1">
          {data.map((item, index) => (
            <Link
              className="text-sm hover:text-blue-600  dark:hover:text-blue-400"
              href={item.link}
              key={index}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
