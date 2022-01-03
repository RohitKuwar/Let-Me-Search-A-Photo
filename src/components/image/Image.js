import axios from "axios";
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import styles from './image.module.css'

const Image = ({ imageDetails }) => {
  const [click, setClick] = useState(false)
  const toggle = () => {
    return click ? setClick(false) : setClick(true)
  }
  const download = () => {
    axios({
      url: imageDetails.urls.regular,
      method: "GET",
      responseType: "blob"
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${imageDetails.id}.jpg`);
      document.body.appendChild(link);
      link.click();
    })
  }

  return (
    <li key={imageDetails.id} className={styles.imageContainer}>
      <img 
        width="400" 
        src={imageDetails.urls.regular} 
        key={imageDetails.id} 
        alt={imageDetails.alt_description}
      />
      <div className={styles.overlay}>
        <span><FontAwesomeIcon icon={faHeart} size="lg" style={{color: click ? 'red' : 'white'}} onClick={toggle} />
          {click ? imageDetails.likes + 1 : imageDetails.likes}
        </span>
        <span>
          <FontAwesomeIcon icon={faDownload} size="lg" onClick={download} />
        </span>
      </div>
    </li>
  );
};

export default Image;
