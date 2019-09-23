import filterPages from './index'


describe('filterPages', () => {
  it('filters unpublished pages by default', () => {
    const testPages = [
      {
        id: 1,
        published: true,
      },
      {
        id: 2,
        published: false,
      },
    ]

    expect(
      filterPages(testPages)
    ).toEqual(
      [
        testPages[0],
      ]
    )
  })

  it('filters entries with children', () => {
    const testPages = [
      {
        id: 1,
        published: true,
        childPages: [
          'a',
        ],
      },
      {
        id: 2,
        published: true,
        childPages: [],
      },
    ]

    expect(
      filterPages(testPages, {
        hasChildren: true,
      })
    ).toEqual(
      [
        testPages[0],
      ]
    )
  })

  it('filters entries without children', () => {
    const testPages = [
      {
        id: 1,
        published: true,
        childPages: [
          'a',
        ],
      },
      {
        id: 2,
        published: true,
        childPages: [],
      },
    ]

    expect(
      filterPages(testPages, {
        hasChildren: false,
      })
    ).toEqual(
      [
        testPages[1],
      ]
    )
  })

  it('filters entries with other props', () => {
    const testPages = [
      {
        id: 1,
        published: true,
        foo: false,
      },
      {
        id: 2,
        published: true,
        foo: true,
      },
      {
        id: 3,
        published: true,
      },
    ]

    expect(
      filterPages(testPages, {
        foo: true,
      })
    ).toEqual(
      [
        testPages[1],
      ]
    )

    expect(
      filterPages(testPages, {
        foo: false,
      })
    ).toEqual(
      [
        testPages[0],
      ]
    )
  })
})
