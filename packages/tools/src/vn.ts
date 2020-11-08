function getOnName (type: string) {
  return 'on' + type.substring(0, 1).toLocaleUpperCase() + type.substring(1)
}

export const VNTools = {
  getOnName
}

export default VNTools
