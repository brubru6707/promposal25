// app/access-lifted/page.js
"use client";

import React, { useEffect, useState } from "react";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

const AccessLiftedPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 seconds loading

    const redirectTimer = setTimeout(() => {
      router.push("/promposoal");
    }, 3500); // 1.5 seconds loading + 2 seconds display = 3.5 seconds total

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column", // To stack loading indicator and text
      }}
    >
      {loading ? (
        <>
          <CircularProgress />
          <Typography variant="h4" mt={2} color="textSecondary">
            Lifting Access...
          </Typography>
        </>
      ) : (
        <Typography variant="h2" component="h1" align="center">
          Access Lifted
        </Typography>
      )}
    </Container>
  );
};

export default AccessLiftedPage;
