import { Dialog, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import LoginCard from '../../cards/login/Login';
import SignUpCard from '../../cards/signup/SignUp';

const AuthDialog = ({
  isOpen,
  makeDialogVisible,
  authCard,
  className,
  ...divProps
}) => {

  const [activeCard, setActiveCard] = useState('')
  const cards = {
    login: <LoginCard className='' updateState={setActiveCard} />,
    signUp: <SignUpCard className='' updateState={setActiveCard} />
  }  

  useEffect(() => {
    setActiveCard(authCard)
  }, [authCard])

  return (
    <div {...divProps} className={`text-white ${className}`}>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={() => makeDialogVisible(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-10 shadow-white backdrop-blur-sm backdrop-brightness-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow transition-all">
                  <div className='relative flex justify-center'>        
                    {cards[activeCard]}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

AuthDialog.defaultProps = {
  isOpen: true,
  title: 'Crop Selected Image',
  titleHelperText: 'Make sure the cricle covers your full face!',
  makeDialogVisible: () => {},
};

AuthDialog.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  titleHelperText: PropTypes.string,
  makeDialogVisible: PropTypes.func,
};

export default AuthDialog;
