import React, { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://docfserver-df4bbe38343d.herokuapp.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Erro ao buscar usuários:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Usuários</h1>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.user_name}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
