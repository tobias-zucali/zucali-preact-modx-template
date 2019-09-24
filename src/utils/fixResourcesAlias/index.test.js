import fixResourcesAlias from './index'


describe('fixResourcesAlias', () => {
  it('does not change correct alias', () => {
    const correctAliases = [
      { alias: 'abc' },
    ]
    expect(fixResourcesAlias(
      correctAliases
    )).toEqual(
      correctAliases
    )
  })

  it('fixes umlauts', () => {
    expect(fixResourcesAlias([
      { alias: 'über' },
      { alias: 'möglich' },
      { alias: 'MÄHEN' },
    ])).toEqual([
      { alias: 'ueber' },
      { alias: 'moeglich' },
      { alias: 'MAEHEN' },
    ])
  })

  it('replaces whitespaces', () => {
    expect(fixResourcesAlias([
      { alias: 'ich bin ' },
      { alias: '  nicht' },
    ])).toEqual([
      { alias: 'ich-bin-' },
      { alias: '--nicht' },
    ])
  })

  it('replaces other characters', () => {
    expect(fixResourcesAlias([
      { alias: 'aber#da' },
      { alias: 'ich/bin/da' },
    ])).toEqual([
      { alias: 'aber-da' },
      { alias: 'ich-bin-da' },
    ])
  })
})
