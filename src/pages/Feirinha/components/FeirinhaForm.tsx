import { ChangeEvent, useState, useEffect, useContext } from "react";
import { Ifeirinha } from "../../../helpers/httpClient";
import Loading from "../../../general-components/Loading";
import { registerFeirinha, updateFeirinha } from "../../../helpers/httpClient";
import RegisteredSuccess from "../../../general-components/alerts/RegisteredSuccess";
import EditedSuccess from "../../../general-components/alerts/EditedSuccess";
import Error from "../../../general-components/alerts/Error";
import context from "../../../context/myContext";
import { useMutation, useQueryClient } from 'react-query';
import { CalendarDaysIcon } from "@heroicons/react/24/solid";

type usageType = 'Cadastrar' | 'Atualizar';

interface MarketFormProps {
  typeUse: usageType,
  feirinha?: Ifeirinha
}

type FormType = {
  Cadastrar: JSX.Element;
  Atualizar: JSX.Element;
  Erro: JSX.Element;
};

const FeirinhaForm = ({ feirinha, typeUse }: MarketFormProps) => {
  const [disable, setDisable] = useState(true);
  const [addFeirinha, setFeirinha] = useState<Ifeirinha>({
    id: feirinha ? feirinha['_id'] : '',
    userId: feirinha ? feirinha.userId : '',
    marketId: feirinha ? feirinha.marketId : '',
    listCart: feirinha ? feirinha.listCart : [],
    date: feirinha ? feirinha.date : '',
  });

  const {
    markets
  } = useContext(context);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setFeirinha((prevstate) => ({
      ...prevstate,
      [id]: value,
    }));
  }

  useEffect(() => {
    const { marketId } = addFeirinha;
    if (marketId) {
      return setDisable(false);
    }
    return setDisable(true);
  }, [addFeirinha])

  const querieClient = useQueryClient();
  const { mutate: registerFeira, isLoading: registerLoading, isSuccess: registerSucess, isError: registerError } = useMutation(() => registerFeirinha(addFeirinha).then(
    () => querieClient.invalidateQueries('feirinhas')
  ))
  const handleRegistered = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    registerFeira();
  };
  const { mutate: updateFeira, isLoading: updateLoading, isSuccess: updateSucess, isError: updateError } = useMutation(() => updateFeirinha(addFeirinha).then(
    () => querieClient.invalidateQueries('feirinhas')
  ))
  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    updateFeira();
  };

  const returnForm: FormType = {
    Cadastrar: <RegisteredSuccess />,
    Atualizar: <EditedSuccess />,
    Erro: <Error />
  }

  return(
    <div>
      {
      (updateSucess || updateError) || (registerSucess || registerError) ? (
        returnForm[(registerError || updateError) ? 'Erro' : typeUse]
      ) : (
      <form>

        <div className="flex flex-col gap-1">
          <label
            className="text-gray-100 flex justify-between items-end text-sm"
          >mercado: <span className="text-gray-600 text-xs">obrigatório</span></label>
          <select
            id='marketId'
            value={ addFeirinha.marketId }
            onChange={ handleChange }
            className={`px-4 py-1 w-full rounded-md ${addFeirinha.marketId === '' ? 'text-gray-400' : 'text-gray-900'}`}
      >
        <option value={''} disabled>-</option>
            {
              markets && markets.data.map((mercado, i) => (
              <option
                key={`feirinha-form-${mercado.name}-${i}`}
                value={ mercado._id }>{ mercado.name }</option>
              ))
            }
          </select>
        </div>
        
        <div className="relative flex flex-col gap-1">
        <label
            className="text-gray-100 flex justify-between items-end text-sm"
          >data: <span className="text-gray-600 text-xs">obrigatório</span></label>
          <CalendarDaysIcon className="h-5 absolute text-gray-800 top-7 left-3"/>
          <input
            type="date"
            required
            id='date'
            onChange={ handleChange }
            placeholder='dd/mm/aaaa'
            className={`appearance-none rounded-md px-8 py-2 w-full text-center h-8`}/>
        </div>
        
        <button
              type="submit"
              disabled={ disable }
              className={`flex justify-center text-center items-center font-medium
              rounded-full text-sm px-3 py-2 w-full text-white mt-3
              ${ disable ? 'bg-blue-400 opacity-50'
              : 'bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-1 dark:bg-blue-600 dark:hover:bg-blue-700'}`}
              onClick={ typeUse === 'Cadastrar' ? ( handleRegistered ) : ( handleUpdate ) }
            >
              { registerLoading || updateLoading ? <Loading loading /> : typeUse }
            </button>
      </form>
      )
    }
    </div>
  )
}

export default FeirinhaForm;
