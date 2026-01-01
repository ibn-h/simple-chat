import { BACKGROUND_COLOR_OTHER } from "../CONSTANTS.json";

export type messageProps = {
  name: string;
  time: string;
  text: string;
  bubbleColor?: string;
};

export function Message({
  name,
  time,
  text,
  bubbleColor = BACKGROUND_COLOR_OTHER,
}: messageProps) {
  return (
    <div className={`${bubbleColor} w-fit p-4 rounded-lg gap-4`}>
      <p className="text-lg font-semibold">{name}</p>
      <p>{text}</p>
      <p className="w-full text-right text-sm">{time}</p>
    </div>
  );
}
