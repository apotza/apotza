import CodeBlockAction from "@/actions/project/codeBlock";
import { useClickOutsideEnter } from "@/app/project/_hooks/useClickOutsideEnter";
import { Input } from "@/components/ui/input";
import {
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/Tooltip/tooltip";
import { useMutationData } from "@/hooks/useMutation";
import { Tooltip } from "@radix-ui/react-tooltip";
import { Pencil } from "lucide-react";
import React from "react";

type Props = {
  value: any;
};

const HeaderChange = (props: Props) => {
  const { mutate } = useMutationData(
    ["CodeBlockAction.nameChange"],
    CodeBlockAction.nameChange,
    "CodeBlockAction.getall"
  );

  const Mutation = () => {
    mutate({ _id: props.value._id, name: value });
  };
  const { mount, setMount, ref, EnterClick, ValueChange, value } =
    useClickOutsideEnter(Mutation, props.value.name);
  ref.current?.focus();

  return (
    <div>
      {!mount && (
        <div
          className="flex cursor-pointer w-full p-2 text-base text-center bg-blue-400 rounded-md shadow-lg"
          onClick={() => setMount(true)}
        >
          <h1 className="flex-1">
            <span className=" font-bold">{value}</span>
          </h1>
          <Tooltip>
            <TooltipTrigger>
              <Pencil className=" fill-green-400 " />
            </TooltipTrigger>
            <TooltipContent>Change Name</TooltipContent>
          </Tooltip>
        </div>
      )}
      {mount && (
        <Input
          type="text"
          ref={ref}
          value={value}
          autoFocus
          onKeyDown={EnterClick}
          onChange={ValueChange}
          className="bg-transparent border-none text-center bg-black text-white"
        />
      )}
    </div>
  );
};

export default HeaderChange;
