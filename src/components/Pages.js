import React, { useCallback, useEffect } from 'react'
import { useMyContext } from '../Context'

const Pages = ({
  dataPage,
  data,
  pageNumber,
  setPageNumber,
  currentSetArray,
  setCurrentSetArray,
  currentSet,
}) => {
  const { page, setPage, pageCount } = useMyContext()

  const setButtons = useCallback(() => {
    if (data && data.length > 0) {
      const btnArray = []
      const start = currentSet.current * 5
      const end = start + 5
      for (let i = start; i < end; i++) {
        if (data[i]) {
          btnArray.push(
            <button
              className='page-btn'
              key={i}
              onClick={() => setPageNumber(i)}
            >
              {i + 1}
            </button>
          )
        }
      }
      setCurrentSetArray(btnArray)
    }
  }, [currentSet, data, setCurrentSetArray, setPageNumber])

  useEffect(() => {
    setButtons()
  }, [setButtons])

  const nextPageSet = () => {
    if (currentSet.current + 1 < Math.ceil(data.length / 5)) {
      currentSet.current++
      setButtons()
      setPageNumber(currentSet.current * 5)
    }
  }
  const prevPageSet = () => {
    if (currentSet.current > 0) {
      currentSet.current--
      setButtons()
      setPageNumber(currentSet.current * 5)
    }
  }

  return (
    <>
      <div className='pages-container'>
        <div
          className='btn-container'
          style={{
            marginBottom: '0.5rem',
            flexDirection: 'column',
            rowGap: '0.5rem',
          }}
        >
          <h4 className='info-btn'>
            <span>API Page : </span>
            {page} of {pageCount}
          </h4>
          <div className='info-navigate'>
            <h4
              className='info-btn-arrow'
              onClick={() => {
                if (page > 1) setPage(page - 1)
              }}
            >{`<<<`}</h4>
            <h4
              className='info-btn'
              style={{ width: '5rem', textAlign: 'center' }}
            >
              {page}
            </h4>
            <h4
              className='info-btn-arrow'
              onClick={() => {
                if (page < pageCount) setPage(page + 1)
              }}
            >{`>>>`}</h4>
          </div>
          <h4 className='info-navigate'>
            <span className='info-btn'>enter a number</span>
            <input
              className='info-btn'
              type='text'
              placeholder='here'
              onKeyUp={(e) => {
                if (e.key === 'Enter' || e.keyCode === 13) {
                  e.preventDefault()
                  const value = parseInt(e.target.value)
                  if (value && value > 0 && value <= pageCount) setPage(value)
                }
              }}
            />
          </h4>
        </div>
        <div
          className='btn-container'
          style={{
            marginBottom: '0.5rem',
            flexDirection: 'column',
            rowGap: '0.5rem',
          }}
        >
          <h4 className='info-btn'>
            <span>results : </span>
            {dataPage.length} of {data.flat().length}
          </h4>
          <h4 className='info-btn'>
            <span>page number : </span>
            {pageNumber + 1} of {data.length}
          </h4>
          <h4 className='info-btn'>
            <span>pageset number : </span>
            {currentSet.current + 1} of {Math.ceil(data.length / 5)}
          </h4>
        </div>
      </div>
      <div className='btn-container'>
        <button className='prev-btn' onClick={prevPageSet}>{`<<<`}</button>
        {currentSetArray}
        <button className='next-btn' onClick={nextPageSet}>{`>>>`}</button>
      </div>
    </>
  )
}

export default Pages
