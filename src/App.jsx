import { useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLoadData() {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (response.ok) {
        const data = await response.json();
        console.debug(data);
        setUsers(data);
      } else {
        console.error("Something went wrong");
        console.error("Response status", response.status);
      }
    } catch (err) {
      console.error(err);
      console.error("Something severe happened");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <h1>APIs and Data Fetching</h1>
      <button onClick={handleLoadData}>
        {isLoading ? "Loading..." : "Load Data"}
      </button>
      <ul>
        {users.map((user) => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
    </>
  );
}

export default App;
