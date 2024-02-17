import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { ArchiveBoxXMarkIcon, ChartPieIcon, DocumentDuplicateIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import MobileMenu from "../../../general-components/MobileMenu";
import Navigator from "../../../general-components/Navigator";
import User from '../../../general-components/User';
import { getProductById } from '../../../helpers/httpClient/productClient';
import { useState } from 'react';

const ProductDetails = () => {
  const { id } = useParams();
  const [copyIcon, setCopyIcon] = useState(<DocumentDuplicateIcon className='h-4 group-hover:text-green-400 duration-300 ease-in-out' />)
  const { data: itemData, isLoading: itemLoading} = useQuery('product-detail', () => getProductById(id), {retry: 10});
  const copyToClipboard = async (mytext: string) => {
    try {
      await navigator.clipboard.writeText(mytext);
      console.log('Texto copiado para a área de transferência');
    } catch (err) {
      console.log('Falha ao copiar o texto', err);
    }
  };

  const copyEffect = () => {
    setCopyIcon(<CheckCircleIcon className='h-4 group-hover:text-green-400 duration-300 ease-in-out' />)
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
        <div className="dark:text-gray-100 text-gray-900 text-center w-screem pt-20 pb-36 md:py-0 lg:h-4/5 md:px-40 px-5 overflow-auto flex
        flex-col items-center gap-2 drop-shadow-lg">
            <div className='w-full md:h-1/2 flex flex-col md:flex-row justify-center gap-5'>
                <div className={`md:w-1/3 flex justify-center items-center h-52 md:h-full overflow-hidden bg-white rounded-2xl`}>
                    { itemData ? (
                            <img src={`${itemData.image}`} alt={itemData.name} className="scale-100 w-full"/>
                        ) : <ArchiveBoxXMarkIcon className="h-full text-gray-600 opacity-20"/>
                    }
                </div>

                <div className='md:w-1/3 flex flex-col justify-start items-start gap-2'>
                    <div  className='flex text-sm md:text-md h-2/3 w-full flex-col justify-start items-start gap-2'>
                        <p className='rounded-full px-5 text-left w-full bg-white dark:bg-gray-800'><strong className='text-gray-500'>Nome do produto: </strong>{itemData && itemData.name}</p>
                        <p className='rounded-full px-5 text-left w-full bg-white dark:bg-gray-800'><strong className='text-gray-500'>Outros detalhes: </strong>{itemData && itemData.subName}</p>
                        <p className='rounded-full px-5 text-left w-full bg-white dark:bg-gray-800'><strong className='text-gray-500'>Fabricante: </strong>{itemData && itemData.manufacturer}</p>
                        <p className='rounded-full px-5 text-left w-full bg-white dark:bg-gray-800'><strong className='text-gray-500'>Categoria: </strong>{itemData && itemData.category}</p>
                        <p onClick={() => { copyToClipboard(itemData.code); copyEffect() }} className='flex items-center gap-1 rounded-full cursor-pointer px-5 text-left w-full bg-white dark:bg-gray-800 group'><strong className='text-gray-500'>Codigo de barras: </strong>{itemData && itemData.code } {copyIcon} </p>
                        <p className='rounded-full px-5 text-left w-full bg-white dark:bg-gray-800'><strong className='text-gray-500'>Dimensões: </strong>{itemData && `${itemData.size} / ${itemData.unitMeasure}`}</p>
                        <p className='rounded-full px-5 text-left w-full bg-white dark:bg-gray-800'><strong className='text-gray-500'>Unidade de venda: </strong>{itemData && itemData.unitSelling}</p>
                    </div>
                </div>
            </div>
        </div>
        <MobileMenu />
    </div>
    )
}

export default ProductDetails;
