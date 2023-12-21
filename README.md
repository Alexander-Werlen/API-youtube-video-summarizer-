# Youtube Video Summarizer

This project uses **YouTube Data API** to get the full transcript of the video. Then it employs **OpenAI API** to make a summary of the transcript with the *gpt-3.5-turbo* language model. For a given video, it will summarize all its content into approximatelly 100 words.

## How to use

### HTTP request
> GET https://youtube-video-summarizer-2ach.onrender.com/api/summarize

### Params
The request **MUST CONTAIN** as a parameter the id of the video.

### Example
https://youtube-video-summarizer-2ach.onrender.com/api/summarize?id=xKxrkht7CpY


