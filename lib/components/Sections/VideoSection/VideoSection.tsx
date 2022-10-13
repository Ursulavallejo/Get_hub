import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { getVideoSectionQuery } from "../../../api/sections";
import styles from "./VideoSection.module.scss";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useWindowSizeBreakpoint } from "../../hooks/useWndowSizeBreakpoint";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

//To use a Local file
//import videoTest from "./TestVideo.mp4"


type Props = {
  id: string;

};

export const VideoSection = ({ id  }: Props) => {
const brWidth = useWindowSizeBreakpoint();
const [videoCanPlay, setVideoCanPlay] = useState<boolean>(false);
const [showVideo, setShowVideo] = useState<boolean>(false);

const { locale } = useRouter();

 const { loading, data } = useQuery(getVideoSectionQuery(id), {
    variables: {
      locale: locale,
    },
  });

 if (brWidth < 1024 && videoCanPlay) {
      setVideoCanPlay(false);
    }

  if (loading) return <div></div>;

  const openVideo = () => {
    setShowVideo(!showVideo)
  
  }

    return (
    <div className={styles.container} id="videoSec">
    <div className={styles.wrapper}>
    <div className={styles.content}>
        {data.videoSection?.richText?.json && documentToReactComponents(
         data.videoSection.richText.json,)}

         {data.videoSection.buttonText && (
         <button className={styles.button} onClick={() => openVideo()}>
          {data.videoSection.buttonText}
          </button>
           )}
    </div>
    </div>

    <div className={styles.imgWrapper}>
     <div className={styles.img}>
       <video
        className={styles.video}
        //From contentful .
        src={data.videoSection.video.url}
        playsInline
        autoPlay
        muted
        loop
        />
     </div>
    </div>


    {showVideo && 
  
    <div className={styles.iframeWrapper}>
        <IoCloseOutline className={styles.closeVideo} onClick={() => openVideo()}/>
    <iframe   loading="eager" src="https://www.youtube.com/embed/QTXyXuqfBLA" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"  className={styles.iframe}></iframe>
    </div>
    }

    </div>
    );
    };



{/* To use Iframe fill screen but still pending remove all frame */}
{/*
            <iframe className={styles.video}
            src="https://www.youtube.com/embed/VTH1zCgC1kI"
             frameborder="0"
             showinfo="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture, "
            allowfullscreen></iframe>
*/}

{/* To use a external URL */}
 {/*             <video
                className={styles.video}
                //try to use a local file but error.
                //src={ videoTest }
                src='https://media.umbraco.io/dev-agillo-se/td2erlyb/samplevid.mp4'
                playsInline
                autoPlay
                muted
                loop
              />*/}

{/* To use a external LOCAL file/  Gives error */}
 {/*             <video
                className={styles.video}
                //try to use a local file but error.
                src={ videoTest }
                playsInline
                autoPlay
                muted
                loop
              />*/}




