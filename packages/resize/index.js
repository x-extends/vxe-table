import ResizeMethods from './src/resize'
import { ResizeEvent } from '../tools'

ResizeMethods.install = function () {
  Object.assign(ResizeEvent, ResizeMethods)
}

export const Resize = ResizeMethods
export default ResizeMethods
