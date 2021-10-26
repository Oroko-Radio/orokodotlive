import SocialIcon from "./SocialIcon";

const SocialSection = () => {
  return (
    <div className="flex gap-2">
      <SocialIcon social="TikTok" />
      <SocialIcon social="Twitter" />
      <SocialIcon social="Facebook" />
      <SocialIcon social="Instagram" />
    </div>
  );
};
export default SocialSection;
