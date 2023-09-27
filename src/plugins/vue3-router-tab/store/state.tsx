import { Tab } from "../types";

export interface State {
  tabs: Tab[];
  activeTab: void | Tab;
}

export default (): State => ({ tabs: [], activeTab: void 0 });
