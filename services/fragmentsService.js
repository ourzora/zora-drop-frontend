export async function fragmentsService({ params, query }) {
  let props = {
    id: params.id,
    query: query,
    tokens: [],
    tokenRange: null,
  }

  const ids = params.id ? params.id : undefined

  let idsArr = []

  console.log(ids)

  if(ids) {
    if (ids.indexOf('...') > -1) {
      const [start, end] = ids.split('...')
      props.tokenRange = `${ids.replace('...', '-')}`
      idsArr = Array.from({ length: end - start + 1 }, (_, i) => String(i + Number(start)))
    } else {
      idsArr = ids.split(',')
    }
  }

  props.tokens = idsArr

  return {
    props,
  }
}
