/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { motion } from "framer-motion";
import "./styles.css";
import { Link } from "react-router-dom";

// Import the new IdxPage component
import IdxPage from './IdxPage';

 // { id: "1", src: "/videos/myvid.MOV" },
 //  { id: "2", src: "/videos/myvid2.MOV" },
 //  { id: "3", src: "/videos/myvid3.mp4" },
 //  { id: "4", src: "/videos/myvid4.MOV" },
 //  { id: "5", src: "/videos/myvid5.MOV" },
 //  { id: "6", src: "/videos/myvid6.MOV" },
 //  { id: "7", src: "/videos/myvid7.MOV" },
 //  { id: "8", src: "/videos/myvid8.MOV" },

const videos = [
  { id: "1", src: "/videos/myvid.MOV" },
  { id: "2", src: "/videos/myvid2.MOV" },
  { id: "3", src: "https://www.w3schools.com/html/movie.mp4" },
  { id: "4", src: "/videos/myvid4.MOV" },
  { id: "5", src: "/videos/myvid5.MOV" },
  { id: "6", src: "/videos/myvid6.MOV" },
  { id: "7", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: "8", src: "https://www.w3schools.com/html/movie.mp4" },
  { id: "9", src: "/videos/myvid9.MOV" },
  { id: "10", src: "https://www.w3schools.com/html/movie.mp4" },
  { id: "11", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: "12", src: "https://www.w3schools.com/html/movie.mp4" },
  { id: "13", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: "14", src: "https://www.w3schools.com/html/movie.mp4" },
  { id: "15", src: "https://www.w3schools.com/html/mov_bbb.mp4" }
];

const captions = [
  "This is the first video caption.",
  "Enjoy this amazing second video.",
  "A great moment captured in the third video.",
  "Watch the fourth video in action.",
  "Here's the fifth video caption!",
  "Sixth video brings excitement.",
  "Seventh video is something special.",
  "Eighth video will amaze you.",
  "Ninth video is a masterpiece.",
  "Tenth video keeps you entertained.",
  "Eleventh video tells a story.",
  "Twelfth video is mesmerizing.",
  "Thirteenth video captures emotion.",
  "Fourteenth video feels different.",
  "Fifteenth video is just perfect!"
];

const replacementText = [
  <p>After the rodents kill two butterflies with an apple and a rock, and then attack Bunny, he sets aside his gentle nature and orchestrates a complex plan to avenge the two butterflies. Using a variety of traps, Bunny first dispatches Rinky and. Frank, unaware of the fate of the other two, is seen taking off from a tree, and gliding towards a seemingly unsuspecting. Once airborne, Frank triggers Bunny's final series of traps, causing Frank to crash into a tree branch and plummet into a spike trap below. At the last moment, Frank grabs onto what he believes is the branch of a small tree, but discovers it is just a twig Bunny is holding over the spikes. Bunny snatches up Frank. The film concludes with Bunny being pleased with himself as a butterfly flies past him holding a string, at the end of which is Frank attached as a flying kite.</p>,
  "Text for video 2 goes here.",
  "Here's the new text for video 3.",
  "New description for the fourth video.",
  "This is the replacement text for video 5.",
  "Text that appears when video 6 is clicked.",
  "Special text for the seventh video.",
  "Replacement text for video 8.",
  "This is the text for video 9.",
  "Text displayed when video 10 is clicked.",
  "This is the replacement text for video 11.",
  "Text for video 12.",
  "Here’s the text for video 13.",
  "Replacement text for video 14.",
  "This is the text for video 15."
];

