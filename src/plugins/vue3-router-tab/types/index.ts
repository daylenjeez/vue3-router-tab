import { KeepAliveProps } from "vue";
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
 * @property {boolean} isIframe
 * @property {string} configKeyInMeta
 */
export interface TabConfig {
  key?: TabKey;
  name?: string;
  keepAlive?: boolean;
  icon?: string;
  isIframe?: boolean;
  configKeyInMeta?: string;
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
  isIframe?: boolean;
  allowClose?: boolean;
}

export type TabId = Tab["id"];

/**
 * router tab config
 * @interface RouterTab
 * @property {KeepAliveProps} keepAliveProps
 * @property {Ui} ui
 */
export interface RouterTabConfig {
  keepAliveProps: KeepAliveProps;
  ui?: Ui;
}

export type Ui = 'elementPlus' | 'antd' | 'naviUi' | 'tailWind'
