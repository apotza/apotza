import React, { useCallback, useRef } from "react";
import { Input } from "@repo/ui/input";
import _ from "lodash";
import useDebouncedUpdate from "../utils/debouce";
import { Textarea } from "@repo/ui/textarea";
import Text_Base from "../../base/text";

type Props = {
  location: Array<string>;
  initialvalue: string;
};

// I will get Full Config of the Component Here

export const TextInput: React.FC<Props> = ({
  location,
  initialvalue,
}: Props) => {
  const [value, setValue] = React.useState<string>(initialvalue);

  useDebouncedUpdate(location, value);
  const ref = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="float-end flex">
      <Text_Base value={value} onChange={handleChange} />
    </div>
  );
};

export default TextInput;

// export const TextColorSize: React.FC<Props> = ({
//   location,
//   initialvalue,
// }: Props) => {
//   const [value, setValue] = React.useState<TextColorSizeProps>(initialvalue);

//   useDebouncedUpdate(location, value);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setValue((prev) => ({
//       ...prev,
//       value: e.target.value,
//     }));
//   };

//   return (
//     <div className="flex justify-between items-center gap-2">
//       <div className="font-bold text-sm">{location[location.length - 1]}:</div>
//       <HexColorPicker
//         color={value.color}
//         onChange={(value) => setValue((prev) => ({ ...prev, color: value }))}
//         className="w-10 h-10"
//       />
//       <Input
//         defaultValue={initialvalue.value}
//         value={value.value}
//         onChange={handleChange}
//         type="number"
//         className=""
//       />
//       <Select
//         defaultValue={initialvalue.size.toString()}
//         onValueChange={(value: any) =>
//           setValue((prev) => ({ ...prev, size: Number(value) }))
//         }
//       >
//         <SelectTrigger className="w-fit gap-1 border-none p-0 focus:bg-accent focus:text-accent-foreground">
//           <div>{value.size}</div>
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="0.25">0.5rem</SelectItem>
//           <SelectItem value="0.5">0.75rem</SelectItem>
//           <SelectItem value="0.75">1rem</SelectItem>
//           <SelectItem value="1">1.25rem</SelectItem>
//           <SelectItem value="1.25">1.5rem</SelectItem>
//           <SelectItem value="1.5">1.75rem</SelectItem>
//           <SelectItem value="1.75">2rem</SelectItem>
//           <SelectItem value="2">2.5rem</SelectItem>
//           <SelectItem value="2.5">3rem</SelectItem>
//         </SelectContent>
//       </Select>
//     </div>
//   );
// };
