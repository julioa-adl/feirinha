import { ChangeEvent, useState, useEffect, useContext } from "react";
import { Ifeirinha } from "../../../helpers/httpClient";
import Loading from "../../../general-components/Loading";
import { registerFeirinha, /*updateFeirinha*/ } from "../../../helpers/httpClient";
import { ApiResponse } from "../../../interfaces/ApiResponse";
import RegisteredSuccess from "../../../general-components/alerts/RegisteredSuccess";
import EditedSuccess from "../../../general-components/alerts/EditedSuccess";
import Error from "../../../general-components/alerts/Error";
import context from "../../../context/myContext";

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
  const [error, setError] = useState<string | boolean>(false);
  const [registered, setregistered] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
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

  const handleRegistered = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true);
    const res = await registerFeirinha(addFeirinha);
    setLoading(false);
    if (!((res as ApiResponse).status) || (res as ApiResponse).status !== 201) {
      setError((res as ApiResponse).response.data.message)
    }
    setregistered(true)
  };

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // setLoading(true);
    // const res = await updateFeirinha(addMarket);
    // console.log(res)
    // setLoading(false);
    // if (!((res as ApiResponse).status) || (res as ApiResponse).status !== 200) {
    //   setError((res as ApiResponse).response.data.error)
    // }
    // setregistered(true)
  };

  const returnForm: FormType = {
    Cadastrar: <RegisteredSuccess />,
    Atualizar: <EditedSuccess />,
    Erro: <Error />
  }

  const mercados = markets ? markets.map((mercado) => mercado.name) : [];
  
  return(
    <div>
      {
      registered ? (
        returnForm[error ? 'Erro' : typeUse]
      ) : (
      <form>

        <div className="flex flex-col gap-1">
          <label
            className="text-gray-100 flex justify-between items-end text-sm"
          >estado: <span className="text-gray-600 text-xs">obrigatório</span></label>
          <select
            id='state'
            value={ addFeirinha.marketId }
            onChange={ handleChange }
            className={`px-4 py-1 w-full rounded-md ${addFeirinha.marketId === '' ? 'text-gray-400' : 'text-gray-900'}`}
      >
        <option value={''} disabled>-</option>
            {
              mercados.map((mercado, i) => (
              <option
                key={`feirinha-form-${mercado.name}-${i}`}
                value={ mercado.name }>{ mercado.name }</option>
              ))
            }
          </select>
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
              { loading ? <Loading loading /> : typeUse }
            </button>
      </form>
      )
    }
    </div>
  )
}

export default FeirinhaForm;
