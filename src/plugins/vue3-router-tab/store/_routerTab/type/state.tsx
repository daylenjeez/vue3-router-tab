import { Tab } from "../../../types";

export interface State {
  tabs: Tab[];
  activeTab: Tab | undefined;
}
