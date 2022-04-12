import '../styles/ProfileInfo.css';
import PinDropIcon from '@mui/icons-material/PinDrop';

export default function ProfileInfo() {
  return (
    <div className="profile__info__container">
      <h6>Profile Info</h6>
      <div className="profile__location">
        <span>
          <PinDropIcon />
        </span>
        London
      </div>
      <div className="bio">
        <h6>Bio</h6>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
          architecto soluta mollitia illo laborum nemo aliquid ad inventore
          alias harum ratione id pariatur minus impedit ea officiis ipsum
          aliquam commodi, assumenda at corrupti consectetur natus. Doloribus
          laudantium delectus accusamus iusto voluptatem cum fugit dolorem velit
          voluptatum minus ullam, officia magni!
        </p>
        <button>Edit profile</button>
      </div>
    </div>
  );
}
