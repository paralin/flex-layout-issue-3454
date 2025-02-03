import "./App.css";
import { IJsonTabNode, Layout, Model, TabNode } from "@aptre/flex-layout";
import { IJsonModel } from "@aptre/flex-layout";
import { useCallback, useMemo, useRef, useState } from "react";

// BASE_MODEL is the base json model for layouts.
export const BASE_MODEL: IJsonModel = {
  borders: [],
  global: {
    tabEnableRename: false,
    tabEnableClose: true,
    tabSetEnableMaximize: true,
    splitterSize: 4,
    // splitterExtra: 4,
    splitterExtra: 0,
    tabDragSpeed: 0.1,
    // tabSetTabStripHeight: 28,
    enableEdgeDock: true,
    tabSetEnableDivide: true,
    tabEnableRenderOnDemand: true,
    tabSetEnableDeleteWhenEmpty: true,
  },
  layout: {
    type: "row",
    weight: 100,
    children: [
      {
        type: "tabset",
        children: [
          {
            type: "tab",
            name: "Test tab",
            component: "test-component",
            enableClose: false,
          },
        ],
      },
    ],
  },
};

let globalTabNonce = 0;
interface TestTabProps {
  onChangeModel: () => void;
}

function TestTab({ onChangeModel }: TestTabProps) {
  const tabNonce = useMemo(() => globalTabNonce++, []);
  console.log("TestTab render", { tabNonce });
  return (
    <div>
      TestTab {tabNonce} <button onClick={onChangeModel}>Change model</button>
    </div>
  );
}

function App() {
  /*
  const [jsonModel, setJsonModel] = useState<IJsonModel>(() => structuredClone(BASE_MODEL));
  const currentModel = useMemo(() => Model.fromJson(jsonModel), [jsonModel]);
  */

  const [currentModel, setCurrentModel] = useState<Model>(() =>
    Model.fromJson(BASE_MODEL),
  );
  const setIdenticalModel = useCallback(() => {
    setCurrentModel(Model.fromJson(BASE_MODEL));
  }, [setCurrentModel]);

  const handleChangeModel = useCallback(() => {
    /*
    setJsonModel((prev) => {
      const next = structuredClone(prev)
    });
    */
    setIdenticalModel();
  }, [setIdenticalModel]);

  const factory = useCallback(
    (_tab: TabNode) => <TestTab onChangeModel={handleChangeModel} />,
    [handleChangeModel],
  );

  return <Layout model={currentModel} factory={factory} />;
}

export default App;
