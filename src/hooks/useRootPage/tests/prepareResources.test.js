import prepareResources from '../prepareResources'
import devData from '../../../../devData.json'


describe('prepareResources', () => {
  it('matches the snapshot', () => {
    expect(
      prepareResources(devData)
    ).toMatchSnapshot()
  })
})
