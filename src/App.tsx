import React, { useEffect, useState } from 'react'
import './App.css'

const endpoint = new URL('https://randomuser.me/api/?results=20')

interface User {
  name: string
  address: string
}

function getFlatAddress(user: any): string {
  const { street, city, postcode, state, country, ...rest } = user.location
  let address = `${street.name} ${street.number} - ${city} ${postcode} - ${state} ${country}`
  return address
}

function useFetch(endpoint: URL): any {
  const [res, setRes] = useState<JSON>()
  useEffect(() => {
    fetch(endpoint.href)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP${res.status}`)
        }
        return res.json()
      })
      .then(json => setRes(json))
      .catch(error => console.log(error))
  }, [endpoint])
  return res && res
}

function App() {
  const [users, setUsers] = useState<User[]>([])
  const res = useFetch(endpoint)
  let usersArray: any[] = res ? res.results : []

  useEffect(() => {
    try {
      if (usersArray.length < 1) return
      const newUsers: User[] = usersArray.map(user => {
        return {
          name: `${user.name.title} ${user.name.first} ${user.name.last}`,
          address: getFlatAddress(user)
        }
      })
      setUsers(newUsers)
    } catch (error) {
      console.log(error)
    }
  }, [usersArray])

  return (
    <div className="App">
      <h1>Hello Sandbox</h1>
      <h2>StartEditing to see how you suck</h2>
      <section className="flat-users">
        {users.length > 0 && (
          <table className="container" id="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => {
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
