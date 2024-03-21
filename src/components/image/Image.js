import axios from "axios";
import React, { useState } from "react";
import styles from "./image.module.css";
import iconDownload from "../../assets/arrow-down-solid.svg";
import iconLike from "../../assets/heart-solid-red.svg";
import iconUnlike from "../../assets/heart-solid.svg";

const Image = ({ imageDetails }) => {
  const [click, setClick] = useState(false);

  const download = () => {
    axios({
      url: imageDetails.urls.regular,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${imageDetails.id}.jpg`);
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
    <li
      key={imageDetails.id}
      className={styles.imageContainer}
      title={imageDetails.alt_description}
    >
      {/* <a href={imageDetails.links.download} target="_blank" rel="noreferrer"> */}
        <img
          width="400"
          src={imageDetails.urls.regular}
          key={imageDetails.id}
          alt={imageDetails.alt_description}
          loading="lazy"
        />
        <div className={styles.overlay}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              title="like this image"
              style={{
                backgroundColor: "#ffffffe6",
                border: "none",
                width: "22px",
                height: "22px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "8px",
                cursor: 'pointer'
              }}
              onClick={() => setClick(!click)}
            >
              <img
                src={click ? iconLike : iconUnlike}
                style={{ width: "18px", height: "18px" }}
                alt="like unlike icon"
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <a
                href={imageDetails.user.portfolio_url}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={imageDetails.user.profile_image.medium}
                  alt={imageDetails.user.name}
                  style={{
                    width: "30px",
                    height: "30px",
                    border: "none",
                    borderRadius: "50%",
                  }}
                />
              </a>
              <span>{imageDetails.user.name}</span>
            </div>
            <div
              title="download this image"
              style={{
                backgroundColor: "#ffffffe6",
                border: "none",
                width: "22px",
                height: "22px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "8px",
                cursor: 'pointer'
              }}
            >
              <img
                src={iconDownload}
                style={{ width: "18px", height: "18px" }}
                onClick={download}
                alt="download icon"
              />
            </div>
          </div>
        </div>
      {/* </a> */}
    </li>
  );
};

export default Image;
