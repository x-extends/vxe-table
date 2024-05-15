import { computed, inject, provide, ComputedRef } from 'vue'

import { SizeType } from '../../types/all'

export function useSize (props: { size?: SizeType }) {
  // 组件尺寸上下文
  const xesize = inject('xesize', null as ComputedRef<SizeType> | null)
  const computeSize = computed(() => {
    return props.size || (xesize ? xesize.value : null)
  })
  provide('xesize', computeSize)

  return computeSize
}
