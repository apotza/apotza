import React, { useEffect, useState } from "react";

import Tabs from "./Tab";
import EditorCode from "./Editor";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { useOpen } from "../../_hooks/useOpenCode";
import PanelResizeHandleComp from "../utils/PanelResizeHandle";
import CodeBlockAction from "../../../../api/project/codeBlock";
import { TabsContent } from "@radix-ui/react-tabs";
import ProjectAction from "../../../../actions/project";
import StepEditorRoot from "./utils/StepEditorRoot";
import { Skeleton } from "../../../../components/ui/skeleton";
import { useCurrentTab } from "../../_hooks/useCurrentTab";

type Props = {};

const CodeBlock = ({}: Props) => {
  const { openCode, handleOpenCode } = useOpen();
  const [codeBlocks, setCodeBlocks] = useState<any>([]);

  const { isLoading, data } = ProjectAction.getProject();
  console.log("data", data);

  // useEffect(() => {
  //   if (data) {
  //     setCodeBlocks(data.payload.codeBlocks);
  //   }
  // }, [data]);

  return (
    <>
      <Tabs
        handleOpen={handleOpenCode}
        Open={openCode}

        // BlockData={(item) => setBlockData(item)}
      />
      {openCode && <PanelResizeHandleComp />}
      {openCode && (
        <Panel
          defaultSize={40}
          minSize={20}
          maxSize={100}
          collapsible
          onCollapse={handleOpenCode}
        >
          <div className="ml-1 h-full bg-slate-800">
            {/* {codeBlocks.map((item: any, index: number) => {
              return (
                <TabsContent
                  key={index}
                  className="w-full h-full"
                  value={index.toString()}
                >
                  <StepEditorRoot value={item} />
                </TabsContent>
              );
            })} */}
          </div>
        </Panel>
      )}
    </>
  );
};

export default CodeBlock;
