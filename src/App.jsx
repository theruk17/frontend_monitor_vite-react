import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios'
import Navbar from './components/Navbar'
import { NumericFormat } from 'react-number-format';
import './App.css'
import pic from './assets/Rectangle-1.jpg'

const API_URL = 'https://drab-jade-haddock-toga.cyclic.app/monitor'

function App() {
  const [data, setData] = useState([]);
  const [groups, setGroups] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    axios.get(API_URL)
      .then(response => {
        setData(response.data)
        setLoading(false)

        // group the data by a certain property
        const groups = response.data.reduce((acc, item) => {
          const group = item.mnt_group;
          if (!acc[group]) {
            acc[group] = [];
          }
          acc[group].push(item);
          return acc;
        }, {});

        setGroups(groups);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  
  return (

    <div>
      <Navbar />
      {loading ? (
        <div className="animate-pulse w-6 h-6 mx-auto">LOADING</div>
        ) : (
      <div className="bg-gradient-to-b from-rose-800 to-slate-900">
        <div className="mx-auto max-w-full py-4 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-lg sm:text-3xl text-center pb-1 font-bold text-white">ซื้อเครื่องคอมพิวเตอร์พร้อมจอได้ราคาพิเศษ</h1>
        
        {Object.keys(groups).map(group => (
          
          <div key={group} className="container mx-auto bg-white shadow rounded-lg mb-2">
            <div className="px-4 py-5 sm:px-6">
              <div className="h-10 w-full mb-2">
                <img className="static h-full" src={pic} alt="" />
                <div className='bg-gradient-to-r from-custom_red1 to-custom_red2 h-1'></div>
                <div className='relative bottom-9 left-9 text-white font-bold text-2xl'>{group}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-6">
                {groups[group].map(item => (
                  <a key={item.mnt_id} href={item.mnt_href} target="_blank" className="group">
                    <div className="aspect-w-2 aspect-h-1 w-full overflow-hidden rounded-lg xl:aspect-w-7 xl:aspect-h-8">
                      <div>
                      <p className="whitespace-nowrap text-lg sm:text-xl font-bold text-center text-black">{item.mnt_brand}</p>
                      <p className="text-xs text-center text-black">{item.mnt_model}</p>
                      <p className="text-sm text-center text-red-600 font-bold">{item.mnt_size}" {item.mnt_panel} {item.mnt_refresh_rate}Hz</p>
                      <p className="text-sm text-center text-black font-bold">{item.mnt_resolution}</p>
                      </div>
                      <div>
                        <img
                          src={item.mnt_img}
                          alt={item.mnt_model}
                          className=" aspect-square relative h-full w-full object-cover object-center group-hover:opacity-75"
                        />
                        </div>
                        <div>
                        
                        <p className="text-center text-xs text-gray-600">ราคาปกติ <NumericFormat value={item.mnt_price_srp} thousandSeparator="," displayType="text" />.-</p>
                        <p className="leading-normal text-sm text-center font-light text-black">ราคาพร้อมเครื่อง</p>
                        <p className="leading-none text-2xl text-center font-bold text-red-600"><NumericFormat value={item.mnt_price_w_com} thousandSeparator="," displayType="text" />.-</p>
                    </div>
                    </div>
                  </a>
                ))}
              </div>
              
            </div>
          </div>
          ))}
      
        </div>
      </div>
      )}
    </div>
  )
}

export default App
