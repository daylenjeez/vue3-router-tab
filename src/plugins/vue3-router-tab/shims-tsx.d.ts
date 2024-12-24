import 'vue/jsx-runtime'

declare module 'vue/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
