# Youtube Video Summarizer

This project uses **YouTube Data API** to get the full transcript of the video. Then it employs **OpenAI API** to make a summary of the transcript with the *gpt-3.5-turbo* language model. For a given video, it will summarize all its content into approximatelly 100 words.

## How to use

### HTTP request
> GET http://3.145.79.157:3000/api/summarize

### Params
The request **MUST CONTAIN** as a parameter the id of the video.

### Example
https://3.145.79.157:3000/api/summarize?id=xKxrkht7CpY


