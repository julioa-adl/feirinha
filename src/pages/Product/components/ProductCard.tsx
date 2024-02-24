import { useContext } from "react";
import context from '../../../context/myContext';
import { PencilSquareIcon, ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline';
import { Iprod } from "../../../interfaces/IProduct";
import { useNavigate } from "react-router-dom";
// import { StarIcon } from "@heroicons/react/20/solid";
// import { getRecommendations } from "../../../helpers/httpClient/recommendationClient";
// import { useQuery } from "react-query";

interface productCards {
  prod: Iprod
}

const ProductCard = ({ prod }:productCards) => {
  const {
    setEditProd,
    setShowProd
  } = useContext(context);

  const history = useNavigate();
  const goToProductDetails = (id) => {
    history(`/produtos/${id}`);
  };

  // const { data: recommendationsData } = useQuery(`recommendations-detail-${prod._id}`, () => getRecommendations(prod._id));
  // const mediaRecommendation = recommendationsData && recommendationsData.reduce((acc, cur) => acc + Number(cur.rating), 0) / recommendationsData.length;
  
  return(
    <li
      className='flex justify-between items-center gap-2
      text-left w-full md:w-1/2 text-gray-900 dark:text-gray-100
      rounded-xl p-2 md:p-4 bg-white dark:bg-gray-800 dark:hover:bg-gray-700'
      
    >
      <div
        className="flex justify-between items-center gap-2
        text-left w-5/6 cursor-pointer group"
        onClick={() => goToProductDetails(prod._id) }
      >
        <div className={`relative w-1/5 flex justify-center items-center h-14 md:h-20 overflow-hidden bg-white rounded-md`}>
          { prod.image ? (
                <img src={`${prod.image}`} alt={prod.name} className="scale-100 group-hover:scale-110 duration-300 ease-in-out"/>
            ) : <ArchiveBoxXMarkIcon className="h-8 md:h-12 text-gray-600 opacity-20"/>
          }
          {/* <div className='flex absolute bottom-1 rounded-md shadow-md shadow-gray-500 bg-gray-900 bg-opacity-90'>
            <StarIcon className={`h-2 ${mediaRecommendation && mediaRecommendation > 0 ? 'text-yellow-300' : 'text-gray-400'}`}/>
            <StarIcon className={`h-2 ${mediaRecommendation && mediaRecommendation > 1 ? 'text-yellow-300' : 'text-gray-400'}`}/>
            <StarIcon className={`h-2 ${mediaRecommendation && mediaRecommendation > 2 ? 'text-yellow-300' : 'text-gray-400'}`}/>
            <StarIcon className={`h-2 ${mediaRecommendation && mediaRecommendation > 3 ? 'text-yellow-300' : 'text-gray-400'}`}/>
            <StarIcon className={`h-2 ${mediaRecommendation && mediaRecommendation > 4 ? 'text-yellow-300' : 'text-gray-400'}`}/>
          </div> */}
        </div>
        <div className="w-4/5">
          <div className="flex flex-row gap-2 font-semibold text-xs md:text-base lowercase items-center">
            <span>{ `${prod.name} ${prod.subName} - ${prod.size}${prod.unitMeasure}` }</span>
          </div>
          <div className="dark:text-gray-500 font-light text-xs uppercase">
            <h2>{ prod.manufacturer }</h2>
            <h2>{ `Cod: ${prod.code}` }</h2>
          </div>
        </div>
      </div>
      <div className='w-1/6 flex justify-end'>
        <PencilSquareIcon
          onClick={() => {
            setEditProd(prod)
            setShowProd('update')
          }}
          className='w-8 h-8 cursor-pointer duration-300 ease-in-out hover:text-red-500' />
      </div>
    </li>
  )
};

export default ProductCard;
