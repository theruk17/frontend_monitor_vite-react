import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios'
import Navbar from './components/navbar'
import { NumericFormat } from 'react-number-format';
import './App.css'

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts();
  }, [])

  const fetchProducts = async () => {
    await axios.get(`https://drab-jade-haddock-toga.cyclic.app/monitor`).then(({ data }) => {
      setProducts(data);
    })
  }

  return (

    <div>
      <Navbar />

      <div className="bg-gradient-to-b from-rose-800 to-slate-900">
        <div className="mx-auto max-w-full py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="container mx-auto bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-6">
                {products.map((product) => (
                  <a key={product.mnt_id} href={product.mnt_href} target="_blank" className="group">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg xl:aspect-w-7 xl:aspect-h-8">
                      <p className="text-2xl font-bold text-center text-black">{product.mnt_brand}</p>
                      <p className="text-sm text-center text-black">{product.mnt_model}</p>
                      <p className="text-sm text-center text-red-600">{product.mnt_size}" {product.mnt_panel} {product.mnt_refresh_rate}Hz</p>
                      <p className="text-sm text-center text-black">{product.mnt_resolution}</p>
                      <div className="border-t border-gray-200">
                        <img
                          src={product.mnt_img}
                          alt={product.mnt_model}
                          className="h-full w-full object-cover object-center group-hover:opacity-75"
                        />
                      </div>
                      <div className="border-t border-gray-200">
                        <p className="leading-normal text-sm text-center font-light text-black">ราคาเพียง</p>
                        <p className="leading-none text-2xl text-center font-bold text-red-600"><NumericFormat value={product.mnt_price_srp} thousandSeparator="," displayType="text" />.-</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
