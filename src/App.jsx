import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios'
import './App.css'

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts();
  }, [])

  const fetchProducts = async () => {
    await axios.get(`https://drab-jade-haddock-toga.cyclic.app/monitor`).then(({data}) => {
      setProducts(data);
    })
  }

  return (
    
    <div>
      {products.map((row, key) => (
        <p className="text-3xl font-bold underline" key={key}>{row.mnt_brand}</p>
      ))}
      
    </div>
  )
}

export default App
