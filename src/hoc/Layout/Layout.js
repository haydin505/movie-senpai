import React, { useState, useEffect } from "react";
import styles from "./Layout.module.css";
import image1 from "../../assets/images/background-image-1.jpeg";
import image2 from "../../assets/images/background-image-2.jpeg";
import image3 from "../../assets/images/background-image-3.jpg";
import image4 from "../../assets/images/background-image-4.jpg";
import image5 from "../../assets/images/background-image-5.jpg";
import image6 from "../../assets/images/background-image-6.jpg";
const Layout = (props) => {
  //   console.log(props);

  const [image, setImage] = useState(null);

  useEffect(() => {
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    // console.log(randomNumber);
    if (randomNumber === 1) setImage(image1);
    if (randomNumber === 2) setImage(image2);
    if (randomNumber === 3) setImage(image3);
    if (randomNumber === 4) setImage(image4);
    if (randomNumber === 5) setImage(image5);
    if (randomNumber === 6) setImage(image6);
  }, []);

  return (
    <div style={{ backgroundImage: `url(${image})` }} className={styles.Layout}>
      {props.children}
    </div>
  );
};

export default Layout;
