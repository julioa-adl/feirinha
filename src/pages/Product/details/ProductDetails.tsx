import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { ArchiveBoxXMarkIcon, ChartPieIcon, DocumentDuplicateIcon, CheckCircleIcon, CurrencyDollarIcon,
  ArrowTrendingUpIcon, ArrowUpCircleIcon, ArrowDownCircleIcon, ArrowPathIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import MobileMenu from "../../../general-components/MobileMenu";
import Navigator from "../../../general-components/Navigator";
import User from '../../../general-components/User';
import { getProductById } from '../../../helpers/httpClient/productClient';
import { getAllByProductId } from '../../../helpers/httpClient/feirinhaClient';
import { getRecommendations } from '../../../helpers/httpClient/recommendationClient';
import RecommendationCard from './components/RecommendationsCard';
import AddRecommendation from './components/AddRecommendation';

const ProductDetails = () => {
  const [copyIcon, setCopyIcon] = useState(<DocumentDuplicateIcon className='h-4 group-hover:text-green-400 duration-300 ease-in-out' />)

  const { id } = useParams();

  const { data: itemData, isLoading: itemLoading} = useQuery(['product', id], () => getProductById(id));

  const { data: recommendationsData } = useQuery(['recommendations', id], () => getRecommendations(id));
  const mediaRecommendation = recommendationsData && recommendationsData.reduce((acc, cur) => acc + Number(cur.rating), 0) / recommendationsData.length;

  const { data: statisticsData, isLoading: statisticsLoading } = useQuery(['statistics', id], () => getAllByProductId(id));
  const media = statisticsData && statisticsData.reduce((acc, cur) => acc + Number(cur.price), 0) / statisticsData.length;
  const totalVendas = statisticsData && statisticsData.length;

  const maisCaro = statisticsData && statisticsData.reduce((max, cur) => {
    return (max.price > cur.price) ? max : cur;
  }, statisticsData[0]);
  
  const maisBarato = statisticsData && statisticsData.reduce((min, cur) => {
    return (min.price < cur.price) ? min : cur;
  }, statisticsData[0]);


  const copyToClipboard = async (mytext: string) => {
    try {
      await navigator.clipboard.writeText(mytext);
      console.log('Texto copiado para a área de transferência');
    } catch (err) {
      console.log('Falha ao copiar o texto', err);
    }
  };

  const copyEffect = () => {
    setCopyIcon(<ArrowPathIcon className='h-4 group-hover:text-green-400 duration-300 ease-in-out animate-spin' />)
    setTimeout(() => {
      setCopyIcon(<><CheckCircleIcon className='h-4 group-hover:text-green-400 duration-300 ease-in-out' /><span className='text-xs'>copiado</span></>)
  }, 1000)
    setTimeout(() => {
        setCopyIcon(<DocumentDuplicateIcon className='h-4 group-hover:text-green-400 duration-300 ease-in-out' />)
    }, 3000)
  }

  return (
    <div className="bg-white h-screen dark:bg-gray-900">
      <div className='fixed top-0 z-30 md:relative bg-white dark:bg-gray-900 p-5 flex items-center gap-1 w-full justify-center'>
        <Navigator />
        {
        itemLoading ? (
        <h1 className='rounded-full max-w-xs px-4 h-8 py-2 w-full bg-gray-100 dark:bg-gray-800
          relative overflow-hidden shadow before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r
          before:from-transparent before:via-white/40 before:animate-[shimmer_1.5s_infinite]'/>
        ) : (
        <h1 className="rounded-full flex items-start justify-center gap-1 max-w-xs text-xs px-2 py-2 mr-2 md:m-0 w-full bg-gray-100 dark:bg-gray-800 md:font-bold text-gray-900 dark:text-white">
          <ChartPieIcon className="h-4" />
          {itemData && `${itemData.name} - ${itemData.subName.slice(0, 10)}`}
        </h1>)
        }
        <User />
      </div>
      <div className="dark:text-gray-100 text-gray-900 text-center w-screem pt-20 pb-36 md:py-0 lg:h-4/5 md:px-40 px-5 overflow-auto flex flex-col items-center gap-2 drop-shadow-lg">
        <div className='w-full md:h-1/2 flex flex-col md:flex-row justify-center gap-5'>
          <div className={`md:w-1/3 flex justify-center items-center h-52 md:h-full overflow-hidden bg-white rounded-2xl`}>
            { itemData ? (
                    <img src={`${itemData.image}`} alt={itemData.name} className="scale-100 w-full"/>
                ) : <ArchiveBoxXMarkIcon className="h-full text-gray-600 opacity-20"/>
            }
          </div>

          <div className='md:w-1/3 flex flex-col justify-between items-start gap-2'>
            <div  className='flex text-sm md:text-md h-2/3 w-full flex-col justify-start items-start gap-2'>
                <p className='rounded-full px-5 text-left w-full bg-white dark:bg-gray-800'><strong className='text-gray-500'>Nome do produto: </strong>{itemData && itemData.name}</p>
                <p className='rounded-full px-5 text-left w-full bg-white dark:bg-gray-800'><strong className='text-gray-500'>Outros detalhes: </strong>{itemData && itemData.subName}</p>
                <p className='rounded-full px-5 text-left w-full bg-white dark:bg-gray-800'><strong className='text-gray-500'>Fabricante: </strong>{itemData && itemData.manufacturer}</p>
                <p className='rounded-full px-5 text-left w-full bg-white dark:bg-gray-800'><strong className='text-gray-500'>Categoria: </strong>{itemData && itemData.category}</p>
                <p onClick={() => { copyToClipboard(itemData.code); copyEffect() }} className='flex items-center gap-1 rounded-full cursor-pointer px-5 text-left w-full bg-white dark:bg-gray-800 group'><strong className='text-gray-500'>CodBar: </strong>{itemData && itemData.code } {copyIcon} </p>
                <p className='rounded-full px-5 text-left w-full bg-white dark:bg-gray-800'><strong className='text-gray-500'>Dimensões: </strong>{itemData && `${itemData.size} / ${itemData.unitMeasure}`}</p>
                <p className='rounded-full px-5 text-left w-full bg-white dark:bg-gray-800'><strong className='text-gray-500'>Unidade de venda: </strong>{itemData && itemData.unitSelling}</p>
                <p className='text-left w-full text-xs text-gray-500'>Última alteração: {itemData && itemData.lastChangeName || ''}</p>
            </div>

            <div>
              <div className='flex'>
                <StarIcon className={`h-4 ${mediaRecommendation > 0 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-800'}`}/>
                <StarIcon className={`h-4 ${mediaRecommendation > 1 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-800'}`}/>
                <StarIcon className={`h-4 ${mediaRecommendation > 2 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-800'}`}/>
                <StarIcon className={`h-4 ${mediaRecommendation > 3 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-800'}`}/>
                <StarIcon className={`h-4 ${mediaRecommendation > 4 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-800'}`}/>
              </div>
              <span className='flex gap-1 text-xs text-gray-500'>{recommendationsData && recommendationsData.length} <p>avaliações</p></span>
            </div>


            {
              statisticsData && maisCaro && maisBarato ? statisticsLoading ? (
                <div className='flex justify-between gap-1 w-full'>
                  <div className="relative flex w-full h-28 md:w-1/2 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 gap-2
                                  p-3 shadow before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r
                                  before:from-transparent before:via-white/20 hover:shadow-lg before:animate-[shimmer_1.5s_infinite]" />
                  <div className="relative flex w-full h-28 md:w-1/2 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 gap-2
                                  p-3 shadow before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r
                                  before:from-transparent before:via-white/20 hover:shadow-lg before:animate-[shimmer_1.5s_infinite]"/>
                  <div className="relative flex w-full h-28 md:w-1/2 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 gap-2
                                  p-3 shadow before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r
                                  before:from-transparent before:via-white/20 hover:shadow-lg before:animate-[shimmer_1.5s_infinite]"/>
                </div>
              ) : (
                <div className='flex justify-between gap-1 w-full'>
                  <div className='flex flex-col items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-md'>
                    <p className='font-bold text-left text-sm md:text-md text-gray-500'>Preços:</p>
                    <p className='flex text-sm md:text-md w-full gap-1 justify-between items-center'><ChevronUpIcon className='h-5 text-red-500'/>{statisticsData && maisCaro.price.toFixed(2)}</p>
                    <p className='flex text-sm md:text-md w-full gap-1 justify-between items-center'><CurrencyDollarIcon className='h-5 text-blue-500'/>{media.toFixed(2)}</p>
                    <p className='flex text-sm md:text-md w-full gap-1 justify-between items-center'><ChevronDownIcon className='h-5 text-green-500'/>{statisticsData && maisBarato.price.toFixed(2)}</p>
                  </div>
                  <div className='flex flex-col items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-md'>
                    <p className='font-bold text-left text-sm md:text-md text-gray-500'>Feiras:</p>
                    <p className='flex text-sm md:text-md my-auto justify-center items-center'>{totalVendas}</p>
                  </div>

                  <div className='flex flex-col text-left items-start w-2/3 p-2 bg-gray-100 dark:bg-gray-800 rounded-md'>
                    <div className='flex flex-col text-left items-start'>
                      <p className='font-bold text-sm md:text-md text-gray-500'>Mercado + Caro:</p>
                      <div className='flex text-xs gap-1 justify-center items-center'><div className='w-4/12'><ArrowUpCircleIcon className='h-5 text-red-500'/></div>{statisticsData && maisCaro && `${maisCaro.marketName.slice(0, 20)} - ${maisCaro.marketNeighborhood.slice(0, 10)} | ${maisCaro.marketState}`}</div>
                    </div>

                    <div  className='flex flex-col text-left items-start'>
                      <p className='font-bold text-sm md:text-md text-gray-500'>Mercado + Barato:</p>
                      <div className='flex text-xs gap-1 justify-center items-center'><div className='w-4/12'><ArrowDownCircleIcon className='h-5 text-green-500'/></div>{statisticsData && maisBarato && `${maisBarato.marketName.slice(0, 20)} - ${maisBarato.marketNeighborhood.slice(0, 10)} | ${maisBarato.marketState}`}</div>
                    </div>

                  </div>
                </div>
              ) : (<p className='w-full h-full p-2 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center gap-1 font-bold text-gray-500'><ArrowTrendingUpIcon className='h-5 text-gray-600'/> Sem Estastisticas de Compras!</p>)
            }
          </div>
        </div>

        <div className='w-full md:w-4/5 pt-10 pb-5'>
            <AddRecommendation productId={id}/>
        </div>

        <div className='w-full md:w-4/5 flex justify-start'>
          <ul className='flex flex-col gap-4 w-full pb-10'>
            {
              recommendationsData && recommendationsData.length > 0 ? (
                recommendationsData.map((r) => (
                <RecommendationCard recommendation={r} key={`recommendation-card-${r['_id']}`}/>
              ))) : <p>Sem recomendações</p>
            }
          </ul>
        </div>
      </div>
      <MobileMenu />
    </div>
  )
}

export default ProductDetails;
