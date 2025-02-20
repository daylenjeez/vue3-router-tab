import { computed, markRaw, nextTick, reactive, type VNode } from "vue";

// 创建一个包装器来存储 VNode
class VNodeWrapper {
	constructor(
		public vnode: VNode,
		public lastAccessed: number,
	) { }
}

interface CacheOptions {
	max?: number;
}

export const useCache = (options: CacheOptions) => {
	const { max = 10 } = options;

	const state = reactive<{
		keySet: Set<string>;
		//使用Map来存储VNodeWrapper
		keyToWrapper: Map<string, VNodeWrapper>;
		//使用WeakMap来存储VNodeWrapper和VNode之间的关系
		componentMap: WeakMap<VNodeWrapper, VNode>;
		refreshing: boolean;
		activeKey: string | undefined;
	}>({
		keySet: new Set<string>(),
		keyToWrapper: new Map(),
		componentMap: new WeakMap(),
		refreshing: false,
		activeKey: void 0,
	});

	const keys = computed(() => Array.from(state.keySet));

	const setActiveKey = (key: string | undefined) => {
		state.activeKey = key;
		if (key) {
			const wrapper = state.keyToWrapper.get(key);
			if (wrapper) wrapper.lastAccessed = Date.now();
		}
	};

	const add = (key: string) => {
		state.keySet.add(key);
	};

	const has = (key: string) => {
		return state.keySet.has(key);
	};

	const hasComponent = (key: string) => {
		const wrapper = state.keyToWrapper.get(key);
		return wrapper ? state.componentMap.has(wrapper) : false;
	};

	const getComponent = (key: string) => {
		const wrapper = state.keyToWrapper.get(key);
		return wrapper ? state.componentMap.get(wrapper) : undefined;
	};

	const addComponent = (key: string, vNode: VNode) => {
		if (state.keySet.size > max) {
			// 移除最久未使用的标签页
			const arr = Array.from(state.keyToWrapper.entries());

			const oldestKey = arr.reduce(
				(acc: [string, VNodeWrapper], curr: [string, VNodeWrapper]) => {
					return acc[1].lastAccessed < curr[1].lastAccessed ? acc : curr;
				},
				arr[0],
			)?.[0];

			remove(oldestKey);
		}
		//创建新的包装器
		const wrapper = new VNodeWrapper(markRaw(vNode), Date.now());
		//将key和包装器存储在keyToWrapper中
		state.keyToWrapper.set(key, wrapper);
		//将包装器和VNode存储在componentMap中
		state.componentMap.set(wrapper, vNode);
	};

	const remove = (key: string) => {
		state.keySet.delete(key);
		state.keyToWrapper.delete(key);
	};

	const reset = () => {
		state.keySet.clear();
		state.keyToWrapper.clear();
	};

	const refresh = async (key: string) => {
		const wrapper = state.keyToWrapper.get(key);
		const component = wrapper ? state.componentMap.get(wrapper) : undefined;

		if (wrapper && component) {
			//移除旧的映射
			state.keyToWrapper.delete(key);

			if (state.activeKey === key) {
				state.refreshing = true;
				state.keySet.delete(key);
			}

			await nextTick();

			const newWrapper = new VNodeWrapper(markRaw(component), Date.now());
			state.keyToWrapper.set(key, newWrapper);
			state.componentMap.set(newWrapper, component);

			if (state.activeKey === key) {
				state.refreshing = false;
				state.keySet.add(key);
			}
		}
	};

	return {
		state,
		keys,
		setActiveKey,
		add,
		has,
		hasComponent,
		getComponent,
		addComponent,
		remove,
		reset,
		refresh,
	};
};

export type Cache = ReturnType<typeof useCache>;
