const paginate = (data, itemsPerPage) => {
  if (data && data.length > 0) {
    const pagesCount = Math.ceil(data.length / itemsPerPage)

    /* pagination with mutating the source
    const newProducts = Array.from({ length: pagesCount }, () => {
        return data.splice(0, itemsPerPage)
    })
    */

    // pagination without mutating the source
    return Array.from({ length: pagesCount }, (_, index) => {
      const start = index * itemsPerPage
      return data.slice(start, start + itemsPerPage)
    })
  }
  return [[]]
}

export default paginate
