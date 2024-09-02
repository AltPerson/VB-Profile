import { IWorkPlace } from '@/locales';
import parse from 'html-react-parser';

const calculateIndexDelay = (index: number) => (index === 0 ? 1.5 : index + 1);

const formatKeyWordsInAchievement = (text: string, keyWords: string[]) => {
  let tempString = text;
  keyWords.forEach((keyword) => {
    if (tempString.includes(keyword)) {
      tempString = tempString.replace(
        keyword,
        `<span className="achievement-technology">${keyword}</span>`,
      );
    }
  });
  return tempString;
};

const renderWorkPlaces = (workPlaces: IWorkPlace[]) => {
  return workPlaces.map((workPlace, index) => (
    <div
      className="work-place-box"
      key={index}
      style={{
        animation: `slide-from-right 0.5s linear forwards 1 ${calculateIndexDelay(index)}s`,
      }}
    >
      <h5 className="work-place-title">{workPlace.title}</h5>
      <h6 className="work-place-date">{workPlace.term}</h6>
      <p className="work-place-description mt-3">{workPlace.description}</p>
      <ul className="mt-3">
        {workPlace.achievements.map((achievement, index) => (
          <li key={index} className="work-place-achievement">
            {parse(formatKeyWordsInAchievement(achievement.text, achievement.keywords))}
          </li>
        ))}
      </ul>
      <div className="work-place-technologies mt-3">{workPlace.technologies.join(' · ')}</div>
    </div>
  ));
};

interface IProps {
  workPlaces: IWorkPlace[];
}

const WorkPlacesList = ({ workPlaces }: IProps) => {
  return renderWorkPlaces(workPlaces);
};

export default WorkPlacesList;
