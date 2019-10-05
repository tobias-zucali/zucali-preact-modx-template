import prepareResources, { getAllChildIds } from '../prepareResources'
import devData from '../../../../devData.json'


describe('prepareResources', () => {
  it('matches the child ids snapshot', () => {
    expect(
      getAllChildIds(devData)
    ).toMatchSnapshot()
  })
  it('matches the pages snapshot', () => {
    expect(
      prepareResources(devData)
    ).toMatchSnapshot()
  })
})
