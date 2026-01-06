import type { messageProps } from "./message";
import type { AvatarProps } from "./avatar";

import { Message } from "./message";
import Avatar from "./avatar";

type MessageContainerProps = messageProps &
  AvatarProps & {
    justifySelf?: "start" | "end";
  };

function MessageContainer(props: MessageContainerProps) {
  return (
    <div
      className={`flex gap-3 items-end ${
        props.justifySelf == "end"
          ? "self-end flex-row-reverse"
          : "self-start flex-row"
      }`}
    >
      <Avatar {...props} />
      <Message {...props} />
    </div>
  );
}

export default MessageContainer;
