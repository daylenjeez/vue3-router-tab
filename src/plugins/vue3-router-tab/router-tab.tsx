import {  PropType, defineComponent, provide } from "vue";
import Tabs from "./components/tabs";
import Page from "./components/page/index.vue";
import { RouterTabConfig,Tab,Ui } from "./types";
import {  useRouterTabStore } from "./store";

export default defineComponent({
  name: "RouterTab",
  components: {
    Tabs,
    Page,
  },
  props: {
    maxAlive: {
      type: Number as PropType<RouterTabConfig['max-alive']>,
      required: false,
      default: 10
    },
    ui:{
      type:String as PropType<Ui>,
      required:false,
      default:'initial'
    },
  },

  emits: {'before-close': () => Promise<boolean>},
  
  setup(props, { emit }) {
    provide('ui', props.ui);
    const store = useRouterTabStore();

    store.$onAction(({
      name, // name of the action
      args, // array of parameters passed to the action
      after, // function to be called after the action
    }) => {
      if(name === 'close' && args[0]){
        emit('before-close');
      }
    });

    return () => (
      <div class="rt-container">
        <Tabs />
        <Page />
      </div>
    );
  },
});
