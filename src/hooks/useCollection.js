import { useEffect, useRef, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export const useCollection = (collectionName, _query) => {
  const [data, setData] = useState(null);
  const queryData = useRef(_query)

  useEffect(() => {
    let q = collection(db, collectionName)

    if (queryData.current){
      q = query(q, orderBy("timestamp", queryData.current))
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = [];
        snapshot.forEach((item) => {
          data.push({
            uid: item.id,
            ...item.data(),
          });
        });
        setData(data);
      }
    );

    return () => unsubscribe();
  }, [collectionName, queryData]);

  return { data };
};
