import { useParams } from "react-router-dom";
import useDocument from "../hooks/useDocument";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useSelector } from "react-redux";

function Task() {
  const { id } = useParams();
  const { data } = useDocument("tasks", id);
  const { user } = useSelector((store) => store.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const comment = formData.get("comment");

    const commentRef = doc(db, "tasks", data.id);
    if (!comment) return;
    const newComment = {
      text: comment,
      uid: user.uid,
      id: Math.random(),
      photoURL: user.photoURL,
      displayName: user.displayName,
      createdAt: new Date().toLocaleTimeString(),
    };

    await updateDoc(commentRef, {
      comments: [...data.comments, newComment],
    });

    e.target.reset();
  };

  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Task - {data.title}</h1>

      <div className="space-y-2">
        {!data.comments || data.comments.length === 0 ? (
          <p>No Comments</p>
        ) : (
          <div className="space-y-4">
            {data.comments?.map((comment) => {
              const isCurrentUser = comment.uid === user.uid;
              return (
                <div
                  key={comment.id}
                  className={`chat ${
                    isCurrentUser ? "chat-end" : "chat-start"
                  }`}
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img src={comment.photoURL} alt={comment.displayName} />
                    </div>
                  </div>
                  <div className="chat-header">
                    {comment.displayName}
                    <time className="text-xs opacity-50 ml-2">
                      {comment.createdAt}
                    </time>
                  </div>
                  <div className="chat-bubble">{comment.text}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Add comment"
          name="comment"
          className="input input-bordered w-full"
        />
        <button className="btn btn-primary">Add</button>
      </form>
    </div>
  );
}

export default Task;
