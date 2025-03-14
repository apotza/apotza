import React from "react";
import Image from "next/image";

type Props = {};

const Brand_Image = (props: Props) => {
  return (
    <div className="hidden lg:flex absolute left-[180px] rounded-3xl">
      <div className="w-fit h-fit">
        <image
          href="/brand/hero-dashboard.avif"
          width={1700}
          height={800}
          className=""
        />
      </div>
      <div className="absolute  inset-0 bg-gradient-to-r from-slate-950 to-transparent  rounded-3xl"></div>
    </div>
  );
};

export default Brand_Image;
