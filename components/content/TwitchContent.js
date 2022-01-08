function formatIFrame(uri) {
    const regex_w = /width="\d{2,4}"/g;
    const regex_h = /height="\d{2,4}"/g;
    const regex_autoplay = /%26autoplay%3Dfalse/g;
    const regex_muted = /%26muted%3Dtrue/g;

    uri = uri.replace(regex_w, 'width="1280"');
    uri = uri.replace(regex_h, 'height="720"');
    uri = uri.replace(regex_autoplay, '%26autoplay%3Dtrue');
    uri = uri.replace(regex_muted, '%26muted%3Dfalse');

    return InsertParentDomain(uri);
}

function InsertParentDomain(uri) {
    var index = uri.indexOf('%26parent%3D');
    return `${uri.slice(0, index)}%26parent%3D${
        process.env.NEXT_PUBLIC_TWITCH_DOMAIN_URI
    }${uri.slice(index)}`;
}

function TwitchContent({ post }) {
    return (
        <div
            className="flex justify-center"
            dangerouslySetInnerHTML={{
                __html: formatIFrame(post.secure_media?.oembed?.html)
            }}></div>
    );
}

export default TwitchContent;