function VideoFeed() {
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const observerRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(() => {
    const videoIdFromUrl = location.pathname.replace("/video/", "");
    const index = videos.findIndex((v) => v.id === videoIdFromUrl);
    return index !== -1 ? index : 0;
  });

  const [clickedVideos, setClickedVideos] = useState(new Set());

  useEffect(() => {
    if (videoRefs.current[activeIndex]) {
      videoRefs.current[activeIndex].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentPath = `/video/${videos[activeIndex].id}`;
      if (location.pathname !== currentPath) {
        navigate(currentPath, { replace: true });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [activeIndex, navigate, location.pathname]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          if (video.paused) {
            video.play().catch((error) => {
              if (error.name !== "AbortError") {
                console.error("Video play failed", error);
              }
            });
          }
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [activeIndex]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
          const candidate = visibleEntries[0];
          const index = parseInt(candidate.target.dataset.index, 10);
          if (index !== activeIndex) {
            setActiveIndex(index);
          }
        }
      },
      { threshold: 0.9 }
    );

    videoRefs.current.forEach((video, index) => {
      if (video) {
        video.dataset.index = index;
        observerRef.current.observe(video);
      }
    });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [activeIndex]);

  const handleVideoClick = (index) => {
    setClickedVideos((prev) => {
      const newClickedVideos = new Set(prev);
      if (newClickedVideos.has(index)) {
        newClickedVideos.delete(index); // If already clicked, remove it
      } else {
        newClickedVideos.add(index); // If not clicked, add it
      }
      return newClickedVideos;
    });
  };

const [mutedVideos, setMutedVideos] = useState(new Set(videos.map((_, i) => i))); 


const toggleMute = (index) => {
  setMutedVideos((prev) => {
    const newMutedVideos = new Set(prev);
    if (newMutedVideos.has(index)) {
      newMutedVideos.delete(index); // Unmute
    } else {
      newMutedVideos.add(index); // Mute
    }
    return newMutedVideos;
  });

  // Actually mute/unmute the video element
  if (videoRefs.current[index]) {
    videoRefs.current[index].muted = !videoRefs.current[index].muted;
  }
};

const [isSidebarVisible, setIsSidebarVisible] = useState(false);



const [userHasInteracted, setUserHasInteracted] = useState(false);

useEffect(() => {
  const handleUserInteraction = () => setUserHasInteracted(true);
  document.addEventListener("click", handleUserInteraction, { once: true });
  return () => document.removeEventListener("click", handleUserInteraction);
}, []);

  return (
    <div ref={containerRef} className="video-feed-container h-screen w-screen .video-feed-container snap-mandatory snap-y">
      {/* Add a link at the top */}
      <div ref={containerRef} className="video-container w-3/5 h-screen w-screen overflow-y-scroll snap-mandatory snap-y">
      <div className="menu text-white text-lg text-center p-4 bg-black">
        <span 
          className="cursor-pointer index-link"
          onClick={() => setIsSidebarVisible(!isSidebarVisible)}
        >
          Index
        </span>
        <Link to="/app" className="sso-link">
          Superstars Only
        </Link>

      </div>

      {videos.map((video, index) => (
        <motion.div
          key={video.id}
          className={`video-container h-screen flex flex-col justify-center items-center snap-start`}
          style={{ marginBottom: activeIndex === index ? "80px" : "20px" }}
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: activeIndex === index ? 1 : 0.5, scale: activeIndex === index ? 1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <div style={{ position: 'relative', width: '100%', height: '80vh' }}>
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={video.src}
              controls={false}
              muted={mutedVideos.has(index)} // Starts muted, but can be unmuted dynamically
              loop
              onClick={() => handleVideoClick(index)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // Ensures the video fills the div even if cropped
                transition: "none", // No fade animation
                opacity: clickedVideos.has(index) ? 0 : 1, // Video instantly turns white
                backgroundColor: clickedVideos.has(index) ? "white" : "transparent", // Video turns completely white
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 0
              }}
            />
            {clickedVideos.has(index) && (
              <div
                className="text-black text-lg text-center p-4 bg-white rounded-lg absolute top-0 left-0 w-full h-full flex justify-center items-center"
                onClick={() => handleVideoClick(index)} // Clicking the text will restore the video
                style={{ zIndex: 1 }}
              >
                {replacementText[index]}
              </div>
            )}
          </div>
          <motion.div
            className="text-white text-lg text-center p-2 bg-black rounded-lg mt-2 flex justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={activeIndex === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            style={{ width: "100%" }}
          >
            <span>{captions[index]}</span>
            <span
              className="muter ml-4 px-3 py-1 bg-gray-700 text-white rounded" 
              onClick={() => toggleMute(index)}
            >
              {mutedVideos.has(index) ? "Unmute 🔊" : "Mute 🔇"}
            </span>
          </motion.div>
        </motion.div>
      ))}
    </div>
        {/* ✅ Right Side: Persistent Column (Just to the right of the video feed) */}
        {isSidebarVisible && (
          <div className="right-column w-1/5 h-screen bg-gray-900 text-white p-4 ml-8 overflow-y-auto">
            <p>This is a persistent right-side column that stays next to the video feed.</p>
              <p>Video 1</p>
              <p>Video 2</p>
              <p>Video 3</p>
          </div>
        )}

  </div>



  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/video/:id" element={<VideoFeed />} />
        <Route path="/idx" element={<IdxPage />} /> {/* Add this route */}
        <Route path="*" element={<VideoFeed />} />
      </Routes>
    </Router>
  );
}
