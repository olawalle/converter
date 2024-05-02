import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useConverter from './hooks/useConverter'

function App() {
  const {currencyConverter, allCurrencies} = useConverter()
  const [fromCurrency, setFromCurrency] = useState(allCurrencies[0] || '')
  const [toCurrency, setToCurrency] = useState(allCurrencies[1] || '')
  const [amount, setAmount] = useState('')
  const [result, setResult] = useState('')

  const covertAmountHandler = () => {
    console.log({
      fromCurrency, toCurrency
    });
    if (!!fromCurrency && !!toCurrency && !!amount) {
      try {
      const res = currencyConverter(amount, fromCurrency, toCurrency)
      setResult(res)
      } catch (error) {
        console.log(error);
        alert(error || 'Something went wrong')
      }
    } else {
      console.log({
        fromCurrency, toCurrency
      });
      alert('select 2 currencies')
    }
  }

  return (
    <div>
      <div>
          <label htmlFor="fromCurrency">Select currency A</label>
          <select name="from" id="" className='select-field' onChange={e => {
            setFromCurrency(e.target.value)
            setToCurrency('')
          }}>
          <option value="">select an option</option>
            {allCurrencies.map((currency,i) => <option key={i} value={currency}>{currency}</option>)}
          </select>
        to
        <label htmlFor="fromCurrency">Select currency A</label>
        <select name="from" id="" className='select-field' onChange={e => {
          setToCurrency(e.target.value)
        }}>
          <option value="">select an option</option>
          {allCurrencies.filter(currency => currency !== fromCurrency).map((currency,i) => <option key={i} value={currency}>{currency}</option>)}
        </select>


        <div className='input-wrapper'>
          <input type="text" onChange={e => setAmount(Number(e.target.value))} className='select-field' />
          <button className='submit-button' onClick={covertAmountHandler}>Convert</button>
        </div>

        <div>
          {result && <h1>{toCurrency} {result}</h1>}
        </div>
      </div>
    </div>
  )
}

export default App
