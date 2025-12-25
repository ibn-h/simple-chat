import type { messageProps } from "./message";
import type { PersoonProps } from "./persoon";

import { Message } from "./message";
import Persoon from "./persoon";

type MessageContainerProps = messageProps &
  PersoonProps & {
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
      <Persoon {...props} />
      <Message {...props} />
    </div>
  );
}

export default MessageContainer;
