import {createContext, useContext, useState} from "react";

const OutputContext = createContext()

const OutputProvider = ({ children }) => {
  const [exchangedAmount, setExchangedAmount] = useState(0)
  const [exchangeRate, setExchangeRate] = useState(0)
  const values = {exchangedAmount, setExchangedAmount, exchangeRate, setExchangeRate}
  return <OutputContext.Provider value={values}>{children}</OutputContext.Provider>
}
const useOutput = () => useContext(OutputContext)
export { OutputProvider, useOutput }

