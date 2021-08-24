import React, { useState, useEffect } from "react";
import styles from "./Feed.module.css";
import { db } from "../firebase";
import TweetInput from "./TweetInput";
import Post from "./Post";

const Feed: React.FC = () => {
  const [posts, setPosts] = useState([
    {
      id: "",
      avatar: "",
      image: "",
      text: "",
      timeStamp: null,
      username: "",
    },
  ]);

  useEffect(() => {
    const unSub = db
      .collection("posts")
      .orderBy("timeStamp", "desc")
      .onSnapshot(
        (snapshot) =>
          setPosts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              avatar: doc.data().avatar,
              image: doc.data().image,
              text: doc.data().text,
              timeStamp: doc.data().timeStamp,
              username: doc.data().username,
            }))
          )
        // snapshot.docs.forEach(async (doc) => {
        //   console.log(doc.data());
        //   await setPosts(
        //     snapshot.docs.map((doc) => ({
        //       id: doc.id,
        //       avatar: doc.data().avatar,
        //       image: doc.data().image,
        //       text: doc.data().text,
        //       timeStamp: doc.data().timeStamp,
        //       username: doc.data().username,
        //     }))
        //   );
        // })
      );
    return () => {
      unSub();
    };
  }, []);

  console.log(posts);

  return (
    <div className={styles.feed}>
      <TweetInput />

      {posts[0]?.id && (
        <>
          {posts.map((post) => (
            <Post
              key={post.id}
              postId={post.id}
              avatar={post.avatar}
              image={post.image}
              text={post.text}
              timeStamp={post.timeStamp}
              username={post.username}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Feed;
