import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [fetchURL, setFetchURL] = useState("https://edvantage.up.railway.app/authors")

  const [authors, setAuthors] = useState<Author[]>([]);
  const [jokes, setJokes] = useState<Joke[]>([]);

  interface Author {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  }
  interface Joke {
    id: number;
    setup: string;
    punchline: string;
  }

  useEffect(() => {
    fetch("https://edvantage.up.railway.app/authors")
      .then((response) => response.json())
      .then((data) => setAuthors(data))
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    fetch("https://edvantage.up.railway.app/jokes")
      .then((response) => response.json())
      .then((data) => setJokes(data))
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
        <div className="flex gap-2">
          <button
            onClick={() => setFetchURL("https://edvantage.up.railway.app/authors")}
            className="max-w-fit"
            disabled={fetchURL == "https://edvantage.up.railway.app/authors"}>
            Authors
          </button>
          <button
            onClick={() => setFetchURL("https://edvantage.up.railway.app/jokes")}
            className="max-w-fit"
            disabled={fetchURL == "https://edvantage.up.railway.app/jokes"}>
            Jokes 
          </button>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <h2>Fetching from <a href={fetchURL} target="_blank">{fetchURL}</a></h2>
        <div className="border border-white/60 rounded-2xl p-1.5">
          <table>
            <thead>
              {fetchURL == "https://edvantage.up.railway.app/authors" && <tr>
                <th className="p-2">ID</th>
                <th className="p-2">First Name</th>
                <th className="p-2">Last Name</th>
                <th className="p-2">Email</th>
              </tr>}
              {fetchURL == "https://edvantage.up.railway.app/jokes" && <tr>
                <th className="p-2">ID</th>
                <th className="p-2">Setup</th>
                <th className="p-2">Punchline</th>
              </tr>}
            </thead>
            <tbody>
              {fetchURL == "https://edvantage.up.railway.app/authors" &&  authors.map((author) => (
                <tr key={author.id}>
                  <td className="p-2">{author.id}</td>
                  <td className="p-2">{author.first_name}</td>
                  <td className="p-2">{author.last_name}</td>
                  <td className="p-2">{author.email}</td>
                </tr>
              ))}
              {fetchURL == "https://edvantage.up.railway.app/jokes" &&  jokes.map((joke) => (
                <tr key={joke.id}>
                  <td className="p-2">{joke.id}</td>
                  <td className="p-2">{joke.setup}</td>
                  <td className="p-2">{joke.punchline}</td>
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
