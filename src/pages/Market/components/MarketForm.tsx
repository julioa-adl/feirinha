import { ChangeEvent, useState, useEffect } from "react";
import { Imarket } from "../../../helpers/httpClient";
import estadosBrasil from "../../../helpers/states";
import Loading from "../../../general-components/Loading";
import { registerMarket, updateMarket } from "../../../helpers/httpClient";
import RegisteredSuccess from "../../../general-components/alerts/RegisteredSuccess";
import EditedSuccess from "../../../general-components/alerts/EditedSuccess";
import Error from "../../../general-components/alerts/Error"
import { useMutation, useQueryClient } from 'react-query';

type usageType = 'Cadastrar' | 'Atualizar';

interface MarketFormProps {
  typeUse: usageType,
  market?: Imarket
}

type FormType = {
  Cadastrar: JSX.Element;
  Atualizar: JSX.Element;
  Erro: JSX.Element;
};

const MarketForm = ({ market, typeUse }: MarketFormProps) => {
  const [disable, setDisable] = useState(true);
  const [addMarket, setMarket] = useState<Imarket>({
    id: market ? market['_id'] : '',
    name: market ? market.name : '',
    address: market ? market.address : '',
    neighborhood: market ? market.neighborhood : '',
    city: market ? market.city : '',
    state: market ? market.state : '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setMarket((prevstate) => ({
      ...prevstate,
      [id]: value,
    }));
  }

  useEffect(() => {
    const { name, address, neighborhood, city, state } = addMarket;
    if ((name && address && neighborhood && city && state)) {
      return setDisable(false);
    }
    return setDisable(true);
  }, [addMarket])

  const querieClient = useQueryClient();

  const { mutate: registerMrkt, isLoading: registerLoading, isSuccess: registerSucess, isError: registerError } = useMutation(() => registerMarket(addMarket).then(
    () => querieClient.invalidateQueries('markets')
  ))
  const handleRegistered = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    registerMrkt();
  };

  const { mutate: updateMrkt, isLoading: updateLoading, isSuccess: updateSucess, isError: updateError } = useMutation(() => updateMarket(addMarket).then(
    () => querieClient.invalidateQueries('markets')
  ))
  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    updateMrkt();
  };

  const returnForm: FormType = {
    Cadastrar: <RegisteredSuccess />,
    Atualizar: <EditedSuccess />,
    Erro: <Error />
  }

  const cidadesDoEstado = addMarket.state ? estadosBrasil.filter((estado) => estado.sigla === addMarket.state) : [];
  
  return(
    <div>
      {
      (updateSucess || updateError) || (registerSucess || registerError) ? (
        returnForm[registerError || updateError ? 'Erro' : typeUse]
      ) : (
      <form>
        <div className="flex flex-col gap-1">
          <label
            className="text-gray-100 flex justify-between items-end text-sm"
          >nome do mercado: <span className="text-gray-600 text-xs">obrigatório</span></label>
          <input
            type="text"
            required
            id='name'
            value={ addMarket.name }
            onChange={ handleChange }
            placeholder="Ex. Pão de Açucar"
            className="px-4 py-1 w-full rounded-md"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            className="text-gray-100 flex justify-between items-end text-sm"
          >endereço: <span className="text-gray-600 text-xs">obrigatório</span></label>
          <input
            type="text"
            required
            id='address'
            value={ addMarket.address }
            onChange={ handleChange }
            placeholder="Ex. nome da rua"
            className="px-4 py-1 w-full rounded-md"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            className="text-gray-100 flex justify-between items-end text-sm"
          >bairro: <span className="text-gray-600 text-xs">obrigatório</span></label>
          <input
            type="text"
            required
            id='neighborhood'
            value={ addMarket.neighborhood }
            onChange={ handleChange }
            placeholder="Ex. nome do bairro"
            className="px-4 py-1 w-full rounded-md"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            className="text-gray-100 flex justify-between items-end text-sm"
          >estado: <span className="text-gray-600 text-xs">obrigatório</span></label>
          <select
            id='state'
            value={ addMarket.state }
            onChange={ handleChange }
            className={`px-4 py-1 w-full rounded-md ${addMarket.state === '' ? 'text-gray-400' : 'text-gray-900'}`}
      >
        <option value={''} disabled>-</option>
            {
              estadosBrasil.map((estado, i) => (
              <option
                key={`addProd${estado.sigla}-${i}`}
                value={ estado.sigla }>{ estado.sigla }</option>
              ))
            }
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label
            className="text-gray-100 flex justify-between items-end text-sm"
          >cidade: <span className="text-gray-600 text-xs">obrigatório</span></label>
          <select
            id='city'
            value={ addMarket.city }
            onChange={ handleChange }
            className={`px-4 py-1 w-full rounded-md ${addMarket.state === '' ? 'text-gray-400' : 'text-gray-900'}`}
      >
        <option value={''} disabled>-</option>
            {
              (cidadesDoEstado.length > 0 ? cidadesDoEstado[0]['cidades'] : []).map((cidade, i) => (
              <option
                key={`addProd${cidade}-${i}`}
                value={ cidade }>{ cidade }</option>
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
              { registerLoading || updateLoading ? <Loading loading /> : typeUse }
            </button>
      </form>
      )
    }
    </div>
  )
}

export default MarketForm;
