/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css"
import { Multiselect } from "./Multiselect"

const input = "Sales:0,Calls:0,Samples:0"

const filterByVariable = (variable: string) => (value: string) => {
  console.log(variable, value)
}

function App() {
  const handleFilter = (result: string) => {
    filterByVariable("qVariable")(result)
  }

  return (
    <div className="ms-container">
      <Multiselect title={"Title"} input={input} onUpdate={handleFilter} enableClear />
    </div>
  )
}

export default App
