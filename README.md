# Youtube Video Summarizer

## API that provides summary of any youtube video. 

This project uses ***Youtube Data API*** to get the full transcript of the video. Then it employs ***OpenAI API*** to make a summary of the transcript with the *gpt-3.5-turbo* language model. For a given video, it will summarize all its content into aproximatelly 100 words.

## How to use

### HTTP request
> GET https://youtube-video-summarizer-2ach.onrender.com/api/summarize

### Body
The request **MUST CONTAIN** in its body the pair "video_url": "VIDEO_URL_TO_SUMMARIZE"

## Usage and quotas limitations
<ul>
    <li>By now the project is reliant on free server hosting, thus the first request will take a minute to start the cold server.</li>
    <li>OpenAI API is quite generous with its free tier, allowing us to summarize aproximatelly 60 hours of video per month.</li>
    <li>Youtube Data API is practically unlimited for any non abusive usage.</li>
    <li>The summarizer works better in speach based videos.</li>
    <li>Extremely long videos are hard to condense into 100 words, so it is recommended to only summarize videos that are not more than 45 minutes long.</li>
</ul>

