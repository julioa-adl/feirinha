import { UserGroupIcon } from "@heroicons/react/20/solid";
import MobileMenu from "../../general-components/MobileMenu";
import Navigator from "../../general-components/Navigator";
import logo from "../../assets/feirinha-logo.png";

const Termos = () => {
  return(
    <div className="bg-white h-screen dark:bg-gray-900">
        <div className='fixed top-0 z-30 md:relative bg-white dark:bg-gray-900 p-5 flex items-center gap-1 w-full justify-center'>
            <Navigator />
            <h1 className="rounded-full flex items-start md:justify-center gap-1 max-w-xs text-sm px-4 py-2 w-full bg-gray-100 dark:bg-gray-800 font-bold text-gray-900 dark:text-white">
            <UserGroupIcon className="h-4" />
            Termos de uso
            </h1>
        </div>
        <div className="dark:text-gray-100 text-gray-900 text-center w-screem pt-20 pb-36 md:py-0 lg:h-4/5 md:px-40 px-5 overflow-auto flex
        flex-col items-center gap-2 drop-shadow-lg">
            <h1 className="w-full font-bold">FEIRINHA DA GENTE - LICENÇA DE USO</h1>
            <p className="text-left md:text-md">
                <p>O aplicativo Feirinha da Gente é um projeto Full-Stack desenvolvido com o propósito de facilitar a organização das suas compras e 
                    promover uma experiência colaborativa entre os usuários. Ao utilizar o aplicativo, você concorda com os seguintes termos de uso:
                </p>
                <br />
                <ol>
                    <li>
                        <strong>1- Objetivo do Aplicativo:</strong> O Feirinha da Gente tem como objetivo principal auxiliar na organização das listas de compras, oferecendo uma plataforma onde os usuários podem cadastrar produtos, mercados e preços. É importante ressaltar que o aplicativo não tem fins lucrativos e não visa lucrar com as informações compartilhadas pelos usuários.
                    </li>
                <br />
                    <li>
                        <strong>2- Responsabilidade Coletiva:</strong> Ao cadastrar produtos, preços e outras informações no aplicativo, você reconhece que essas informações serão compartilhadas com outros usuários. Portanto, é importante fornecer informações precisas e atualizadas para garantir a qualidade e a utilidade do aplicativo para todos os usuários.
                    </li>
                <br />
                    <li>
                        <strong>3- Uso Colaborativo:</strong> O Feirinha da Gente é uma plataforma colaborativa, onde todos os usuários têm o direito e a responsabilidade de contribuir com informações sobre produtos, preços e mercados. Encorajamos a participação ativa dos usuários na atualização e na adição de novas informações para enriquecer a experiência de todos os usuários.
                    </li>
                <br />
                    <li>
                        <strong>4- Privacidade e Segurança:</strong> O Feirinha da Gente está comprometido em proteger a privacidade e a segurança dos dados dos usuários. Todas as informações pessoais fornecidas são tratadas de acordo com a LGPD, incluindo: Criptografia para senhas, uso de tokens de acesso e privacidade sobre suas compras (os preços são compartilhados entre os usuários, mas ninguém tem acesso a compras e listas de compras que são as suas próprias).
                    </li>
                <br />
                    <li>
                        <strong>5- Evolução do Aplicativo:</strong> O aplicativo Feirinha da Gente está em constante evolução, e novos recursos e funcionalidades podem ser adicionados no futuro. Nosso objetivo é sempre oferecer uma experiência cada vez melhor e mais útil para os nossos usuários.
                    </li>
                </ol>
                <br />
                <br />
                <p>
                Ao utilizar o aplicativo Feirinha da Gente, você concorda em cumprir estes termos de uso. Se tiver alguma dúvida ou preocupação sobre os termos de uso ou qualquer aspecto do aplicativo, entre em contato conosco. Agradecemos por fazer parte da comunidade Feirinha da Gente e esperamos que você aproveite a experiência de compras colaborativas.
                </p>
                <br />
                <p className="text-center">Data de Vigência: 01-Nov-2023</p>
                <br />
                <p  className="text-center">Última Atualização: 16-Fev-2024</p>
                <br />
                <div className="w-full flex flex-col items-center">
                    <img src={logo} alt='logo' className="w-24 dark:invert"/>
                    <p className="font-bold text-sm dark:text-gray-200 text-gray-800 -ml-1">DA GENTE</p>
                </div>
            </p>
        </div>
        <MobileMenu />
    </div>
  )
}

export default Termos;
