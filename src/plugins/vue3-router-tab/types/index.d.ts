import { RouteLocationNormalized } from "vue-router";

export type TabKey =
  | "path"
  | "fullPath"
  | ((router: RouteLocationNormalized) => string);

/**
 * tab meta
 * @interface TabMeta
 * @property {TabKey} tabKey
 * @property {string} tabName
 * @property {boolean} keepAlive
 * @property {string} icon
 * @property {string} configKeyInMeta
 */
export interface TabConfig {
  key?: TabKey;
  name?: string;
  keepAlive?: boolean;
  icon?: string;
  configKeyInMeta?: string;
  isIframe?: boolean;
}

/**
 * tab
 * @interface Tab
 * @property {string} id
 * @property {string} name
 * @property {string} icon
 * @property {boolean} keepAlive
 * @property {string} fullPath
 * @property {boolean} isIframe
 */
export interface Tab {
  id: string;
  name: string | symbol;
  icon?: string;
  keepAlive: boolean;
  fullPath: string;
  isIframe: boolean;
}

export type TabId = Tab["id"];

export interface RouterTab {
  tabs: Tab[];
  keepAlive?: boolean;
  maxAlive?: number;
}
