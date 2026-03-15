"use client" // Important for the context to run on the client

import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { Group } from "@/data/interfaces"
import { mockData } from "@/data/mockup"
import { useName } from "./NameContext"

// Define the type for the context
type MockupContextType = Group[];

// Create the context
const MockupContext = createContext<MockupContextType | null>(null)

const replaceUserWithName = (obj: any, name: string): any => {
  if (typeof obj === "string") {
    return obj.replace(/USER/g, name)
  }
  if (Array.isArray(obj)) {
    return obj.map(item => replaceUserWithName(item, name))
  }
  if (typeof obj === "object" && obj !== null) {
    const newObj: any = {}
    for (const key in obj) {
      newObj[key] = replaceUserWithName(obj[key], name)
    }
    return newObj
  }
  return obj
}

// Provider for the global mockup data
export const MockupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { name } = useName()
  const [processedMockData, setProcessedMockData] = useState<MockupContextType>([])

  useEffect(() => {

    const effectiveName = name || "Noa"

    const processData = async () => {
      const data = await Promise.resolve(mockData)
      const newProcessedData = replaceUserWithName(data, effectiveName)
      setProcessedMockData(newProcessedData)
    }

    processData()
  }, [name])

  return (
    <MockupContext.Provider value={processedMockData}>
      {children}
    </MockupContext.Provider>
  )
}

// Custom Hook to access the context
export const useMockup = (): MockupContextType => {
  const context = useContext(MockupContext)
  if (context === null) {
    throw new Error("useMockup must be used within a MockupProvider")
  }
  return context
}