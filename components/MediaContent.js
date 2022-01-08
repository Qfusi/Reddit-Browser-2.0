import { useEffect, useState } from 'react';
import ReactImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import TweetEmbed from 'react-tweet-embed';
import TwitchContent from './content/TwitchContent';
import GeneralMediaContent from './content/GeneralMediaContent';

function MediaContent({ post }) {
    const [mediaType, setMediaType] = useState();
    const [media, setMedia] = useState();
    const [gallery, setGallery] = useState([]);

    useEffect(() => {
        function endsWithAny(suffixes) {
            return suffixes.some(function (suffix) {
                return post.url.endsWith(suffix);
            });
        }

        if (post.post_hint == 'image') {
            // console.log('image');
            setMediaType('image');
        } else if (endsWithAny(['gifv'])) {
            // console.log('gifv');
            setMediaType('media');
            setMedia({
                url: post.url.substr(0, post.url.lastIndexOf('.')) + '.mp4',
                w: post.preview?.reddit_video_preview?.width,
                h: post.preview?.reddit_video_preview?.height
            });
        } else if (post.post_hint == 'hosted:video') {
            // console.log('reddit hosted');
            setMediaType('media');
            setMedia({
                url: post.media.reddit_video.hls_url,
                w: post.media.reddit_video.width,
                h: post.media.reddit_video.height
            });
        } else if (post.post_hint == 'rich:video') {
            // console.log('rich hosted');
            setMediaType('media');
            setMedia({
                url: post.url
            });
        } else if (post.gallery_data) {
            // console.log('gallery');
            if (Object.entries(post.media_metadata)?.length == gallery.length) {
                return;
            }

            setMediaType('gallery');
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
        } else if (post.post_hint === 'link') {
            if (post.secure_media?.type?.includes('twitter')) {
                setMediaType('twitter');
                // console.log('twitter');
            } else if (post.secure_media?.type?.includes('twitch')) {
                setMediaType('twitch');
                // console.log('twitch');
            } else {
                // console.log('link');
            }
        } else {
            // console.log('else');
            setMediaType('media');
            setMedia({
                url: post.media?.reddit_video?.hls_url ?? post.url,
                w: post.media?.reddit_video?.width,
                h: post.media?.reddit_video?.height
            });
        }
    }, [post]);

    return (
        <div className="flex justify-center bg-black">
            {mediaType === 'image' && (
                <img
                    className="max-h-screen w-auto h-auto max-w-2xl rounded-lg"
                    src={post.url}
                    alt=""
                />
            )}
            {mediaType === 'media' && <GeneralMediaContent media={media} />}
            {mediaType === 'twitch' && <TwitchContent post={post} />}
            {mediaType === 'twitter' && (
                <TweetEmbed
                    className="w-full"
                    id={post.secure_media?.oembed?.url?.split('/')[5]}
                    options={{ theme: 'dark', width: '550px', align: 'center' }}
                />
            )}
            {mediaType === 'gallery' && gallery.length > 0 && (
                <ReactImageGallery
                    items={gallery}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    showBullets={true}
                />
            )}
        </div>
    );
}

export default MediaContent;
