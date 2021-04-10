import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import axios from "axios";
import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";
import { SocialIcon } from "react-social-icons";
function Sidebar(props) {
  // console.log(props);
  const [videoId, setVideoId] = useState("");
  const [showDisplay, setShowDisplay] = useState(false);
  const [YOUTUBE_API_KEY, setYOUTUBE_API_KEY] = useState(
    "AIzaSyAS2KFJrLKLPs_WAvcntfstOqM6lohww3E"
  );
  // useEffect(() => {
  //   console.log(YOUTUBE_API_KEY);
  // }, [YOUTUBE_API_KEY]);

  useEffect(() => {
    setShowDisplay(true);
    async function getVideoId() {
      try {
        // console.log(props.title[0]);
        const encode = encodeURI(
          props.title[0].toLowerCase() + " official trailer"
        );
        // const encode = props.title[0] + " official trailer";
        // console.log(encode);
        // console.log(
        //   `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=${encode}&type=video&key=AIzaSyAS2KFJrLKLPs_WAvcntfstOqM6lohww3E`
        // );
        const id = await axios.get(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=${encode}&type=video&key=${YOUTUBE_API_KEY}`
          // `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=viewCount&q=${encode}&type=video&key=AIzaSyAS2KFJrLKLPs_WAvcntfstOqM6lohww3E`
        );
        // console.log(id);
        // console.log(id.data.items[0].id.videoId);

        setVideoId(id.data.items[0].id.videoId);
      } catch (err) {
        console.log(err);
        if (YOUTUBE_API_KEY === "AIzaSyAS2KFJrLKLPs_WAvcntfstOqM6lohww3E") {
          setYOUTUBE_API_KEY("AIzaSyCK_tbR-tEFpZvgumAA2v1IwVje9dAxU2Y");
        }
        if (YOUTUBE_API_KEY === "AIzaSyCK_tbR-tEFpZvgumAA2v1IwVje9dAxU2Y") {
          setYOUTUBE_API_KEY("AIzaSyAS2KFJrLKLPs_WAvcntfstOqM6lohww3E");
        }
      }
      // .then((result) => console.log(result.data.items[0].id.videoId));
    }

    getVideoId();
  }, [props.title, YOUTUBE_API_KEY]);

  const closeButtonClickedHandler = () => {
    setShowDisplay(false);
    setTimeout(() => props.clicked(), 1800);
    // console.log(YOUTUBE_API_KEY);
  };

  return (
    <div
      className={
        showDisplay ? styles.Sidebar : `${styles.Sidebar} ${styles.SidebarNone}`
      }
    >
      <IconContext.Provider value={{ className: styles.Icon }}>
        <AiOutlineClose onClick={closeButtonClickedHandler} />
      </IconContext.Provider>
      <p className={styles.MovieName}>{props.title[0]}</p>

      <iframe
        title="trailer"
        className={styles.Frame}
        width="420"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}?playsinline=1`}
      ></iframe>
      <div className={styles.SocialIcons}>
        <SocialIcon className={styles.SocialIcon} network="twitter" />
        <SocialIcon className={styles.SocialIcon} network="whatsapp" />
        <SocialIcon className={styles.SocialIcon} network="youtube" />
        <SocialIcon className={styles.SocialIcon} network="instagram" />
      </div>
      <div className={styles.MovieOverviewBox}>
        <p className={styles.MovieOverview}>{props.title[1]}</p>
      </div>
    </div>
  );
}

export default Sidebar;
