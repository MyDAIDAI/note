import { defineComponent, ref } from "vue";
import type { PropType, VNode } from "vue";
import DragValue from "@/object/DragValue";
import { deepMerge } from "@/utils/deepMerge";

function useDrag({
  onDragstart,
  onDragend,
}: {
  onDragstart: (() => void) | undefined;
  onDragend: ((vec: [number, number]) => void) | undefined;
}) {
  const dragValue = new DragValue();
  const diffX = ref(dragValue.getDiffX());
  const diffY = ref(dragValue.getDiffY());

  const handlers = {
    onDragstart(e: DragEvent) {
      dragValue.start(e);
      onDragstart && onDragstart();
    },
    onDrag(e: DragEvent) {
      dragValue.update(e);
      diffX.value = dragValue.getDiffX();
      diffY.value = dragValue.getDiffY();
    },
    onDragend(e: DragEvent) {
      dragValue.update(e);
      onDragend && onDragend([dragValue.getDiffX(), dragValue.getDiffY()]);
    },
  };

  return {
    handlers,
    diffX,
    diffY,
  };
}

function addPropsToVNode(vNode: VNode, props: Record<string, any>): VNode {
  vNode.props = deepMerge(vNode.props, props);
  return vNode;
}

export const Draggable = defineComponent({
  props: {
    initialPosition: {
      type: Array as any as PropType<[number, number]>,
    },
    onDragstart: {
      type: Function as any as PropType<() => void>,
    },
    onDragend: {
      type: Function as any as PropType<() => void>,
    },
  },
  setup(props, ctx) {
    const { initialPosition, onDragstart, onDragend } = props;
    const { handlers, diffX, diffY } = useDrag({ onDragstart, onDragend });

    return () => {
      let vNode: VNode = ctx.slots.default!()[0];
      vNode = addPropsToVNode(vNode, {
        ...handlers,
        Draggable: true,
        style: {
          position: "absolute",
          left: `${initialPosition?.[0] || 0}px`,
          top: `${initialPosition?.[1] || 0}px`,
          transform: `translate(${diffX.value}px, ${diffY.value}px)`,
        },
      });
      return vNode;
    };
  },
});
