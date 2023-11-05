import { PencilSquareIcon, ArchiveBoxXMarkIcon, BuildingStorefrontIcon } from '@heroicons/react/24/outline';

const typeUse = {
  mercado: <BuildingStorefrontIcon className="h-8 md:h-12 text-gray-400 opacity-20"/>,
  produto: <ArchiveBoxXMarkIcon className="h-8 md:h-12 text-gray-400 opacity-20"/>,
  feirinha: <ArchiveBoxXMarkIcon className="h-8 md:h-12 text-gray-400 opacity-20"/>
}

const SkeletonCard = ({ type }) => {
 
  
  return(
  <div className="flex flex-col justify-center items-center gap-5 w-full">
    <div className="relative flex w-full md:w-1/2 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 gap-2
    p-3 shadow before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r
    before:from-transparent before:via-white/20 hover:shadow-lg before:animate-[shimmer_1.5s_infinite]">
      <div className={`w-1/6 flex justify-center items-center h-14 md:h-20 md:px-4 bg-neutral-300 dark:bg-gray-600 rounded-md`}>
        {
          typeUse[type]
        }
      </div>
      <div className="flex flex-col w-4/6 gap-2 justify-center">
        <div className="h-3.5 md:h-5 w-full rounded-sm bg-neutral-300 dark:bg-gray-600 shadow"></div>
        <div className="h-3 md:h-4 w-5/12 rounded-sm bg-neutral-300 dark:bg-gray-600 shadow"></div>
        <div className="h-3 md:h-4 w-8/12 rounded-sm bg-neutral-300 dark:bg-gray-600 shadow"></div>
      </div>
      <div className='w-1/6 flex justify-end items-center'>
        <PencilSquareIcon className='w-8 h-8 text-neutral-300 dark:text-gray-600' />
      </div>
    </div>
    <div className="relative flex w-full md:w-1/2 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 gap-2
    p-3 shadow before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r
    before:from-transparent before:via-white/20 hover:shadow-lg before:animate-[shimmer_1.5s_infinite]">
      <div className={`w-1/6 flex justify-center items-center h-14 md:h-20 md:px-4 bg-neutral-300 dark:bg-gray-600 rounded-md`}>
        {
          typeUse[type]
        }
      </div>
      <div className="flex flex-col w-4/6 gap-2 justify-center">
        <div className="h-3.5 md:h-5 w-full rounded-sm bg-neutral-300 dark:bg-gray-600 shadow"></div>
        <div className="h-3 md:h-4 w-5/12 rounded-sm bg-neutral-300 dark:bg-gray-600 shadow"></div>
        <div className="h-3 md:h-4 w-8/12 rounded-sm bg-neutral-300 dark:bg-gray-600 shadow"></div>
      </div>
      <div className='w-1/6 flex justify-end items-center'>
        <PencilSquareIcon className='w-8 h-8 text-neutral-300 dark:text-gray-600' />
      </div>
    </div>
    <div className="relative flex w-full md:w-1/2 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 gap-2
    p-3 shadow before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r
    before:from-transparent before:via-white/20 hover:shadow-lg before:animate-[shimmer_1.5s_infinite]">
      <div className={`w-1/6 flex justify-center items-center h-14 md:h-20 md:px-4 bg-neutral-300 dark:bg-gray-600 rounded-md`}>
        {
          typeUse[type]
        }
      </div>
      <div className="flex flex-col w-4/6 gap-2 justify-center">
        <div className="h-3.5 md:h-5 w-full rounded-sm bg-neutral-300 dark:bg-gray-600 shadow"></div>
        <div className="h-3 md:h-4 w-5/12 rounded-sm bg-neutral-300 dark:bg-gray-600 shadow"></div>
        <div className="h-3 md:h-4 w-8/12 rounded-sm bg-neutral-300 dark:bg-gray-600 shadow"></div>
      </div>
      <div className='w-1/6 flex justify-end items-center'>
        <PencilSquareIcon className='w-8 h-8 text-neutral-300 dark:text-gray-600' />
      </div>
    </div>
    <div className="relative flex w-full md:w-1/2 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 gap-2
    p-3 shadow before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r
    before:from-transparent before:via-white/20 hover:shadow-lg before:animate-[shimmer_1.5s_infinite]">
      <div className={`w-1/6 flex justify-center items-center h-14 md:h-20 md:px-4 bg-neutral-300 dark:bg-gray-600 rounded-md`}>
        {
          typeUse[type]
        }
      </div>
      <div className="flex flex-col w-4/6 gap-2 justify-center">
        <div className="h-3.5 md:h-5 w-full rounded-sm bg-neutral-300 dark:bg-gray-600 shadow"></div>
        <div className="h-3 md:h-4 w-5/12 rounded-sm bg-neutral-300 dark:bg-gray-600 shadow"></div>
        <div className="h-3 md:h-4 w-8/12 rounded-sm bg-neutral-300 dark:bg-gray-600 shadow"></div>
      </div>
      <div className='w-1/6 flex justify-end items-center'>
        <PencilSquareIcon className='w-8 h-8 text-neutral-300 dark:text-gray-600' />
      </div>
    </div>
    <div className="relative flex w-full md:w-1/2 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 gap-2
    p-3 shadow before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r
    before:from-transparent before:via-white/20 hover:shadow-lg before:animate-[shimmer_1.5s_infinite]">
      <div className={`w-1/6 flex justify-center items-center h-14 md:h-20 md:px-4 bg-neutral-300 dark:bg-gray-600 rounded-md`}>
        {
          typeUse[type]
        }
      </div>
      <div className="flex flex-col w-4/6 gap-2 justify-center">
        <div className="h-3.5 md:h-5 w-full rounded-sm bg-neutral-300 dark:bg-gray-600 shadow"></div>
        <div className="h-3 md:h-4 w-5/12 rounded-sm bg-neutral-300 dark:bg-gray-600 shadow"></div>
        <div className="h-3 md:h-4 w-8/12 rounded-sm bg-neutral-300 dark:bg-gray-600 shadow"></div>
      </div>
      <div className='w-1/6 flex justify-end items-center'>
        <PencilSquareIcon className='w-8 h-8 text-neutral-300 dark:text-gray-600' />
      </div>
    </div>
  </div>
  )
};

export default SkeletonCard;
