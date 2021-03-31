import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import axios from "axios";
import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";
function Sidebar(props) {
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    async function getVideoId() {
      try {
        const encode = encodeURI(props.title + " movie trailer");
        // console.log(encode);
        const id = await axios.get(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=viewCount&q=${encode}&type=video&key=AIzaSyCK_tbR-tEFpZvgumAA2v1IwVje9dAxU2Y`
        );
        // console.log(id);
        // console.log(id.data.items[0].id.videoId);
        setVideoId(id.data.items[0].id.videoId);
      } catch (e) {
        console.log(e);
      }
      // .then((result) => console.log(result.data.items[0].id.videoId));
    }
    getVideoId();
  }, [props.title]);

  return (
    <div className={styles.Sidebar}>
      <IconContext.Provider value={{ className: styles.Icon }}>
        <AiOutlineClose onClick={props.btnClicked} />
      </IconContext.Provider>
      <p>{props.title}</p>
      <iframe
        title="trailer"
        className={styles.Frame}
        width="420"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
      ></iframe>
    </div>
  );
}

export default Sidebar;
