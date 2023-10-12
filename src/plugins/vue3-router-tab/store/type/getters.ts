import { TabId, Tab } from "../../types";
import { CreateGetters } from "../type";
import { State } from "./state";

export type Getters = CreateGetters<State, {
  currentTabId: (state: State) => TabId | undefined;
  currentTab: (state: State) => Tab | undefined;
}>;
