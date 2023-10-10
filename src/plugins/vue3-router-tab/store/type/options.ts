import { TabId } from "../../types";

/**
 * @description: navigate to tab
 * @param {TabId} id tab id,id must in tabs
 * @param {string} fullPath router fullPath
 * @param {boolean} refresh whether to refresh
 * @param {boolean} autoTo whether to automatically jump to the tab,default go to the after the current tab, if there is no tab, go to the before page
 **/
export type ToOptions = {
  id?: TabId;
  fullPath?: string;
  refresh?: boolean;
};
