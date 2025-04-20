// app/promposoal/page.js
"use client";

import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const PromposalPage = () => {
  const router = useRouter();
  const [response, setResponse] = useState(null);

  const handleYesClick = () => {
    setResponse("YES!");
    router.push("/celebration");
    console.log("is this working");
    // Delay navigation by 1 second
    setTimeout(() => {
      router.push("/celebration");
    }, 1000);
  };

  const handleNoClick = async () => {
    const res = await fetch("/api/no", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answer: "no" }), // Sending JSON
    });
    const answer = await res.json();
    console.log(answer["text"]);
    setResponse(answer["text"]);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        gap: 3, // Add some spacing between elements
      }}
    >
      <Typography variant="h4" component="h1" align="center">
        Will You Go To Prom With Me?
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" color="error" onClick={handleYesClick}>
          YES
        </Button>
        <Button variant="contained" color="primary" onClick={handleNoClick}>
          NO
        </Button>
      </Box>
      {response && (
        <Typography
          variant="h6"
          align="center"
          color={response === "YES!" ? "success.main" : "warning.main"}
        >
          {response}
        </Typography>
      )}
    </Container>
  );
};

export default PromposalPage;
