import React, { useEffect } from "react";
import {
  ComponentInterface,
  useComponent,
  usePrevComponent,
  useUpdatedComponent,
} from "../../../contexts/component";
import _ from "lodash";
import ComponentAction from "@/actions/project/component";
import { useFocusWithin } from "@mantine/hooks";

/**
 * A custom hook that manages the state of a component in a context-aware manner.
 * It provides functionality to synchronize the state with context values and update the context
 * when necessary. The hook now returns an additional `prevComponent` state.
 *
 * @param initialValue - The initial value of the component state.
 * @returns An object containing:
 * - `currentValue`: The current state value of the component.
 * - `setState`: A function to update the context and component state when triggered.
 * - `activeComponent`: The active component state from the context.
 * - `prevComponent`: The previous component state from the context.
 *
 * @remarks
 * - The hook uses multiple context hooks (`useComponent`, `useUpdatedComponent`, `usePrevComponent`)
 *   to manage and synchronize the component state.
 * - The `useEffect` hook ensures that the `currentValue` is updated whenever the `component` or
 *   `initialValue` changes.
 * - The `setState` function handles state updates and ensures that the previous component state
 *   is stored if the current state differs from the real component state.
 * - If the `activeComponent` is not equal to the `initialValue` and the `activeComponent` is not
 *   equal to the `realComponent`, the `realComponent` is updated with the `initialValue`.
 *
 * @example
 * **/
export const useContextSave = (initialValue: ComponentInterface) => {
  const [currentValue, setCurrentValue] = React.useState(initialValue);

  const { setComponent = () => {}, Component: realComponent } =
    useComponent() || {};

  const { ref, focused } = useFocusWithin();

  const { UpdatedComponent: activeComponent, setUpdatedComponent = () => {} } =
    useUpdatedComponent() || {};
  // Setting the Component State from the Context

  const { setPrevComponent = () => {} } = usePrevComponent() || {};

  const { mutate } = ComponentAction.delete(initialValue?.section ?? "");

  // useEffect hook to update the currentValue state whenever the component or initialValue changes
  useEffect(() => {
    if (activeComponent?.id === initialValue?.id) {
      setCurrentValue(activeComponent);
    } else if (activeComponent?.id !== initialValue?.id) {
      setCurrentValue(initialValue);
    }
  }, [activeComponent, initialValue]);

  // Adding Delete Functionality for the Active Component
  useEffect(() => {
    // console.log("focus", focused);
    // if (!focused) return;
    const _delete = (e: KeyboardEvent) => {
      if (e.key !== "Delete") return;
      if (
        currentValue?.type === "component" &&
        currentValue?.id === activeComponent?.id
      ) {
        mutate({
          id: currentValue.id,
        });
        setComponent(null);
        setUpdatedComponent(null);
      }
    };
    window.addEventListener("keydown", _delete);
    return () => {
      window.removeEventListener("keydown", _delete);
    };
  }, [currentValue, activeComponent]);

  const setState = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (JSON.stringify(activeComponent) !== JSON.stringify(initialValue)) {
      console.log("Component Clicked");
      if (JSON.stringify(activeComponent) !== JSON.stringify(realComponent)) {
        setPrevComponent(activeComponent ?? null);
      }
      setComponent(initialValue);
      setUpdatedComponent(initialValue);
    }
  };

  return {
    currentValue,
    activeComponent,
    setState,
    ref,
    focused,
  };
};
