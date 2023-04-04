import { RouteLocationNormalized } from "vue-router";
export type TabKey = "path" | "fullPath" | ((router: RouteLocationNormalized) => string);
export type PageType = "alive" | "iframe";

export interface TabMeta {
  tabKey?: TabKey;
  tabName?: string;
  keepAlive?: boolean;
  icon?: string;
}

export interface Tab {
  tagId: string;
}
