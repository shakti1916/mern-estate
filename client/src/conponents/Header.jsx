import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-slate-200 shadow-md">
        <div className="flex justify-between items-center p-3 max-w-6xl mx-auto">
            <h1 className="flex font-bold text-sm sm:text-xl flex-wrap">
            <span className="text-slate-500">Mern</span>
            <span className="text-slate-700">
                Estate
            </span>

            </h1>
            <form className="bg-slate-100 p-3 rounded-lg flex items-center">
            <input className="bg-transparent focus:outline-none w-24 sm:w-64" type="text" placeholder="Search.." />
            <button>
                <FaSearch className="text-slate-600"/>
            </button>

            </form>

            <ul className='flex gap-4'>
            <Link to="/">

            
                <li className='hidden hover:underline sm:inline text-slate-700'>Home</li> </Link>
                <Link to="/about">

                
                <li className='hidden hover:underline sm:inline text-slate-700'>About</li>
                </Link>
                <Link to="/profile">

               
                <li className='text-slate-700 hover:underline'>Sign in</li>
                </Link>
            </ul>

        </div>
    </header>
  )
}

export default Header