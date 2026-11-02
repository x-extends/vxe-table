import { tableComponenEmits } from '../../table/src/emits'

import type { VxeGridEmits } from '../../../types'

export const gridComponeEmits: VxeGridEmits = [...tableComponenEmits, 'page-change', 'form-submit', 'form-submit-invalid', 'form-reset', 'form-collapse', 'form-toggle-collapse', 'proxy-query', 'proxy-delete', 'proxy-save', 'toolbar-button-click', 'toolbar-tool-click', 'zoom']
