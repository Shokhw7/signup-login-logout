import { useSelector } from "react-redux";
import { useLogOut } from "../hooks/useLogOut";
import { useCollection } from "../hooks/useCollection";
import { useState } from "react";

function Home() {
  const { _logout, error, isPending } = useLogOut();
  const { user } = useSelector((store) => store.user);
  const { data: users } = useCollection("users");

  const [showUsers, setShowUsers] = useState(false);

  return (
    <div className="home-container">
      <aside className="sidebar">
        <div className="profile-card">
          <img className="avatar" src={user.photoURL} alt="profile" />
          <h2 className="username">{user.displayName}</h2>
        </div>

        {error && <div className="error">{error}</div>}

        <button
          className={`logout-btn ${isPending ? "loading" : ""}`}
          onClick={_logout}
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Logout"}
        </button>

        <button
          className="toggle-users-btn"
          onClick={() => setShowUsers(!showUsers)}
        >
          {showUsers ? "Hide Users" : "Show Users"}
        </button>
      </aside>

      <main className="orta"></main>

      <div className={`users-sidebar ${showUsers ? "open" : ""}`}>
        <h3 className="list-title">Users</h3>
        {users &&
          users.map((u) => (
            <div key={u.uid} className="user-card">
              <img className="avatar" src={u.photoURL} alt="user" />
              <h4 className="username">{u.displayName}</h4>
              <div className={u.online ? "status online" : "status offline"}></div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;