import {  computed, defineComponent } from "vue";
import {store} from '../../store';
import RtTab from './tab';

import styles from './style.module.less';

export default defineComponent({
  name: "RtTabs",
  setup() {
    const tabs = computed(()=>store.state.tabs);

    return () => <div class={styles['rt-tabs']}>
      {
        tabs.value.map((tab) => {
          return <RtTab {...tab} key={tab.id} />;
        }) 
      }
    </div>;
  },
});
