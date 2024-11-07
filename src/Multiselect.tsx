/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FC, useEffect, useState } from "react"
import { RiEraserLine } from "react-icons/ri"

// "Sales:0,Calls:0,Samples:0"

interface MultiselectProps {
  title: string
  input: string
  onUpdate: (value: string) => void
  enableClear?: boolean
}

interface Item {
  name: string
  value: number
}

export const Multiselect: FC<MultiselectProps> = ({
  title,
  input,
  onUpdate,
  enableClear = true
}) => {
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

  const handleClear = () => {
    setItems(prev => {
      return prev.map(item => {
        return { name: item.name, value: 0 }
      })
    })
  }

  useEffect(() => {
    const parsed = parseOut(items)
    if (parsed === input) return
    onUpdate(parsed)
  }, [items])

  if (!items) return null

  return (
    <div className="multiselect">
      <header>
        <h3>{title}</h3>
        {enableClear && (
          <button type="button" className="btn-clear" onClick={handleClear}>
            <RiEraserLine />
          </button>
        )}
      </header>
      <section>
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
      </section>
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
