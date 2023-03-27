import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import SearchDropDown from '../../dropdowns/combobox/SearchDropDown';
import AuthDialog from '../../dialogs/auth/AuthDialog';
import SettingsDialog from '../../dialogs/settings/SettingsDialog';
import DropDownMenu from '../../dropdowns/menu/DropDownMenu';
import { getSessionData } from '../../../lib/serviceHelper';

const NavBar = ({
  categoryItemClicked,
  sources,
  categories,
  className,
  ...headerProps
}) => {
  const [activePage, setActivePage] = useState('blog');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isSettingDialogOpen, setSettingDialogOpen] = useState(false)
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  const [isAuthDialog, setAuthDialog] = useState(false)
  const [authCard, setAuthCard] = useState('login')

  useEffect(() => {
    getSessionData().then(data => {
      if(data){
        setUserLoggedIn(true)
      }
    })
  }, [])

  return (
    <>
      <header {...headerProps} className={`w-full ${className}`}>
        {/* Mobile Menu */}
        <div className="w-full lg:hidden">
          {/* Menu Button and Logo */}
          <div className="group flex flex-row justify-between leading-[5rem] pt-2 px-2 align-middle">
            <div
              className="w-6 flex flex-col gap-1 cursor-pointer"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <div className="border-2 border-indigo-600 w-full rounded"></div>
              <div className="border-2 border-indigo-600 w-10/12 rounded transition-all ease-in-out duration-700 group-hover:w-full"></div>
              <div className="border-2 border-indigo-600 w-8/12 rounded transition-all ease-in-out duration-700 group-hover:w-full"></div>
            </div>
          </div>

          {/* Menu Items */}
          <div
            className={`mt-6 transition-all ease-in-out duration-700 ${
              showMobileMenu ? 'flex flex-col w-full' : 'w-0 hidden'
            }`}
          >
            <div className="w-full flex flex-row justify-end space-x-4">
              <div className="">
                <div className="flex items-center justify-center h-10 px-2 bg-gray-100 rounded-full border border-gray cursor-pointer">
                  <div
                    className="relative text-white"                  
                    onClick={() => setShowMobileSearch(!showMobileSearch)}
                  >
                    <BiSearch style={{ width: 20, height: 18 }} />
                  </div>

                  <input
                    type="text"
                    className={`text-white bg-white w-0 text-sm focus:outline-0 transition-all ease-in-out duration-1000 ${
                      showMobileSearch
                        ? 'w-[16rem] sm:w-[32rem] ml-2 transition-all ease-in-out duration-1000'
                        : 'w-0'
                    }`}
                    placeholder="Search Keywords... "
                  />
                  {/* <SearchDropDown /> */}
                </div>
              </div>
            </div>

            <div className="w-full mt-8">
              <div className="flex flex-col space-y-4 text-white text-xl px-2">
                {categories?.map((element, index) => {
                  return (
                    <div key={index} className="group w-full py-3 px-2.5 rounded-md cursor-pointer hover:text-white hover:bg-indigo-600">
                      <a
                        href={"/#"}
                        className={`${
                          activePage === element.id ? 'active-main-top-bar' : ''
                        }`}
                        onClick={() => {
                          setActivePage(element.id)
                          categoryItemClicked(element.id)
                        }}
                      >
                        {element.name}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className='flex flex-row w-12/12 justify-between mt-10 px-5'>
          <div>
            <h1 className='text-2xl font-medium'>
              News Feed
            </h1>
          </div>
          {
            userLoggedIn ? (
              <div>
                <DropDownMenu settingsDialog={setSettingDialogOpen} setUserLoggedIn={setUserLoggedIn} />              
              </div>
            ) : (
              <div className='flex flex-row'>
                <button 
                  type="button" 
                  class="py-2 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                  onClick={() => {
                    setAuthCard('login')
                    setAuthDialog(true)
                  }}
                >
                  Login
                </button>
                <button 
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2 mr-2 mb-2 focus:outline-none"
                  onClick={() => {
                    setAuthCard('signUp')
                    setAuthDialog(true)
                  }}
                >
                  SignUp
                </button>
              </div>
            )
          }
        </div>
        <div className="hidden mt-2 w-full flex-row lg:flex border-t border-b">
          <div className="flex flex-row w-10/12 px-10 space-x-10 xl:space-x-20">
            <div className="flex flex-row text-black text-base">
              {categories?.map((element, index) => {
                return (
                  <div 
                    key={index}
                    className={`py-5 px-6 hover:bg-indigo-600 hover:text-white cursor-pointer ${
                      activePage === element.id ? 'bg-indigo-600 text-white' : ''
                    }`} 
                  >                    
                    <a
                      href='/#'
                      onClick={() => {
                        setActivePage(element.id)
                        categoryItemClicked(element.id)
                      }}
                    >
                      {element.name}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-row space-x-4 justify-end">
            <div className="py-2 px-2">
              <div className="absolute flex justify-center px-2 bg-gray-100 border rounded-xl cursor-pointer">
                <div
                  className="relative text-black bg-gray-100 mt-3"                  
                  onClick={() => setShowMobileSearch(!showMobileSearch)}
                >
                  <BiSearch style={{ width: 20, height: 18 }} />
                </div>

                <div
                  className={`flex flex-col`}
                >
                  <input
                    type="text"
                    className={`text-black w-[16rem] bg-gray-100 pl-2 h-10 text-sm focus:outline-0`}
                    placeholder="Search Keywords... "
                  />
                </div>            
              </div>
            </div>
          </div>
        </div>

        {/* Auth Dialog */}
        <AuthDialog isOpen={isAuthDialog} authCard={authCard} makeDialogVisible={setAuthDialog} />
      </header>

      {/* Settings Dialog */}
      <SettingsDialog isOpen={isSettingDialogOpen} setModalVisible={setSettingDialogOpen} categories={categories} sources={sources} />
    </>
  );
};

NavBar.defaultProps = {};

NavBar.propTypes = {};

export default NavBar;
