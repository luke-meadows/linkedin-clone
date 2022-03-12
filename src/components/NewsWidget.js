import '../styles/NewsWidget.css';
import InfoIcon from '@mui/icons-material/Info';
import CircleIcon from '@mui/icons-material/Circle';

export default function NewsWidget() {
  return (
    <div className="news__widget">
      <div className="news__widget__top">
        <h3>LinkedIn News</h3>
        <InfoIcon />
      </div>

      <div className="news__article">
        <div className="news__article__header">
          <CircleIcon />
          <h6>Ukraine kicking Russia's Arse</h6>
        </div>
        <p>20 hours ago</p>
      </div>
      <div className="news__article">
        <div className="news__article__header">
          <CircleIcon />
          <h6>Ukraine kicking Russia's Arse</h6>
        </div>
        <p>20 hours ago</p>
      </div>
      <div className="news__article">
        <div className="news__article__header">
          <CircleIcon />
          <h6>Ukraine kicking Russia's Arse</h6>
        </div>
        <p>20 hours ago</p>
      </div>
    </div>
  );
}
