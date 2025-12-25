export type PersoonProps = {
  ovaleColor?: string;
};

function Persoon({ ovaleColor = "gray-300" }: PersoonProps) {
  return <div className={`bg-${ovaleColor} w-16 h-16 rounded-full`}></div>;
}

export default Persoon;
