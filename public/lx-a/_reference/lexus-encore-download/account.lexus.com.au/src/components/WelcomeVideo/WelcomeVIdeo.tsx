import "./WelcomeVIdeo.scss";
import backgroundVideo from "Assets/videos/background.mp4";
import { createBemFn } from "lexus-style-guide/utilities/bem";

const bem = createBemFn("welcome-video");

const WelcomeVideo = () => (
    <video
        className={bem()}
        autoPlay
        loop
        muted
        playsInline
        poster="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
    >
        <source src={backgroundVideo} type="video/mp4" />
    </video>
);

export default WelcomeVideo;
