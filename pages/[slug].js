import Message from "../components/message";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db, auth } from "../utils/firebase";
import { toast } from "react-toastify";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

export default function Details() {
  const router = useRouter();
  const routerData = router.query;
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  // submit comment
  const submitMessage = async () => {
    if (!auth.currentUser) return router.push("/auth/login");

    if (!message) {
      toast.error("Don't leave an empty message", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }
    const docRef = doc(db, "posts", routerData.id);
    await updateDoc(docRef, {
      comments: arrayUnion({
        message,
        avatar: auth.currentUser.photoURL,
        username: auth.currentUser.displayName,
        time: Timestamp.now(),
      }),
    });
    setMessage("");
  };

  // get comments

  const getComments = async () => {
    const docRef = doc(db, "posts", routerData.id);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setAllMessages(snapshot.data().comments);
    });
    return unsubscribe;
  };

  useEffect(() => {
    if (!router.isReady) return;
    getComments();
  }, [routerData]);

  return (
    <div>
      <Message {...routerData} />
      <div className="my-4 ">
        <div className="flex">
          <input
            className="bg-gray-800 w-full p-2 text-white text-sm"
            type="text"
            value={message}
            placeholder="Write a comment ✉️"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={submitMessage}
            className="bg-cyan-500 text-white py-2 px-4 text-sm"
          >
            Submit
          </button>
        </div>
        <div className="py-6">
          <h2 className="font-bold">Comments</h2>
          {allMessages?.map((msg) => (
            <div className="bg-white p-4 border-2 mb-2" key={msg.time}>
              <div className="flex items-center gap-2 mb-4">
                <img src={msg.avatar} alt="" className="w-10 rounded-full" />
                <h2>{msg.username}</h2>
              </div>
              <h2>{msg.message}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
