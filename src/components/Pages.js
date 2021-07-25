import React, { useEffect } from 'react'

const Pages = ({
  dataPage,
  data,
  pageNumber,
  setPageNumber,
  currentSetArray,
  setCurrentSetArray,
  currentSet,
}) => {
  useEffect(() => {
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
  }, [data, currentSet.current])

  const nextPageSet = () => {
    if (currentSet.current + 1 < Math.ceil(data.length / 5)) {
      currentSet.current++
      setPageNumber(currentSet.current * 5)
    }
  }
  const prevPageSet = () => {
    if (currentSet.current > 0) {
      currentSet.current--
      setPageNumber(currentSet.current * 5)
    }
  }

  return (
    <>
      <div
        className='btn-container'
        style={{
          marginBottom: '0.5rem',
          flexDirection: 'column',
          rowGap: '0.5rem',
        }}
      >
        <h4
          style={{
            backgroundColor: 'lightskyblue',
            color: 'white',
            margin: '0 auto',
            display: 'inline-block',
            padding: '0.5rem 1.5rem',
            borderRadius: '0.75rem',
          }}
        >
          <span style={{ color: 'black' }}>results : </span>
          {dataPage.length} of {data.flat().length}
        </h4>
        <h4
          style={{
            backgroundColor: 'lightskyblue',
            color: 'white',
            margin: '0 auto',
            display: 'inline-block',
            padding: '0.5rem 1.5rem',
            borderRadius: '0.75rem',
          }}
        >
          <span style={{ color: 'black' }}>page number : </span>
          {pageNumber + 1} of {data.length}
        </h4>
        <h4
          style={{
            backgroundColor: 'lightskyblue',
            color: 'white',
            margin: '0 auto',
            display: 'inline-block',
            padding: '0.5rem 1.5rem',
            borderRadius: '0.75rem',
          }}
        >
          <span style={{ color: 'black' }}>pageset number : </span>
          {currentSet.current + 1} of {Math.ceil(data.length / 5)}
        </h4>
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
