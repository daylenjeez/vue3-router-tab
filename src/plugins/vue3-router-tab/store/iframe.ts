import type { Tab } from "@routerTab/types";
import { computed } from "vue";

export const useIframe = ({tabs,activeTab}:{tabs: Tab[],activeTab?: Tab}) => {
  const iframeTabs = computed(() =>  tabs.filter((tab) => tab.iframeAttributes));

  return {
    iframeTabs,
  };
};
