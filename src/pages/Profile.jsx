import { sendEmailVerification, updateProfile } from "firebase/auth";
import { useSelector } from "react-redux";
import { auth, db } from "../firebase/config";
import { useCollection } from "../hooks/useCollection";
import getRandomGradientImage from "../utils";
import { doc, updateDoc } from "firebase/firestore";
import { useRef, useState } from "react";
// import { Pencil } from "lucide-react";

function Profile() {
  const { user } = useSelector((store) => store.user);
  const { data } = useCollection("users", null, [
    "uid",
    "==",
    auth.currentUser.uid,
  ]);

  // const [editing, setEditing] = useState(false);
  // const [newName, setNewName] = useState(user.displayName || "");
  // const [newPhoto, setNewPhoto] = useState(user.photoURL || "");

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const bgImage = formData.get("bgImage");

  const userRef = doc(db, "users", user.uid);

  await updateDoc(userRef, {
    bgURL: bgImage,
  });

  // await updateProfile(auth.currentUser, {
  //   displayName: newName,
  //   photoURL: newPhoto,
  // });

  alert("Profile updated ✅");
};

  const sendEmailLink = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        alert("Check Your Email");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div>
      <img
        src={data?.[0]?.bgURL ? data[0].bgURL : getRandomGradientImage()}
        alt=""
        style={{ height: "400px", width: "100%", objectFit: "cover" }}
      />

      <form onSubmit={handleSubmit}>
        <input type="text" name="bgImage" />
        <button>Set bg-image</button>
      </form>

      <img src={user.photoURL} alt="" width={100} height={100} />
      <h3>{user.displayName}</h3>

      <div>
        <h3>{user.email}</h3>
        <small>
          {user.emailVerified ? (
            <p>Email Verified ✅</p>
          ) : (
            <>
              <p>Email Not Verified</p>
              <button onClick={sendEmailLink}>Send Verification Link</button>
            </>
          )}
        </small>
      </div>

      

    </div>
  );
}

export default Profile;
