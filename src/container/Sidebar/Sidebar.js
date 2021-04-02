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

  // useEffect(() => {

  // }, []);

  useEffect(() => {
    setShowDisplay(true);
    async function getVideoId() {
      try {
        const encode = encodeURI(props.title + " movie trailer");
        // console.log(encode);
        const id = await axios.get(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=viewCount&q=${encode}&type=video&key=AIzaSyAS2KFJrLKLPs_WAvcntfstOqM6lohww3E`
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

  const closeButtonClickedHandler = () => {
    setShowDisplay(false);
  };

  return (
    <div className={showDisplay ? styles.Sidebar : styles.SidebarNone}>
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

      <p className={styles.MovieOverview}>{props.title[1]}</p>
    </div>
  );
}

export default Sidebar;
