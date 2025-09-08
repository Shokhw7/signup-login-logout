import { useSelector } from "react-redux";
import { useLogout } from "../hooks/useLogout";

import { useCollection } from "../hooks/useCollection";
import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const { _logout, error, isPending } = useLogout();
  const { user } = useSelector((store) => store.user);
  const { data: users } = useCollection("users");
  const { data: tasks } = useCollection("tasks", "asc");

  const [showUsers, setShowUsers] = useState(true);

  return (
    <div className="flex h-screen bg-base-200 text-base-content">
      <aside className="w-64 bg-base-100 border-r flex flex-col p-4">
        <div className="flex flex-col items-center space-y-2 mb-6">
          <img
            className="w-16 h-16 rounded-full"
            src={user.photoURL}
            alt="profile"
          />
          <h2 className="font-bold">{user.displayName}</h2>
        </div>

        <Link to="/create" className="btn btn-primary w-full mb-2">
          + New Task
        </Link>

        {error && <div className="text-error text-sm">{error}</div>}

        <button
          onClick={_logout}
          disabled={isPending}
          className="btn btn-outline w-full mb-2"
        >
          {isPending ? "Loading..." : "Logout"}
        </button>

        <button
          className="btn btn-ghost w-full"
          onClick={() => setShowUsers(!showUsers)}
        >
          {showUsers ? "Hide Users" : "Show Users"}
        </button>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Tasks</h1>
        <ul className="space-y-4">
          {tasks &&
            tasks.map((task) => (
              <li
                key={task.id || task.uid}
                className="border rounded-lg p-4 bg-base-100 hover:shadow-md transition"
              >
                <Link to={`/task/${task.id || task.uid}`}>
                  <h5 className="font-semibold text-lg">{task.title}</h5>
                  <div className="flex items-center gap-1 mt-2">
                    {task.attachedUsers?.map((u, index) => (
                      <img
                        key={index}
                        src={u.photoURL}
                        alt={u.displayName}
                        className="w-6 h-6 rounded-full border"
                      />
                    ))}
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </main>

      {showUsers && (
        <div className="w-64 bg-base-100 border-l p-4 overflow-y-auto">
          <h3 className="font-bold mb-4">Users</h3>
          <div className="space-y-3">
            {users &&
              users.map((u) => (
                <div
                  key={u.uid}
                  className="flex items-center gap-3 border-b pb-2"
                >
                  <img
                    className="w-8 h-8 rounded-full"
                    src={u.photoURL}
                    alt={u.displayName}
                  />
                  <h4 className="font-medium">{u.displayName}</h4>
                  <div
                    className={`ml-auto w-2 h-2 rounded-full ${
                      u.online ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
