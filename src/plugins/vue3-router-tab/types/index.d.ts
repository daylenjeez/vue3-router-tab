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
  ui?:Ui
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
 * @property {boolean} allowClose
 */
export interface Tab {
  id: string;
  name: string | symbol;
  icon?: string;
  keepAlive: boolean;
  fullPath: string;
  isIframe: boolean;
  allowClose?: boolean;
}

export type TabId = Tab["id"];

/**
 * router tab meta type
 * @interface RouterTab
 * @property {Tab[]} tabs
 * @property {boolean} keepAlive
 * @property {number} maxAlive
 */
export interface RouterTab {
  tabs: Tab[];
  keepAlive?: boolean;
  maxAlive?: number;
}

export type Ui = 'elementPlus'|'antd'|'naviUi'|'tailWind'
