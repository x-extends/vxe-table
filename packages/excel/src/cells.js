import XEUtils from 'xe-utils'
import { UtilTools } from '../../tools'

const rowHeight = 24

function getCursorPosition (textarea) {
  let rangeData = { text: '', start: 0, end: 0 }
  if (textarea.setSelectionRange) {
    rangeData.start = textarea.selectionStart
    rangeData.end = textarea.selectionEnd
    rangeData.text = (rangeData.start !== rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end) : ''
  } else if (document.selection) {
    let index = 0
    let range = document.selection.createRange()
    let textRange = document.body.createTextRange()
    textRange.moveToElementText(textarea)
    rangeData.text = range.text
    rangeData.bookmark = range.getBookmark()
    for (; textRange.compareEndPoints('StartToStart', range) < 0 && range.moveStart('character', -1) !== 0; index++) {
      if (textarea.value.charAt(index) === '\n') {
        index++
      }
    }
    rangeData.start = index
    rangeData.end = rangeData.text.length + rangeData.start
  }
  return rangeData
}
function setCursorPosition (textarea, rangeData) {
  if (textarea.setSelectionRange) {
    textarea.focus()
    textarea.setSelectionRange(rangeData.start, rangeData.end)
  } else if (textarea.createTextRange) {
    let textRange = textarea.createTextRange()
    if (textarea.value.length === rangeData.start) {
      textRange.collapse(false)
      textRange.select()
    } else {
      textRange.moveToBookmark(rangeData.bookmark)
      textRange.select()
    }
  }
}

export default {
  cell: {
    autofocus: '.vxe-textarea',
    renderEdit (h, editRender, params, { $excel }) {
      let { excelStore } = $excel
      let { uploadRows } = excelStore
      let { row, column } = params
      let { model } = column
      return [
        h('div', {
          class: 'vxe-input--wrapper vxe-excel-cell',
          style: {
            height: `${column.renderHeight - 1}px`
          }
        }, [
          h('textarea', {
            class: 'vxe-textarea',
            style: {
              width: `${column.renderWidth}px`
            },
            domProps: {
              value: model.value
            },
            on: {
              input (evnt) {
                let inpElem = evnt.target
                model.update = true
                model.value = inpElem.value
                if (inpElem.scrollHeight > inpElem.offsetHeight) {
                  if (uploadRows.indexOf(row) === -1) {
                    inpElem.style.width = `${inpElem.offsetWidth + 20}px`
                  } else {
                    inpElem.style.height = `${inpElem.scrollHeight}px`
                  }
                }
              },
              change (evnt) {
                if (uploadRows.indexOf(row) === -1) {
                  uploadRows.push(row)
                }
              },
              keydown (evnt) {
                let inpElem = evnt.target
                if (evnt.altKey && evnt.keyCode === 13) {
                  evnt.preventDefault()
                  evnt.stopPropagation()
                  let rangeData = getCursorPosition(inpElem)
                  let pos = rangeData.end
                  let cellValue = inpElem.value
                  cellValue = `${cellValue.slice(0, pos)}\n${cellValue.slice(pos, cellValue.length)}`
                  inpElem.value = cellValue
                  model.update = true
                  model.value = cellValue
                  inpElem.style.height = `${(Math.floor(inpElem.offsetHeight / rowHeight) + 1) * rowHeight}px`
                  setTimeout(() => {
                    rangeData.start = rangeData.end = ++pos
                    setCursorPosition(inpElem, rangeData)
                  })
                }
              }
            }
          })
        ])
      ]
    },
    renderCell (h, editRender, params) {
      let { row, column } = params
      return [
        h('span', {
          domProps: {
            innerHTML: XEUtils.escape(UtilTools.getCellValue(row, column)).replace(/\n/g, '<br>')
          }
        })
      ]
    }
  }
}
