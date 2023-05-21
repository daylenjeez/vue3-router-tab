import { Tab, TabId } from "../types";

export interface State {
  tabs: Tab[];
  activeTabId: null | TabId;
}

export default (): State => ({ tabs: [], activeTabId: null });
