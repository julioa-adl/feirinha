import StarIcon from "@heroicons/react/20/solid/StarIcon";
import { format, parseISO, set } from 'date-fns';


const RecommendationCard = ({ recommendation }) => {
    const formatarData = (dataISO) => {
        const dataUTC = set(parseISO(dataISO), { hours: 24, minutes: 0, seconds: 0 });
        const dataFormatada = format(dataUTC, "dd/MM/yy");
        return dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
      };

    return (
        <li
            key={`recommendation-card-${recommendation['_id']}`}
            className="flex justify-start items-start gap-2"    
        >
            <div className="rounded-full flex justify-center items-center h-10 w-10 bg-gray-100 dark:bg-gray-800 font-black">{ recommendation.userName && recommendation.userName.slice(0, 1) }</div>
            <div>
                <div className="flex justify-between items-baseline gap-1">
                    <h2 className="text-sm">{ recommendation.userName && `${recommendation.userName.split(' ').slice(0, 1)} ${recommendation.userName.split(' ').slice(1, 2)}` }</h2>
                    <p className="text-xs text-gray-400 dark:text-gray-600">{ recommendation.date && formatarData(recommendation.date) }</p>
                </div>

                <p className="text-sm text-left font-light">{ recommendation.comment && recommendation.comment }</p>
                <div className='flex'>
                    <StarIcon className={`h-3 ${recommendation.rating && Number(recommendation.rating) > 0 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-800'}`}/>
                    <StarIcon className={`h-3 ${recommendation.rating && Number(recommendation.rating) > 1 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-800'}`}/>
                    <StarIcon className={`h-3 ${recommendation.rating && Number(recommendation.rating) > 2 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-800'}`}/>
                    <StarIcon className={`h-3 ${recommendation.rating && Number(recommendation.rating) > 3 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-800'}`}/>
                    <StarIcon className={`h-3 ${recommendation.rating && Number(recommendation.rating) > 4 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-800'}`}/>
                </div>

            </div>
        </li>
    )
}

export default RecommendationCard;
