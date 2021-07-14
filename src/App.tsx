import React, { useEffect, useMemo, useState } from 'react'
import './App.css'

// TODO: for order (default, ascending, descending) consider using a
// state machine, useMachine hook in the @xstate/react package, example:
// https://mastery.games/post/state-machines-in-react/

const endpoint = new URL('https://randomuser.me/api/?results=20')

type User = {
  name: string
  address: string
}

enum Order {
  default,
  ascending,
  descending
}

type Sort = {
  order: number
  property: 'name' | 'address'
}

function getFlatAddress(user: any): string {
  const { street, city, postcode, state, country, ...rest } = user.location
  let address = `${street.name} ${street.number} - ${city} ${postcode} - ${state} ${country}`
  return address
}

function useFetch(endpoint: URL): any {
  const [response, setResponse] = useState<JSON>()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(endpoint.href)
        if (!res.ok) throw new Error(`HTTP${res.status}`)
        const data = await res.json()
        setResponse(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [endpoint])
  return response && response
}

function getUsers(users: any[]): User[] | null {
  try {
    const newUsers: User[] = users.map(user => {
      return {
        name: `${user.name.first} ${user.name.last}`,
        address: getFlatAddress(user)
      }
    })
    return newUsers
  } catch (error) {
    console.log(error)
    return null
  }
}

function useSelectors(users: User[], sort: Sort, filter: string) {
  const [sorted, setSorted] = useState<User[]>(users)
  useEffect(() => {
    if (!users) return
    const newUsers = users
      .slice()
      .filter(
        user =>
          user.name.toLowerCase().includes(filter.toLowerCase()) ||
          user.address.toLowerCase().includes(filter.toLowerCase())
      )
    if (sort.order > 0) {
      newUsers.sort((a, b) => {
        const prop = sort.property as keyof typeof a // typescript..
        const res = a[prop] < b[prop] ? -1 : 1
        return sort.order === Order.ascending ? res : -res
      })
    }
    setSorted(newUsers)
  }, [users, sort, filter])
  return sorted
}

function App() {
  const [sort, setSort] = useState<Sort>({
    order: Order.default,
    property: 'name'
  })
  const [input, setInput] = useState<string>('')
  const [filter, setFilter] = useState<string>('')
  const [validation, setValidation] = useState<boolean>(false)

  const res = useFetch(endpoint)
  const data: any[] = useMemo(() => (res ? res.results : []), [res])
  const users = useMemo(() => (data ? getUsers(data) : []), [data])
  const sorted = users ? useSelectors(users, sort, filter) : []

  function stepSort(property: 'name' | 'address') {
    const nextOrder = sort.order < 2 ? sort.order + 1 : 0
    setSort({ ...sort, property: property, order: nextOrder })
  }

  function handleFilter() {
    const regexAlphanNumeric = /^[0-9a-zA-Z]*$/
    const valid = input.match(regexAlphanNumeric) ? true : false
    setValidation(!valid)
    const newFilter = valid ? input : ''
    setFilter(newFilter)
  }

  return (
    <div className="App">
      <h1>Hello Sandbox</h1>
      <h2>StartEditing to see how you suck</h2>
      <div className="searchbar-container">
        <input
          type="text"
          className="searchbar-input"
          id="users-searchbar"
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => {
            if (e.key !== 'Enter') return
            handleFilter()
          }}
          value={input}
        />
        <button className="searchbar-button" onClick={handleFilter}>
          SEARCH
        </button>
      </div>
      {validation && (
        <p className="searchbar-validation">Only letters and numbers</p>
      )}
      <section className="flat-users">
        {sorted.length > 0 && (
          <table className="container" id="users-table">
            <thead>
              <tr>
                <th onClick={() => stepSort('name')}>Name</th>
                <th onClick={() => stepSort('address')}>Address</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((user, idx) => {
                return (
                  <tr key={idx}>
                    <td className="col-md-4">{user.name}</td>
                    <td className="col-md-4">{user.address}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </section>
    </div>
  )
}

export default App
