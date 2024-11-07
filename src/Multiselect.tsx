/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FC, useEffect, useState } from "react"

// "Sales:0,Calls:0,Samples:0"

interface MultiselectProps {
  input: string
  callback: any
}

interface Item {
  name: string
  value: number
}

export const Multiselect: FC<MultiselectProps> = ({ input, callback }) => {
  const [items, setItems] = useState<Item[]>(parseIn(input))

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target

    setItems(prev => {
      return prev.map(item => {
        if (item.name === name) {
          return { name, value: checked ? 1 : 0 }
        }
        return item
      })
    })
  }

  useEffect(() => {
    callback(parseOut(items))
  }, [items])

  if (!items) return null

  return (
    <div className="multiselect">
      {items.map((item, index) => (
        <div key={index} className="multiselect-item">
          <input
            type="checkbox"
            id={item.name}
            name={item.name}
            checked={Boolean(item.value)}
            onChange={handleOnChange}
          />
          <label htmlFor={item.name}>{item.name}</label>
        </div>
      ))}
    </div>
  )
}

const parseIn = (input: string): Item[] => {
  return input.split(",").map(item => {
    const [name, value] = item.split(":")
    return { name, value: value === "1" ? 1 : 0 }
  })
}

const parseOut = (items: Item[]): string => {
  return items.map(item => `${item.name}:${item.value}`).join(",")
}
