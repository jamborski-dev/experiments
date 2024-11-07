/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css"
import { Multiselect } from "./Multiselect"

const input = "Sales:0,Calls:0,Samples:0"

const filterByVariable = (variable: string, value: string) => {
  console.log(variable, value)
}

function App() {
  const handleFilter = (result: string) => {
    console.log(result)

    filterByVariable("qVariable", result)
  }

  return (
    <>
      <Multiselect input={input} callback={handleFilter} />
    </>
  )
}

export default App
