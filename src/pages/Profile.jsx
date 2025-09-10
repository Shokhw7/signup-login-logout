import { sendEmailVerification, updateProfile } from "firebase/auth";
import { useSelector } from "react-redux";
import { auth, db } from "../firebase/config";
import { useCollection } from "../hooks/useCollection";
import getRandomGradientImage from "../utils";
import { doc, updateDoc } from "firebase/firestore";

function Profile() {
  const { user } = useSelector((store) => store.user);
  const { data } = useCollection("users", null, [
    "uid",
    "==",
    auth.currentUser.uid,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const bgImage = formData.get("bgImage");
    const userRef = doc(db, "users", user.uid);

    await updateDoc(userRef, { bgURL: bgImage });
    alert("Profile updated ✅");
  };

  const sendEmailLink = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => alert("Check Your Email"))
      .catch((error) => alert(error.message));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full relative">
        <img
          src={data?.[0]?.bgURL ? data[0].bgURL : getRandomGradientImage()}
          alt="cover"
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

      <div className="mt-16 w-full max-w-lg bg-white rounded-2xl shadow p-6 space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            {user.displayName}
          </h2>
          <p className="text-gray-500">{user.email}</p>
        </div>

        <div className="text-center">
          {user.emailVerified ? (
            <p className="text-green-600 font-medium">Email Verified ✅</p>
          ) : (
            <div className="space-y-2">
              <p className="text-red-500">Email Not Verified ❌</p>
              <button
                onClick={sendEmailLink}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Send Verification Link
              </button>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 items-center"
        >
          <input
            type="text"
            name="bgImage"
            placeholder="Enter new background image URL"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Set Background
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
