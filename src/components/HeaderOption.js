import '../styles/HeaderOption.css';
export default function HeaderOption({ Icon, header, avatar }) {
  return (
    <div className="Header__Option">
      {Icon && <Icon />}
      {avatar && <img src={avatar} />}
      <h3>{header}</h3>
    </div>
  );
}
