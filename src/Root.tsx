import { Composition, Folder } from "remotion";
import { Short01 } from "./short01/Short01";

export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="Shorts">
      <Composition
        id="Short01"
        component={Short01}
        durationInFrames={1837}
        fps={60}
        width={1080}
        height={1920}
      />
    </Folder>
  );
};
