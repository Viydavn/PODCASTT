import React, { useEffect } from "react";
import Header from "./../components/common/Header/index.js";
import {
  querySnapshot,
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";
import { setPodcasts } from "../slices/podcastSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { db } from "./../firebase.js";

function PodcastsPage() {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastsData));
      },
      (error) => {
        console.error("Error in fetching podcasts:", error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
 
  console.log(podcasts);
  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{ marginTop: "2rem" }}>
        <h1> Discover Podcasts </h1>
        {podcasts!=null && podcasts.length > 1 ? (
          <>
            {podcasts.map((item) => {
              return <p>{item.title}</p>;
            })}
          </>
        ) : (
          <p>No Current Podcasts</p>
        )}
      </div>
    </div>
  );
}

export default PodcastsPage;
