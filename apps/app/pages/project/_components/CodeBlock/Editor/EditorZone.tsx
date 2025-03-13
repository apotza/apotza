import React, { useEffect } from "react";
import IDEeditor from "./IDEeditor";
import languages from "../../../../../packages/common/Json/languages.json";

type Props = {
  value?: any;
};

export const EditorZone = (props: Props) => {
  return (
    <div className="relative w-full h-full items-center">
      <div className="h-[50px] w-full flex gap-5 shadow-2xl bg-gradient-to-r from-slate-800 to-slate-600">
        <image
          className="ml-5 shadow-2xl my-3 hover:bg-white/50 bg-white/30 rounded-md cursor-pointer"
          href={
            languages.find((item) => item.value === props.value.language)
              ?.icon_href || "/asset/"
          }
          width={25}
          height={25}
        />
        <div className="flex-1 flex h-full items-center">
          {props.value.name}
        </div>
      </div>
      <IDEeditor value={props.value} />
    </div>
  );
};
