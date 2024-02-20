import { useRef, useEffect, useState } from 'react';
import { StarIcon, EllipsisVerticalIcon, TrashIcon, ArrowPathIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { format, parseISO, set } from 'date-fns';
import { thisIsMyComment } from "../../../../helpers/httpClient/recommendationClient";
import { deleteRecomendation } from '../../../../helpers/httpClient/recommendationClient';
import { useMutation, useQueryClient } from 'react-query';

function useOutsideClick(ref, callback) {
    useEffect(() => {
        function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            callback();
        }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
}

const RecommendationCard = ({ recommendation }) => {
    const [deleteBox, setDeleteBox] = useState(false)
    const [visibleElipsis, setDvisibleElipsis] = useState(false)
    const wrapperRef = useRef(null);

    const querieClient = useQueryClient();
    const { mutate: delRecommendation, isLoading: deleteLoading, isError: deleteError } = useMutation(() => deleteRecomendation(recommendation['_id']).then(
        () => querieClient.invalidateQueries(`recommendations-detail-${recommendation.productId}`)
    ))
    const handleDelete = async () => {
        delRecommendation();
    };

    const formatarData = (dataISO) => {
        const dataUTC = set(parseISO(dataISO), { hours: 24, minutes: 0, seconds: 0 });
        const dataFormatada = format(dataUTC, "dd/MM/yy");
        return dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
      };

    useOutsideClick(wrapperRef, () => {
        setDeleteBox(false);
        setDvisibleElipsis(false)
    });
    
    const iCanDeleteThisComment = thisIsMyComment(recommendation.userId && recommendation.userId)

    return (
        <li
            className={`flex group/comment relative w-full justify-start items-start gap-2`}
            onMouseEnter={() => setDvisibleElipsis(true)}
            onMouseLeave={() => !deleteBox && setDvisibleElipsis(false)}
        >
            <div className="">
                <p className="rounded-full flex justify-center items-center h-10 w-10 bg-gray-100 dark:bg-gray-800 font-black">
                    { recommendation.userName && recommendation.userName.slice(0, 1) }
                </p>
            </div>
            <div>
                <div className="flex justify-start items-baseline gap-2">
                    <h2 className="text-sm">{ recommendation.userName && `${recommendation.userName.split(' ').slice(0, 1)} ${recommendation.userName.split(' ').slice(1, 2)}` }</h2>
                    <p className="text-xs text-gray-400 dark:text-gray-600">{ recommendation.date && formatarData(recommendation.date) }</p>
                </div>

                <div className='flex'>
                    <StarIcon className={`h-3 ${recommendation.rating && Number(recommendation.rating) > 0 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-800'}`}/>
                    <StarIcon className={`h-3 ${recommendation.rating && Number(recommendation.rating) > 1 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-800'}`}/>
                    <StarIcon className={`h-3 ${recommendation.rating && Number(recommendation.rating) > 2 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-800'}`}/>
                    <StarIcon className={`h-3 ${recommendation.rating && Number(recommendation.rating) > 3 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-800'}`}/>
                    <StarIcon className={`h-3 ${recommendation.rating && Number(recommendation.rating) > 4 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-800'}`}/>
                </div>
                <p className="text-sm text-left w-4/5 font-light">{ recommendation.comment && recommendation.comment }</p>

            </div>
            <div
                className={`absolute flex items-start ${visibleElipsis ? 'md:opacity-100' : 'md:opacity-0'} duration-150 ease-in-out cursor-pointer right-0`}
                ref={wrapperRef}
            >
                <div className={`${deleteBox ? 'block' : 'hidden'} py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white`}>
                    <button
                        type="button"
                        disabled={!iCanDeleteThisComment}
                        className={`${iCanDeleteThisComment ? 'opacity-100 hover:bg-gray-200 dark:hover:bg-gray-600' : 'opacity-30'} text-xs cursor-pointer flex justify-between items-baseline gap-1 px-2 py-1`}
                        onClick={() => handleDelete()}
                    >
                        {
                            !deleteLoading ? (
                                <TrashIcon className='h-3 cursor-pointer duration-300 ease-in-out hover:text-red-400'/>
                            ) : <ArrowPathIcon className="h-3 animate-spin dark:text:gray-100"/>
                        }
                        
                        Excluir Avaliação
                    </button>
                </div>
                <EllipsisVerticalIcon
                    className="h-6"
                    onClick={() => setDeleteBox(!deleteBox)}
                />
            </div>
            <div className={`absolute flex items-start duration-150 ease-in right-4`}>
                {
                    deleteError && <ExclamationTriangleIcon className="h-6 animate-spin text-red-500"/>
                }
            </div>
        </li>
    )
}

export default RecommendationCard;
