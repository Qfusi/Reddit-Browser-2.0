import { useEffect, useState } from 'react';
import ReactImageGallery from 'react-image-gallery';
import ReactPlayer from 'react-player';
import 'react-image-gallery/styles/css/image-gallery.css';

function Player({ post }) {
    const [media, setMedia] = useState();
    const [isPlaying] = useState(true);
    const [gallery, setGallery] = useState([]);

    useEffect(() => {
        function endsWithAny(suffixes) {
            return suffixes.some(function (suffix) {
                return post.url.endsWith(suffix);
            });
        }

        if (post.post_hint == 'image') {
            // console.log('image');
        } else if (endsWithAny(['gifv'])) {
            // console.log("gifv");
            setMedia({
                url: post.url.substr(0, post.url.lastIndexOf('.')) + '.mp4',
                w: post.preview?.reddit_video_preview?.width,
                h: post.preview?.reddit_video_preview?.height
            });
        } else if (post.post_hint == 'hosted:video') {
            // console.log("reddit hosted");
            setMedia({
                url: post.media.reddit_video.hls_url,
                w: post.media.reddit_video.width,
                h: post.media.reddit_video.height
            });
        } else if (post.post_hint == 'rich:video') {
            // console.log("rich hosted");
            setMedia({
                url: post.url
            });
        } else if (post.gallery_data) {
            if (Object.entries(post.media_metadata)?.length == gallery.length) {
                return;
            }

            for (const [, value] of Object.entries(post.media_metadata)) {
                setGallery((oldArr) => [
                    ...oldArr,
                    {
                        original: value.s.u,
                        originalWidth: value.s.x,
                        originalHeight: value.s.y
                    }
                ]);
            }
        } else {
            // console.log("else");
            setMedia({
                url: post.media?.reddit_video?.hls_url ?? post.url,
                w: post.media?.reddit_video?.width,
                h: post.media?.reddit_video?.height
            });
        }
    }, [post]);

    return (
        <div className="flex justify-center bg-black">
            {media && (
                <ReactPlayer
                    url={media.url}
                    playing={isPlaying}
                    loop
                    loaded
                    controls
                    height={media.h ?? 550}
                    width={media.w ?? 2000}
                />
            )}
            {gallery.length > 0 && (
                <ReactImageGallery
                    items={gallery}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    showBullets={true}
                />
            )}
            {!media && gallery && (
                <img
                    className="max-h-screen w-auto h-auto max-w-2xl rounded-lg"
                    src={post.url}
                    alt=""
                />
            )}
        </div>
    );
}

export default Player;
