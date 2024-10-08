import { useState } from "react";
import "./App.css";

const users = [
  {
    name: "Ralf",
  },
  {
    name: "Stacy",
  },
  {
    name: "Ladan",
  },
];

const simulateFetch = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        console.log("promise failed");
        reject("Fehler");
      } else {
        console.log("promise resolved!");
        resolve(users);
      }
    }, 5000);
  });
};

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

  // async / await Schreibweise
  async function handleSimulateFetch() {
    try {
      const promise = simulateFetch();
      console.log("promise:", promise);
      const data = await promise;
      console.log("promise:", promise);
    } catch (err) {
      console.log(err);
    }
  }

  function handleSimulateFetchThen() {
    console.log("start");
    simulateFetch()
      .then((data) => {
        console.log("This happens in success case");
        console.log(data);
      })
      .catch((err) => {
        console.log("This happens in error case");
        console.log(err);
      })
      .finally(() => {
        console.log("This happens in any case");
      });
    console.log("end");
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
      <button onClick={handleSimulateFetchThen}>Call simulateFetch</button>
      <button
        onClick={() => {
          console.log("I did something");
        }}
      >
        Do something
      </button>
    </>
  );
}

export default App;
