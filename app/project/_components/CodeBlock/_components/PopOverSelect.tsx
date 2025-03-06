"use client";

import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import StepsBlockAction from "@/actions/project/stepsBlock";
import TabBlockAction from "@/actions/project/tabBlock";
import languages from "@/packages/common/Json/languages.json";

type PopOver = {
  setOpen: (open: boolean) => void;
  stepUse?: boolean;
};

export function ComboPopAPI(props: PopOver) {
  const [value, setValue] = React.useState("");
  const [currentTab, setCurrentTab] = React.useState<string>("");

  const { mutate: mutateTabAdd } = TabBlockAction.useAdd();
  const { mutate: mutateStepAdd } = StepsBlockAction.useadd();

  React.useEffect(() => {
    const currentTab = localStorage.getItem("currentTab");
    setCurrentTab(currentTab as string);
  }, []);

  return (
    <PopoverContent
      className="w-[200px] p-0 border-[2px] border-black shadow-lg rounded-md"
      side="right"
    >
      <Command className="bg-[#1e1e1e]">
        <CommandInput placeholder="Search Provider..." />
        <CommandList>
          <CommandEmpty>No API Provider found.</CommandEmpty>
          <CommandGroup className="">
            <div className="flex flex-col ">
              {languages.map((language) => (
                <CommandItem
                  key={language.value}
                  value={language.value}
                  onSelect={(currentValue: any) => {
                    setValue(currentValue === value ? "" : currentValue);
                    props.setOpen(false);
                    if (!props.stepUse) {
                      mutateTabAdd({
                        metadata: {
                          name: language.label,
                          language: language.value,
                        },
                      });
                    }
                    if (props.stepUse) {
                      mutateStepAdd({
                        metadata: {
                          id: currentTab,
                          language: language.value,
                        },
                      });
                    }
                  }}
                  className=" p-1 py-2 rounded-md border-none cursor-pointer flex items-center gap-2"
                >
                  <Image
                    src={language.icon_href}
                    alt={language.label}
                    width={20}
                    height={20}
                    priority
                  />
                  <span className="w-full text-left">{language.label}</span>
                </CommandItem>
              ))}
            </div>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  );
}
