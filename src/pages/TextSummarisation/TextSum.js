import { Button, TextField } from '@material-ui/core'
import { Typography } from '@mui/material'
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import React from 'react'

function TextSum() {

    const [text, setText] = useState("");
    const [summarizedtext, setsummarizedtext] = useState("");
    const [loading, setLoading] = useState(false);

    const configuration = new Configuration({
        // apiKey: process.env.OPENAI_API_KEY,
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);

      const HandleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        openai
          .createCompletion({
            model: "text-davinci-003",
            prompt: generatePrompt(text),
            temperature: 0.6,
            max_tokens: 100,
          })
          .then((res) => {
            if (res.status === 200) {
              setLoading(false);
              setsummarizedtext(res?.data?.choices[0]?.text);
            }
          })
          .catch((err) => {
            console.log(err, "An error occured");
          });
      };

      function generatePrompt(text) {
        return `Summarize this ${text}. and break them into seperate lines`;
      }


  return (
    <div>
        <Typography>
            Text Summarisation
        </Typography>
        <Typography>
            Enter the text below to summarise large text into key points
        </Typography>
        <TextField
        style={{width:500, height:400}}
        placeholder='Enter your text to summarise here '
        value={text}
        onChange={(e) => setText(e.target.value)}
        >
        </TextField>
        <Button
        type="button" 
        onClick={HandleSubmit}>
            {loading ? "loading..." : "Summarize"}
        </Button>

        <TextField
        placeholder="Summarized text"
        cols={80}
        rows={14}
        value={summarizedtext}
        onChange={(e) => setText(e.target.value)}
        >

        </TextField>
    </div>
  )
}

export default TextSum