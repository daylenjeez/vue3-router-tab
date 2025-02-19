import { defineComponent, IframeHTMLAttributes, PropType } from "vue";

export default defineComponent({
  name: "RtIframe",

  props: {
    attributes: {
      type: Object as PropType<IframeHTMLAttributes>,
      required: true,
    },
  },

  setup(props) {
    const attributes = props.attributes;

    return () => (
        <iframe width="100%" height="100%" {...attributes} />
    );
  },
});
