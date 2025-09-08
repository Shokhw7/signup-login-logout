import { useNavigate } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import Select from "react-select";
import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp,} from "firebase/firestore";
import { db } from "../firebase/config";

function CreateTask() {
  const navigate = useNavigate();
  const { data } = useCollection("users");
  const [userOptions, setUserOptions] = useState([]);
  const [attachedUsers, setAttachedUsers] = useState([]);

  useEffect(() => {
    if (!data) return;
    const users = data.map((user) => ({
      value: user.uid,
      label: user.displayName,
      uid: user.uid,
      photoURL: user.photoURL,
    }));
    setUserOptions(users);
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const title = formData.get("title");
    const description = formData.get("description");
    const dueTo = formData.get("due-to");

    const task = {
      title,
      description,
      attachedUsers,
      dueTo,
      comments: [],
      timestamp: serverTimestamp(),
    };

    await addDoc(collection(db, "tasks"), task).then(() => {
      alert("✅ Vazifa qo‘shildi!");
      navigate("/");
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen text-black">
      <div className="cardd w-full max-w-lg bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">➕ Create Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control ">
            <label className="label font-medium text-black">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Task title..."
              className="input input-bordered w-full bg-white"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-medium text-black">Description</label>
            <textarea
              name="description"
              placeholder="Task description..."
              className=" textarea textarea-bordered w-full bg-white"
              rows={4}
              required
            ></textarea>
          </div>

          <div className="form-control ">
            <label className="label font-medium text-black">Due Date</label>
            <input
              type="date"
              name="due-to"
              className="input input-bordered w-full bg-white"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">Users</label>
            <Select
              isMulti
              options={userOptions}
              value={attachedUsers}
              onChange={(selected) => setAttachedUsers(selected || [])}
              placeholder="Userlarni tanlang ..."
              className="react-select-container"
              classNamePrefix="react-select"
              getOptionValue={(opt) => opt.uid}
              getOptionLabel={(opt) => opt.label}
              formatOptionLabel={(opt) => (
                <div className="flex items-center gap-2">
                  {opt.photoURL ? (
                    <img
                      src={opt.photoURL}
                      alt={opt.label}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gray-300" />
                  )}
                  <span>{opt.label}</span>
                </div>
              )}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;
