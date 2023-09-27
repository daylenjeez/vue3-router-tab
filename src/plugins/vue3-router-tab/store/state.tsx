import { Tab } from "../types";

export interface State {
  tabs: Tab[];
  activeTab: Tab | undefined;
}

export default (): State => ({ tabs: [], activeTab: void 0 });
