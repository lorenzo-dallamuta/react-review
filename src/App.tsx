import React, { useEffect, useState } from 'react'
import './App.css'

const endpoint = 'https://randomuser.me/api/?results=20'

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch(endpoint)
      .then(response => response.json())
      .then(data => setUsers(data.results))
  }, [])
  return (
    <div className="App">
      <h1>Hello Sandbox</h1>
      <h2>StartEditing to see how you suck</h2>
      <section className="flat-users">
        {users.length > 0 && (
          <table className="container" id="users-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>First Name</th>
                <th>Last Name</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any, idx) => {
                return (
                  <tr key={idx}>
                    <td className="col-md-4">{user.name.title}</td>
                    <td className="col-md-4">{user.name.first}</td>
                    <td className="col-md-4">{user.name.last}</td>
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
