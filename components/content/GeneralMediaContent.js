import ReactPlayer from 'react-player';

function GeneralMediaContent({ media }) {
    return (
        <ReactPlayer
            url={media.url}
            playing={true}
            loop
            loaded
            controls
            height={media.h ?? 550}
            width={media.w ?? 2000}
        />
    );
}

export default GeneralMediaContent;
