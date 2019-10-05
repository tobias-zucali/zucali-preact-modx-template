import prepareResources, { parseIdString, getResourcesById, getAllChildIds } from '../prepareResources'
import devData from '../../../../devData.json'

describe('prepareResources', () => {
  it('parses an id string', () => {
    expect(
      parseIdString('19||136')
    ).toEqual(
      [19, 136])
  })
  it('sorts resources by id', () => {
    expect(
      getResourcesById(devData)
    ).toMatchSnapshot()
  })
  it('prepares child ids', () => {
    expect(
      getAllChildIds(
        getResourcesById(devData)
      )
    ).toMatchSnapshot()
  })
  it('prepares pages', () => {
    expect(
      prepareResources(devData)
    ).toMatchSnapshot()
  })
})
