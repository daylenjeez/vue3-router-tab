import type { IframeHTMLAttributes } from "vue";
import type { RouteLocationNormalized } from "vue-router";

export type TabKey =
  | "path"
  | "fullPath"
  | ((router: RouteLocationNormalized) => string);

export type IframeAttributes = Pick<
  IframeHTMLAttributes,
  "src" | "width" | "height" | "loading" | "name" | "marginheight"
>;

/**
 * tab meta
 * @interface TabMeta
 * @property {TabKey} tabKey
 * @property {string} tabName
 * @property {boolean} keepAlive
 * @property {string} icon
 * @property {string} configKeyInMeta
 * @property {IframeAttributes} iframeAttributes
 */
export interface TabConfig {
  key?: TabKey;
  name?: string;
  keepAlive?: boolean;
  icon?: string;
  configKeyInMeta?: string;
  iframeAttributes?: IframeAttributes;
}

/**
 * tab
 * @interface Tab
 * @property {string} id
 * @property {string} name
 * @property {string} icon
 * @property {boolean} keepAlive
 * @property {string} fullPath
 * @property {boolean} allowClose
 * @property {IframeAttributes} iframeAttributes
 */
export interface Tab {
  id: string;
  name: string | symbol;
  icon?: string;
  keepAlive: boolean;
  fullPath: string;
  allowClose?: boolean;
  iframeAttributes?: IframeAttributes;
}

export type TabId = Tab["id"];

export interface TabWithIndex extends Tab {
  index: number;
}

export interface ToOptions {
  id?: TabId;
  fullPath?: string;
}

export type TabGetter =
  | {
    id?: TabId;
    fullPath?: string;
  }
  | string;

/**
 * router tab config
 * @interface RouterTab
 * @property {KeepAliveProps} keepAliveProps
 * @property {Ui} ui
 * @property {boolean} hideClose
 * @property {(tab: Tab) => Promise<boolean>} beforeClose
 * @property {string} tabsClass
 * @property {string} pageClass
 * @property {boolean} draggable
 * @property {boolean} restore
 */
export interface RouterTabConfig {
  "max-alive": number;
  ui?: Ui;
  "hide-close"?: boolean;
  "before-close"?: (tab: Tab) => Promise<boolean>;
  "tabs-class"?: string;
  "page-class"?: string;
  draggable?: boolean;
  restore?: boolean;
}

/**
 * router tab right click config
 */
export type RightClickConfig = Record<string, unknown> | boolean;

export type Ui = "initial" | "elementPlus" | "ant" | "naviUi" | "tailWind";

export interface OpenProps {
  replace?: boolean;
  refresh?: boolean;
  tabConfig?: TabConfig;
}

declare module "vue" {
  interface GlobalComponents {
    RouterTab: typeof import("../router-tab").default;
  }
}
