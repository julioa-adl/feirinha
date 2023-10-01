import { ArrowPathIcon } from '@heroicons/react/24/outline';

const Loading = ({ loading }) => {

  return(
    <>
     <ArrowPathIcon className={`h-5 text-gray-100 ${loading ? 'block animate-spin' : 'hidden'}`}/>
    </>
  )
}

export default Loading;
