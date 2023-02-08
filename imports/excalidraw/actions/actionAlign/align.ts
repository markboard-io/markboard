import { ExcalidrawElement } from '../../element/types'
import { newElementWith } from '../../element/mutateElement'
import { Box, getCommonBoundingBox } from '../../element/bounds'
import { getMaximumGroups } from '../../groups'

/** Defines the alignment to be applied on the elements */
export interface Alignment {
  position: 'start' | 'center' | 'end'
  axis: 'x' | 'y'
}

/* Type that represents the minimum and maximum values of either the X or Y axis */
export type MinMaxXY = ['minX' | 'minY', 'maxX' | 'maxY']

/**
 * Aligns a set of selected elements in the canvas
 * @param selectedElements an array of selected elements
 * @param alignment an object defining the alignment to be applied
 * @returns an array of ExcalidrawElement objects with updated position
 */
export const alignElements = (
  selectedElements: ExcalidrawElement[],
  alignment: Alignment
): ExcalidrawElement[] => {
  const groups: ExcalidrawElement[][] = getMaximumGroups(selectedElements)
  const selectionBoundingBox = getCommonBoundingBox(selectedElements)

  return groups.flatMap(group => {
    const translation = calculateTranslation(group, selectionBoundingBox, alignment)
    return group.map(element =>
      newElementWith(element, {
        x: element.x + translation.x,
        y: element.y + translation.y
      })
    )
  })
}

/**
 * Calculates the translation required to align the elements
 * @param group a group of elements
 * @param selectionBoundingBox a bounding box of all selected elements
 * @param alignment the alignment to be applied on the elements
 * @returns an object with x and y properties indicating the translation required
 */
const calculateTranslation = (
  group: ExcalidrawElement[],
  selectionBoundingBox: Box,
  { axis, position }: Alignment
): { x: number; y: number } => {
  const groupBoundingBox = getCommonBoundingBox(group)
  const [min, max]: MinMaxXY = axis === 'x' ? ['minX', 'maxX'] : ['minY', 'maxY']
  const noTranslation = { x: 0, y: 0 }

  switch (position) {
    case 'start':
      return {
        ...noTranslation,
        [axis]: selectionBoundingBox[min] - groupBoundingBox[min]
      }
    case 'end':
      return {
        ...noTranslation,
        [axis]: selectionBoundingBox[max] - groupBoundingBox[max]
      }
    case 'center':
      return {
        ...noTranslation,
        [axis]:
          (selectionBoundingBox[min] + selectionBoundingBox[max]) / 2 -
          (groupBoundingBox[min] + groupBoundingBox[max]) / 2
      }
    default:
      return noTranslation
  }
}
