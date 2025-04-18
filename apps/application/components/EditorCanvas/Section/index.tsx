import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import React, { useEffect } from "react";
import Image from "next/image";
import DeleteSection from "./DeleteSection";
import AddSection from "./AddSection";
import DraggableComponent from "../_Component";
import ProjectAction from "../../../actions/project";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { useComponent, useUpdatedComponent } from "../../../contexts/component";
import { Loader } from "lucide-react";
import _ from "lodash";
import { useContextSave } from "../../../app/editor/_hooks/useContextSave";

type Props = {
  value?: any;
};

const Section = ({ value, ...props }: Props) => {
  const [Components, setComponents] = React.useState<any>(null);

  const { isOver, setNodeRef } = useDroppable({
    id: value.id,
  });

  const { data, isLoading } = ProjectAction.getSection(value.id as string);

  const { setState, component } = useContextSave(value);

  useEffect(() => {
    if (data) {
      if (data.payload.components.length > 0) {
        setComponents(data.payload.components);
      }
    }
  }, [data]);

  return (
    <div
      className="w-full p-2 "
      key={value.id}
      style={{
        height: "500px",
      }}
      onMouseUp={(e) => setState(e)}
    >
      <div
        ref={setNodeRef}
        className={cn(
          "relative w-full h-full border-[2px] border-transparent rounded-xl flex items-center justify-center overflow-clip pointer-events-auto",
          value?.id === component?.id
            ? "border-blue-400 "
            : "border-white/20 hover:border-white/30"
        )}
      >
        {isOver && (
          <div className="relative w-full h-full  ">
            <div className="absolute inset-0 rounded-xl  overflow-clip border-[3px] border-blue-500">
              <div
                style={{
                  //                 backgroundImage: `
                  //        linear-gradient(to right, rgb(215, 215, 215) 1px, transparent 1px),
                  //        linear-gradient(rgb(215, 215, 215) 1px, transparent 1px)
                  // `,
                  //                 backgroundSize: "24px 24px",
                  //                 borderBottom: "1px solid rgb(215, 215, 215)",
                  //                 borderTopColor: "rgb(215, 215, 215)",
                  //                 borderRight: "1px solid rgb(215, 215, 215)",
                  //                 borderLeftColor: "rgb(215, 215, 215)",
                  //                 borderTopStyle: "dashed",
                  //                 borderLeftStyle: "dashed",
                  height: "100%",
                  opacity: 0.5,
                  width: "100%",
                  // backgroundColor: "#bd99ff",
                  backgroundImage: `
radial-gradient(at 12% 14%, hsla(265,74%,65%,1) 0px, transparent 50%),
radial-gradient(at 32% 65%, hsla(235,74%,75%,1) 0px, transparent 50%),
radial-gradient(at 77% 18%, hsla(265,75%,65%,1) 0px, transparent 50%),
radial-gradient(at 31% 49%, hsla(235,75%,65%,1) 0px, transparent 50%),
radial-gradient(at 34% 70%, hsla(265,75%,65%,1) 0px, transparent 50%),
radial-gradient(at 85% 85%, hsla(235,75%,65%,1) 0px, transparent 50%),
radial-gradient(at 11% 90%, hsla(265,75%,65%,1) 0px, transparent 50%)`,
                }}
              ></div>
            </div>
          </div>
        )}
        {/* <Label className="absolute top-[50px] left-[70px]">
            {props.value.id + props.value.name}
          </Label> */}
        {Components &&
          Components.map((item: any) => (
            <DraggableComponent value={item} key={item.id} />
          ))}
      </div>
    </div>
  );
};

export default Section;
