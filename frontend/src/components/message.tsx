import Constants from "../CONSTANTS.json";

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
  bubbleColor = Constants.BACKGROUND_COLOR_OTHER,
}: messageProps) {
  return (
    <div className={`bg-${bubbleColor} w-fit p-4 rounded-lg`}>
      <div className="w-full flex items-start justify-between mb-2">
        <p className="text-lg font-semibold">{name}</p>
        <p>{time}</p>
      </div>

      <p>{text}</p>
    </div>
  );
}
