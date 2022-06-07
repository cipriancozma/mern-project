import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");

  const fetchUsers = async () => {
    try {
      await axios.get("http://localhost:3001/getUsers").then((res) => {
        setListOfUsers(res.data);
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = () => {
    axios
      .post("http://localhost:3001/createUser", {
        name,
        age,
        username,
      })
      .then((response) => {
        setListOfUsers([...listOfUsers, {name, age, username}]);
      });
  };

  return (
    <div className="App">
      <div className="usersDisplay">
        {listOfUsers.map((user, idx) => {
          return (
            <div key={idx}>
              <h1>Name: {user.name}</h1>
              <h3>Age: {user.age}</h3>
              <h3>Username: {user.username}</h3>
            </div>
          );
        })}
      </div>

      <div>
        <input
          type={"text"}
          placeholder="Name..."
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type={"number"}
          placeholder="Age..."
          onChange={(e) => setAge(e.target.value)}
          value={age}
        />
        <input
          type={"text"}
          placeholder="Username..."
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <button onClick={createUser}>Create user</button>
      </div>
    </div>
  );
}

export default App;
