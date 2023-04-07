import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const [authors, setAuthors] = useState<Author[]>([]);

  interface Author {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  }

  useEffect(() => {
    fetch("https://edvantage.up.railway.app/authors")
      .then((response) => response.json())
      .then((data) => setAuthors(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      <div className="flex justify-center">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card flex flex-col gap-4 items-center">
        <button onClick={() => setCount((count) => count + 1)} className="max-w-fit">
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <h2>Fetching authors from <a href="https://edvantage.up.railway.app/authors" target="_blank">https://edvantage.up.railway.app/authors</a></h2>
        <div className="border border-white/60 rounded-2xl p-1.5">
          <table>
            <thead>
              <tr>
                <th className="p-2">ID</th>
                <th className="p-2">First Name</th>
                <th className="p-2">Last Name</th>
                <th className="p-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author) => (
                <tr key={author.id}>
                  <td className="p-2">{author.id}</td>
                  <td className="p-2">{author.first_name}</td>
                  <td className="p-2">{author.last_name}</td>
                  <td className="p-2">{author.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
