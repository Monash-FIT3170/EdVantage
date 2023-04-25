import React from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


const Public = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [fetchURL, setFetchURL] = useState(backendUrl + "authors")

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
        fetch(backendUrl + "authors")
            .then((response) => response.json())
            .then((data) => setAuthors(data))
            .catch((error) => console.error(error));
    }, []);
    useEffect(() => {
        fetch(backendUrl + "jokes")
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
                        onClick={() => setFetchURL(backendUrl + "authors")}
                        className="max-w-fit"
                        disabled={fetchURL == (backendUrl + "authors")}>
                        Authors
                    </button>
                    <button
                        onClick={() => setFetchURL(backendUrl + "jokes")}
                        className="max-w-fit"
                        disabled={fetchURL == (backendUrl + "jokes")}>
                        Jokes
                    </button>
                </div>
                <h2>Fetching from <a href={fetchURL} target="_blank">{fetchURL}</a></h2>
                <div className="border border-white/60 rounded-2xl p-1.5">
                    <table>
                        <thead>
                            {fetchURL == (backendUrl + "authors") && <tr>
                                <th className="p-2">ID</th>
                                <th className="p-2">First Name</th>
                                <th className="p-2">Last Name</th>
                                <th className="p-2">Email</th>
                            </tr>}
                            {fetchURL == (backendUrl + "jokes") && <tr>
                                <th className="p-2">ID</th>
                                <th className="p-2">Setup</th>
                                <th className="p-2">Punchline</th>
                            </tr>}
                        </thead>
                        <tbody>
                            {fetchURL == (backendUrl + "authors") && authors.map((author) => (
                                <tr key={author.id}>
                                    <td className="p-2">{author.id}</td>
                                    <td className="p-2">{author.first_name}</td>
                                    <td className="p-2">{author.last_name}</td>
                                    <td className="p-2">{author.email}</td>
                                </tr>
                            ))}
                            {fetchURL == (backendUrl + "jokes") && jokes.map((joke) => (
                                <tr key={joke.id}>
                                    <td className="p-2">{joke.id}</td>
                                    <td className="p-2">{joke.setup}</td>
                                    <td className="p-2">{joke.punchline}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex gap-2">
                    <Link to="/login/style1" className="" >login 1</Link>
                    <Link to="/login/style2" className="" >login 2</Link>
                </div>
            </div>
            <p className="text-[#888]">
                Click on the Vite and React logos to learn more
            </p>
        </div>
    )
}

export default Public