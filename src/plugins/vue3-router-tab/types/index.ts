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

export interface TabWithIndex extends Tab {
  index: number;
}


/**
 * router tab config
 * @interface RouterTab
 * @property {KeepAliveProps} keepAliveProps
 * @property {Ui} ui
 * @property {boolean} closeIcon
 * @property {(tab: Tab) => Promise<boolean>} beforeClose
 */
export interface RouterTabConfig {
  'max-alive': number;
  ui?: Ui;
  closeIcon?: boolean;
  'before-close'?: (tab: Tab) => Promise<boolean>;
}

/**
 * router tab right click config
 */
export type RightClickConfig = {
} | Boolean;

export type Ui = 'initial' |'elementPlus' | 'ant' | 'naviUi' | 'tailWind';

declare module 'vue' {
  interface GlobalComponents {
    RouterTab: typeof import('../router-tab').default;
  }
}
