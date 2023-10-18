import { VNode } from "vue";

export function renameComponentType(component: VNode, newName: string): VNode {
  return { ...component, type: { ...(component.type as any), name: newName } };
}
