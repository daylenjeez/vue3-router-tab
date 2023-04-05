import { defineComponent } from "vue";
import {store} from '../../store';

export default defineComponent({
  name: "RtTabs",
  setup() {
    return () => <div class="rt-tabs"></div>;
  },
});
