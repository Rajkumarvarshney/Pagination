import './App.css';
import React, { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://dummyjson.com/products?limit=100`)
      const data = await res.json()
      console.log(data)
      if (data && data.products) {
        setData(data.products)
      }
    }
    fetchData()

  }, [])
  const selectedPageHandler = (selectedPage) => {
    setPage(selectedPage)

  }
  return (


    <div className="App">
      <h1>Pagination </h1>
      {data.length > 0 && <div className="products">
        {
          data.slice(page * 10 - 10, page * 10).map((ele) => {
            return (
              <>             <img src={ele.thumbnail} />

              </>

            )
          })
        }
      </div>}
      {
        data.length > 0 && <div className="pagination">
          <span onClick={() => selectedPageHandler(page - 1)} className={page - 1 >= 1 ? " " : "pagination_disable"}>L</span>
          {[...Array(data.length / 10)].map((_, i) => {
            return (
              <span className={page == i + 1 ? "pagination_selected" : " "} onClick={() => { selectedPageHandler(i + 1) }}>{i + 1}</span>
            )

          })}

          <span onClick={() => selectedPageHandler(page + 1)} className={page + 1 <= data.length / 10 ? " " : "pagination_disable"}>R</span>
        </div>
      }
    </div>
  );
}

export default App;
