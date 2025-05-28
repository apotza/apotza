import React, { useEffect } from "react";
import { useStepConfig } from "../utils/useSaveStepConfig";
import IDEeditor from "../IDEditor";

function LanguageConfig() {
  const { stepConfig, setStepBlock } = useStepConfig();

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-1 mb-12 bg-white/20 p-1 shadow-inner hover:bg-white/30 duration-200 shadow-black/50 rounded-lg overflow-hidden">
        <IDEeditor
          code={stepConfig.configuration.code}
          language={stepConfig.type}
          onChange={(code) => {
            setStepBlock({
              code: code,
            });
          }}
        />
      </div>
    </div>
  );
}
// This component is used to render the language configuration editor

export default LanguageConfig;
