"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Box,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";

const RestrictedAccessPage = () => {
  const router = useRouter();
  const questions = [
    "How long have we been together?",
    "Where did we first meet?",
    "What was the name of our first movie?",
    "What is our main goto spot?",
    "What show did we start watching together?",
    "What do we not like?",
    "What is our code word?",
    "What is our favorite video game?",
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(""));

  const handleInputChange = (event, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = event.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    console.log(answers);
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answers }),
    });
    const { verified } = await res.json();
    if (verified) {
      router.push("/access-lifted");
    } else {
      alert("Try again :)");
    }
  };

  return (
    <Container>
      <Box
        sx={{
          mt: 4,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Restricted Access
        </Typography>
        <List
          sx={{
            width: {
              xs: "90%", // Mobile
              sm: "70%", // Tablets and larger
            },
          }}
        >
          {questions.map((question, index) => (
            <ListItem
              key={index}
              disableGutters
              sx={{
                display: "flex",
                alignItems: "center",
                paddingBottom: 1,
              }}
            >
              <ListItemText primary={question} sx={{ flex: 1 }} />{" "}
              {/* Let the question take up available space */}
              <TextField
                label="Your Answer"
                variant="outlined"
                size="small"
                value={answers[index]}
                onChange={(event) => handleInputChange(event, index)}
                sx={{ width: "60%", minWidth: "100px", marginLeft: "10px" }}
              />
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 3, mb: 3 }}
        >
          Submit Answers
        </Button>
      </Box>
    </Container>
  );
};

export default RestrictedAccessPage;
