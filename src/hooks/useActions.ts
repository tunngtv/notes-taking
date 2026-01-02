import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators, ActionCreatorsMapObject } from "redux";

export const useActions = <T extends ActionCreatorsMapObject>(actions: T) => {
  const dispatch = useDispatch();

  return useMemo(
    () => bindActionCreators(actions, dispatch),
    [actions, dispatch]
  ) as T;
};
