import { VNode } from "vue";

export function renameComponentType(component: VNode, newName: string): VNode {
  if (component && typeof component.type === 'object') {
    (component.type as any).name = newName;
  }
  return component;
  // return { ...component, type: { ...(component.type as any), name: newName } };
}
