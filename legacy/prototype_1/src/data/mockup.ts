import { Group } from "./interfaces"
import { getGroupStructure } from "./groupStructure"

let cachedData: Group[] | null = null
let dataPromise: Promise<Group[]> | null = null

const fetchData = async (): Promise<Group[]> => {
  if (cachedData) {
    return cachedData
  }
  if (!dataPromise) {
    dataPromise = getGroupStructure().then(data => {
      cachedData = data
      return data
    })
  }
  return dataPromise
}

const mockDataProxy = new Proxy([] as Group[], {
  get(target, prop) {

    if (typeof Array.prototype[prop as keyof typeof Array.prototype] === "function") {
      return Array.prototype[prop as keyof typeof Array.prototype].bind(target)
    }

    if (target.length === 0) {
      if (cachedData) {
        target.push(...cachedData)
      } else {
        fetchData().then(data => {
          target.splice(0, target.length, ...data)
        })
      }
    }

    return target[prop as keyof typeof target]
  },
})

export const mockData = mockDataProxy