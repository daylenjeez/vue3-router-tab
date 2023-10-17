import { Getters } from "./type/getters";

export default ({ currentTab: (state) => state.activeTab, currentTabId: (state) => state.activeTab?.id }) as Getters;
