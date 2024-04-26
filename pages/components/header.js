import Link from "next/link";
import Image from "next/image";

export default function Header(){
    return (
        <header className="container mx-auto py-2 width-container">
            <div className="flex items-center justify-between px-2 flex-wrap md:justify-strat">
            <div className="head-logo">
            <a className="text-center">
                <Image alt="LOGO" src={'/images/logo.gif'} width={200} height={80}/>
                </a>
            </div>

            <div className="flex items-center justify-end flex-col md:flex-row gap-3">
            <button className=" btn-a items-center bg-gray-800 md:py-2 py-4 mr-2 px-3 focus:outline-none hover:bg-gray-700">
                <Link className="" href={'tel:8668417469'}>(866)-841-7469</Link>
                </button>

                <button className=" hidden btn-a items-center bg-gray-800 mr-2 md:py-2 py-4 px-3 focus:outline-none hover:bg-gray-700 md:block">
                <Link className="" href={'mailto:info@pinebookpublishing.com'}>info@pinebookpublishing.com</Link>
                </button>

                <button className="btn-a items-center bg-gray-800 md:py-2 py-4 px-3 focus:outline-none hover:bg-gray-700">
                <Link className="" href={'javascript:;'} onclick="$zopim.livechat.window.toggle()">Talk to an Expert</Link>
                </button>
            </div>
            </div>
  </header>
    );
}