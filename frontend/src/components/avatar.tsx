export type AvatarProps = {
  ovaleColor?: string;
};

function Avatar({ ovaleColor = "oklch(87.2% 0.01 258.338)" }: AvatarProps) {
  return (
    <div
      style={{ backgroundColor: ovaleColor }}
      className={`w-16 h-16 rounded-full`}
    ></div>
  );
}

export default Avatar;
