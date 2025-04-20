// app/celebration/page.js
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Typography,
  Box,
  IconButton,
  Grid,
  Card,
  CardMedia,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const galleryItems = [
  { id: 1, type: "image", src: "/images/img1.jpg", alt: "Image 1" },
  { id: 2, type: "image", src: "/images/img2.jpg", alt: "Image 2" },
  { id: 3, type: "image", src: "/images/img3.jpg", alt: "Image 3" },
  { id: 4, type: "image", src: "/images/img4.jpg", alt: "Image 4" },
  { id: 5, type: "image", src: "/images/img5.jpg", alt: "Image 5" },
  { id: 6, type: "image", src: "/images/img6.jpg", alt: "Image 6" },
  { id: 7, type: "image", src: "/images/img7.jpg", alt: "Image 7" },
  { id: 8, type: "video", src: "/images/vid1.mov", alt: "Video 1" },
  { id: 9, type: "video", src: "/images/vid2.mov", alt: "Video 2" },
];

const CelebrationPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const arrowRef = useRef(null);
  const galleryRef = useRef(null); // Ref for the gallery section

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    // Simple arrow animation
    let animationFrameId;
    let yOffset = 0;
    const animateArrow = () => {
      if (arrowRef.current) {
        arrowRef.current.style.transform = `translateY(${
          Math.sin(yOffset) * 10
        }px)`;
        yOffset += 0.1;
        animationFrameId = requestAnimationFrame(animateArrow);
      }
    };

    if (!loading && arrowRef.current) {
      animateArrow();
    }

    return () => {
      clearTimeout(timer);
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [router, loading]);

  const handleArrowClick = () => {
    galleryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "black",
        }}
      >
        <Typography variant="h6" color="white">
          Celebrating...
        </Typography>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", // Align items to the top initially
        alignItems: "center",
        paddingBottom: 8, // Add some padding at the bottom
      }}
    >
      <Confetti width={windowSize.width} height={windowSize.height} />
      <Box
        sx={{
          zIndex: 1,
          height: "100vh",
          width: "100vw",
          bgcolor: "black",
          paddingTop: "40vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" color="white">
          Correct Choice :)
        </Typography>
        <IconButton
          color="white"
          sx={{ mt: 4 }}
          ref={arrowRef}
          onClick={handleArrowClick}
        >
          <ArrowDownwardIcon sx={{ fontSize: "4rem", color: "white" }} />
        </IconButton>
      </Box>

      {/* Gallery Section */}
      <Box
        ref={galleryRef}
        sx={{
          zIndex: 1,
          mt: 8,
          height: "120vh",
          width: "100%",
          backgroundColor: "white",
          padding: 4,
        }}
      >
        <Typography variant="h4" color="black" align="center" mb={4}>
          Our Special Moments
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {galleryItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                {item.type === "image" ? (
                  <CardMedia
                    component="img"
                    height="300"
                    image={item.src}
                    alt={item.alt}
                  />
                ) : item.type === "video" ? (
                  <CardMedia
                    component="video"
                    height="300"
                    src={item.src}
                    controls // Keep controls for user interaction
                    autoPlay // Add the autoPlay attribute
                    loop // Add the loop attribute
                    muted // Important for autoplay in many browsers
                  />
                ) : null}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default CelebrationPage;
