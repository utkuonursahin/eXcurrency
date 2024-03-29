import getData from "../../utils/getData";
import dateFormat from "../../utils/dateFormat";
import {useInput} from "../../context/InputContext";
import {useOutput} from "../../context/OutputContext";
import {useLoading} from "../../context/LoadingContext";
const Button = () => {
  const {from, to, amount} = useInput();
  const {setExchangedAmount, setExchangeRate,setHistoricalAmounts} = useOutput();
  const {loading,setLoading} = useLoading();
  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(prev => !prev)
    const response = await Promise.all([
      getData(`${window.location.href}api`,'POST', [from, to, amount]),
      getData(`${window.location.href}api/historical?date=${dateFormat(5)}&from=${from}&to=${to}`,'GET'),
      getData(`${window.location.href}api/historical?date=${dateFormat(4)}&from=${from}&to=${to}`,'GET'),
      getData(`${window.location.href}api/historical?date=${dateFormat(3)}&from=${from}&to=${to}`,'GET'),
      getData(`${window.location.href}api/historical?date=${dateFormat(2)}&from=${from}&to=${to}`,'GET'),
      getData(`${window.location.href}api/historical?date=${dateFormat(1)}&from=${from}&to=${to}`,'GET')
    ])
    const [currentRate, ...historicalRates] = response;
    setExchangedAmount(currentRate.data.response.value)
    setExchangeRate(currentRate.data.response.value / currentRate.data.response.amount)
    setHistoricalAmounts(historicalRates.map(rate => {
      return {date:rate.data.date,cur:rate.data[`${to.toLowerCase()}`]}
    }))
    setLoading(prev => !prev)
  }
  return (
    <button type="submit" onClick={handleClick}
            className="flex justify-center self-center w-1/2 p-2 sm:p-4 text-green-500 tracking-wider uppercase
            bg-gray-900 rounded text-base sm:text-lg hover:bg-zinc-900 hover:text-green-600
            transition ease-in-out duration-300">
      {loading ? <img src="/spinner.svg" alt="spinner icon" className="h-8 animate-spin"/> : 'Convert'}
    </button>
  );
};

export default Button;
