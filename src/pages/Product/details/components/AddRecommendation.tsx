import { useEffect, useState } from "react";
import { myUser } from "../../../../helpers/httpClient/userClient";
import { ArrowPathIcon, StarIcon } from "@heroicons/react/20/solid";
import { useMutation, useQueryClient } from "react-query";
import { postRecommendation } from "../../../../helpers/httpClient/recommendationClient";

const AddRecommendation = ({ productId }) => {
    const [disabled, setDisable] = useState(false)
    const [addRecommend, setRecommendation] = useState({
        rating: 0,
        comment: '',
        productId: productId
    });

    useEffect(() => {
        const { rating, comment } = addRecommend;
        if (rating < 1 || comment.length < 1) {
            return setDisable(true)
        } return setDisable(false)
    }, [addRecommend])

    const querieClient = useQueryClient();
    const { mutate: delRecommendation, isLoading: deleteLoading } = useMutation(() => postRecommendation(addRecommend).then(
        () => querieClient.invalidateQueries(['recommendations', productId])
    ))
    const handleDelete = async () => {
        delRecommendation();
        setRecommendation((prevstate) => ({
            ...prevstate,
            rating: 0,
            comment: '',
            productId: productId
        }));
    };

    const handleChange = (event) => {
        const { id, value } = event.target;

        setRecommendation((prevstate) => ({
            ...prevstate,
            [id]: value,
        }));
    }

    const userName = myUser();

    return (
        <div className="flex justify-between gap-1 w-full">
            <div className="">
                <p className="rounded-full flex justify-center items-center h-10 w-10 bg-gray-100 dark:bg-gray-800 font-black">
                    { userName && userName.slice(0, 1) }
                </p>
            </div>
            <form className="flex flex-col w-full h-24 gap-1">
                <textarea
                    placeholder="Fale sobre o produto..."
                    className="rounded-md h-full w-full text-sm text-gray-900 "
                    id="comment"
                    value={addRecommend.comment}
                    onChange={handleChange}
                >
                </textarea>
                <div className="w-full flex justify-between">
                    <div className='flex'>
                        <StarIcon
                            onClick={() => setRecommendation((prev) => ({ ...prev, rating: 1}))}
                            className={`h-4 cursor-pointer ${addRecommend.rating > 0 ? 'text-yellow-400' : 'text-gray-400 dark:text-gray-600'}`}
                        />
                        <StarIcon
                            onClick={() => setRecommendation((prev) => ({ ...prev, rating: 2}))}
                            className={`h-4 cursor-pointer ${addRecommend.rating > 1 ? 'text-yellow-400' : 'text-gray-400 dark:text-gray-600'}`}
                        />
                        <StarIcon
                            onClick={() => setRecommendation((prev) => ({ ...prev, rating: 3}))}
                            className={`h-4 cursor-pointer ${addRecommend.rating > 2 ? 'text-yellow-400' : 'text-gray-400 dark:text-gray-600'}`}
                        />
                        <StarIcon
                            onClick={() => setRecommendation((prev) => ({ ...prev, rating: 4}))}
                            className={`h-4 cursor-pointer ${addRecommend.rating > 3 ? 'text-yellow-400' : 'text-gray-400 dark:text-gray-600'}`}
                        />
                        <StarIcon
                            onClick={() => setRecommendation((prev) => ({ ...prev, rating: 5}))}
                            className={`h-4 cursor-pointer ${addRecommend.rating > 4 ? 'text-yellow-400' : 'text-gray-400 dark:text-gray-600'}`}
                        />
                    </div>
                    <button
                        type="button"
                        className={`flex justify-center items-center w-14 h-7 ${disabled ? 'opacity-30 bg-gray-500' : 'bg-green-400 hover:bg-green-500 cursor-pointer'} duration-300 ease-in-out py-1 px-2 rounded-md text-gray-900 text-sm`}
                        disabled={disabled}
                        onClick={handleDelete}
                    >
                    { deleteLoading ? (
                        <ArrowPathIcon className="h-4 animate-spin dark:text:gray-100"/>
                    ) : <p>Enviar</p>
                    
                    }
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddRecommendation;
