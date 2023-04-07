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
        <div>
          <h2>List of Authors</h2>
          <ul>
            {authors.map((author) => (
              <li key={author.id}>{author.first_name}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
