import { useParams } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import getRandomGradientImage from "../utils";

function UserInfo() {
  const { id } = useParams();
  const { data } = useCollection("users", null, ["uid", "==", id]);

  const user = data?.[0];

  return (
    
    <div>
      
      {user ? (
        <>
          <img
            src={user.bgURL || getRandomGradientImage()}
            style={{ width: "100%", height: "400px", objectFit: "cover" }}
            alt="background"
          />

          <img src={user.photoURL} />
          <h2>{user.displayName}</h2>
          <p>{user.email}</p>
          <p>{user.online ? "Online ✅" : "Offline ❌"}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserInfo;
