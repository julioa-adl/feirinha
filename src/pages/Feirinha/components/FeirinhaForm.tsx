import { ChangeEvent, useState, useEffect, useContext } from "react";
import { Ifeirinha } from "../../../interfaces/IFeirinha";
import Loading from "../../../general-components/Loading";
import { registerFeirinha, updateFeirinha } from "../../../helpers/httpClient/feirinhaClient";
import RegisteredSuccess from "../../../general-components/alerts/RegisteredSuccess";
import EditedSuccess from "../../../general-components/alerts/EditedSuccess";
import Error from "../../../general-components/alerts/Error";
import context from "../../../context/myContext";
import { useMutation, useQueryClient } from 'react-query';
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

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
    availableToSpend: feirinha ? feirinha.availableToSpend : 0,
    marketId: feirinha ? feirinha.marketId : '',
    listCart: feirinha ? feirinha.listCart : [],
    date: feirinha ? feirinha.date : '',
  });

  const {
    markets,
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
// teste
  return(
    <div>
      {
      (updateSucess || updateError) || (registerSucess || registerError) ? (
        returnForm[(registerError || updateError) ? 'Erro' : typeUse]
      ) : (
      <form className="flex flex-col gap-1">
        <div className="flex justify-between items-end gap-2">
          <div className="flex flex-col w-full">
            <label
              className="text-gray-100 flex justify-between items-end text-sm"
            >mercado: <span className="text-gray-600 text-xs">obrigatório</span></label>
            <select
              id='marketId'
              value={ addFeirinha.marketId }
              onChange={ handleChange }
              className={`px-4 form-select lowercase py-1 w-full h-8 text-sm rounded-md ${addFeirinha.marketId === '' ? 'text-gray-400' : 'text-gray-900'}`}
        >
          <option value={''} disabled>-</option>
              {
                markets && markets.data.map((mercado, i) => (
                <option
                  key={`feirinha-form-${mercado.name}-${i}`}
                  value={ mercado._id }>{mercado.name} - {mercado.neighborhood} - {mercado.state}</option>
                ))
              }
            </select>
          </div>

          <Link to={'mercados'}>
            <PlusSmallIcon
              className="h-8 ease-in-out rounded-md duration-300 cursor-pointer bg-yellow-500 hover:bg-gray-100 text-gray-800 hover:text-yellow-500"
            />
          </Link>
        </div>

        <div className="flex gap-2 w-48 justify-between items-end">
          <div className="relative flex w-full flex-col">
          <label
              className="text-gray-100 flex justify-between items-end text-sm"
            >total a gastar: </label>
              <input
                type="number"
                required
                id='availableToSpend'
                value={ addFeirinha.availableToSpend }
                onFocus={() => {
                  if (addFeirinha.availableToSpend === 0) {
                    setFeirinha((prevstate) => ({
                      ...prevstate,
                      availableToSpend: '',
                    }))
                  }
                }}
                onBlur={() => {
                  if (addFeirinha.availableToSpend === '') {
                    setFeirinha((prevstate) => ({
                      ...prevstate,
                      availableToSpend: 0,
                    }))
                  }
                }}
                onChange={ handleChange }
                className={`appearance-none text-sm rounded-md px-4 py-1 w-full text-center h-8`}/>
            </div>
            <h1 className="text-gray-100 font-bold text-lg">R$</h1>
        </div>
        
        { typeUse === 'Atualizar' && (
          <div className="relative flex flex-col">
            <label
              className="text-gray-100 flex justify-between items-end text-sm"
            >data: <span className="text-gray-600 text-xs">obrigatório</span></label>
            <input
              type="date"
              required
              id='date'
              onChange={ handleChange }
              className={`form-input text-sm rounded-md px-4 py-1 w-full h-8`}/>
          </div>
          )
        }
        
        
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
