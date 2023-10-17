import { Tab, TabId } from "../../../types";

export interface State {
  tabs: Tab[];
  activeTab: Tab | undefined;
  cacheKeys: TabId[];
}
