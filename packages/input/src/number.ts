import XEUtils from 'xe-utils'

export function handleNumber (val: string | number) {
  return XEUtils.isString(val) ? val.replace(/,/g, '') : val
}

export function toFloatValueFixed (inputValue: string | number, digitsValue: number) {
  if (/^-/.test('' + inputValue)) {
    return XEUtils.toFixed(XEUtils.ceil(inputValue, digitsValue), digitsValue)
  }
  return XEUtils.toFixed(XEUtils.floor(inputValue, digitsValue), digitsValue)
}
