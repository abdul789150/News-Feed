import { Menu, Transition } from '@headlessui/react';
import {AiOutlineSetting} from 'react-icons/ai';
import {FiLogOut} from 'react-icons/fi';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { logoutUser } from '../../../lib/serviceHelper';

const DropDownMenu = ({
  setUserLoggedIn,
  settingsDialog,
  className,
  ...divProps
}) => {

  function logout(){
    setUserLoggedIn(false)
    logoutUser()
  }

  return (
    <div {...divProps} className={`text-gray-900 ${className}`}>
      <div className="text-right">
        <Menu as="div" className="relative inline-block text-left z-20">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-white bg-opacity-20 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <div className="relative w-10 h-10 cursor-pointer">
                <img
                  src='https://med.gov.bz/wp-content/uploads/2020/08/dummy-profile-pic.jpg'
                  alt='Dummy Profile Picture'
                  sizes="100vw"
                  style={{ width: '100%', height: '100%' }}
                  className="rounded-full"
                />
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-52 origin-top-right divide-y divide-gray-200 rounded-md bg-white border-2 border-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => settingsDialog(true)}
                  >
                    {active ? (
                      <AiOutlineSetting
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <AiOutlineSetting
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Settings
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={logout}
                  >
                    {active ? (
                      <FiLogOut
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <FiLogOut
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

DropDownMenu.defaultProps = {
  activeBackground: 'y'
};

DropDownMenu.propTypes = {
  menuItems: PropTypes.array,
  activeBackground: PropTypes.string
};

export default DropDownMenu;
