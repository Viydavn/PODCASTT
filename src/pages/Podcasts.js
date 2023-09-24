import React, { useEffect } from "react";
import Header from "../components/common/Header/index.js";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, query} from "firebase/firestore";
import { db } from "../firebase";
import { setPodcasts } from "../slices/podcastSlice.js";
import PodcastCard from "../components/common/Podcasts/PostcastCard/index.js";

function PodcastsPage() {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  // const [search, setSearch] = useState("");

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
        console.error("Error fetching podcasts:", error);
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
        {podcasts.length>0 ? (
          <div className="podcasts-flex">
          {podcasts.map((item) => {
          return (
            <PodcastCard
            key={item.id}
            id={item.id}
            title={item.title}
            displayImage={item.displayImage}
          />
          );
          }
          )}
          </div>
        ) : (
          <p>No Current Podcasts</p>
        )}
      </div>
    </div>
  );
}

export default PodcastsPage;
