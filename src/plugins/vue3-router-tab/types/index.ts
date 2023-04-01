export type PageType = "alive" | "iframe";

export interface Tab {
  name: string;
  key: string;
  url: string;
  pageType: PageType;
}
