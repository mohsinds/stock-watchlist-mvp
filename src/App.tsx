import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import './App.css'
import { useWatchlist } from './hooks';
import type { Stock } from './types';


function App() {
  const [count, setCount] = useState(0)
  const [inputText, setInputText] = useState("");
  const [inputDelay, setInputDelay] = useState(1000);

  const { stocks, addStock, removeStock, loading: watchlistLoading, error: watchlistError, fakeDelay, updateFakeDelay } = useWatchlist();

  useEffect(() => {

    const interval = setTimeout(() => {
      if(inputDelay > 0)
        updateFakeDelay(inputDelay);
      else
        setInputDelay(fakeDelay)
    }, 500);
    
    return () => {
      clearTimeout(interval);
    };

  }, [inputDelay]);

  const [watchtlistStocks, setWatchListStocks] = useState([
    {
      id: "kj32n",
      symbol: "GOOGL",
      name: "Google Inc.",
      price: 142.73,
      change: -6.3,
      changePercent: -1.4
    }
  ]);
  const addItem = () => {

    const symbol = inputText.trim().toUpperCase();
    if (!symbol)
      return;

    const s: Stock = {
      id: crypto.randomUUID(),
      symbol: inputText,
      name: "Dummy Name",
      price: Math.random() * 10,
      change: Math.random(),
      changePercent: Math.random()
    }
    addStock(s);
    setInputText("");
    return;


    // alert("crypto.randomUUID(): " + crypto.randomUUID())
    setWatchListStocks([...watchtlistStocks,
    {
      id: crypto.randomUUID(),
      symbol: inputText,
      name: "Google Inc.",
      price: 142.73,
      change: -6.3,
      changePercent: -1.4
    }]
    )
    setInputText("");

  };
  const watchlistItems = useMemo(() =>
    stocks.map((item: Stock) => (
      <tr key={item.id} className="border-b border-slate-700 hover:bg-slate-700/40">
        <td className="py-3 font-semibold">{item.symbol}</td>
        <td className="py-3 font-semibold">{item.name}</td>
        <td className="py-3">${item.price}</td>
        <td className={`py-3 ${item.change > 0 ? "text-green-500" : "text-red-500"
          }`}>{item.change}</td>
        <td className={`py-3 ${item.changePercent > 0 ? "text-green-500" : "text-red-500"
          }`}>{item.changePercent}%</td>
        <td className="py-3 text-right">
          <button className="text-red-400 hover:text-red-300 cursor-pointer" onClick={() => removeStock(item.id)}>
            Remove
          </button>
        </td>
      </tr>
    )), [stocks]);

  const rows = useMemo(() =>
    watchtlistStocks.map((item) => (
      <tr key={item.id} className="border-b border-slate-700 hover:bg-slate-700/40">
        <td className="py-3 font-semibold">{item.symbol}</td>
        <td className="py-3 font-semibold">{item.name}</td>
        <td className="py-3">${item.price}</td>
        <td className={`py-3 ${item.change > 0 ? "text-green-500" : "text-red-500"
          }`}>{item.change}</td>
        <td className={`py-3 ${item.changePercent > 0 ? "text-green-500" : "text-red-500"
          }`}>{item.changePercent}%</td>
        <td className="py-3 text-right">
          <button className="text-red-400 hover:text-red-300 cursor-pointer">
            Remove
          </button>
        </td>
      </tr>
    ))
    , [watchtlistStocks]);
  return (
    <>
      <div className="min-h-screen text-white p-6">

        {/* Header */}
        <h1 className="text-4xl font-bold mb-6">
          Stock Watchlist MVP ({fakeDelay}ms)
        </h1>

        {/* Card Container */}
        <div className="bg-slate-800 rounded-xl p-5 shadow-lg">

          {/* Search + Add */}
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <input
              type="text"
              placeholder="Enter stock symbol (e.g., AAPL)"
              onChange={(e) => setInputText(e.target.value)}
              value={inputText}
              className="flex-1 px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button className={`px-5 py-2 w-[140px] rounded-lg font-semibold ${watchlistLoading ? "bg-slate-600 hover:bg-slate-700 cursor-wait" : "bg-blue-600 hover:bg-blue-700 cursor-pointer"}`} onClick={addItem} disabled={watchlistLoading}>
              {watchlistLoading ? `Updating...` : `Add`}
            </button>

            <input
              type="number"
              placeholder="Delay"
              onChange={(e) => setInputDelay(parseInt(e.target.value))}
              value={inputDelay}
              className="flex-1 px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* <button className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-semibold">
              Refresh
            </button> */}
          </div>

          {/* Watchlist Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">

              <thead>
                <tr className="border-b border-slate-600 text-slate-300">
                  <th className="py-3">Symbol</th>
                  <th className="py-3">Name</th>
                  <th className="py-3">Price</th>
                  <th className="py-3">Change</th>
                  <th className="py-3">Change Percent</th>
                  <th className="py-3 text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {/* Example Row */}
                {
                  watchlistItems
                }

              </tbody>

            </table>
          </div>
        </div>
      </div>


    </>
  )
}

export default App
