import { useParams } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import getRandomGradientImage from "../utils";

function UserInfo() {
  const { id } = useParams();
  const { data } = useCollection("users", null, ["uid", "==", id]);

  const user = data?.[0];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {user ? (
        <>
          <div className="w-full relative">
            <img
              src={user.bgURL || getRandomGradientImage()}
              alt="background"
              className="h-64 w-full object-cover rounded-b-2xl shadow"
            />
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
              <img
                src={user.photoURL}
                alt="avatar"
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
            </div>
          </div>

          <div className="mt-16 w-full max-w-lg bg-white rounded-2xl shadow p-6 space-y-4 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              {user.displayName}
            </h2>
            <p className="text-gray-500">{user.email}</p>
            <p
              className={`font-medium ${
                user.online ? "text-green-600" : "text-red-500"
              }`}
            >
              {user.online ? "Online ✅" : "Offline ❌"}
            </p>
          </div>
        </>
      ) : (
        <p className="mt-20 text-gray-500 text-lg">Loading...</p>
      )}
    </div>
  );
}

export default UserInfo;
