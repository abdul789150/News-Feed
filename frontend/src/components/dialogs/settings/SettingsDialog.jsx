import { Dialog, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import SearchDropDown from '../../dropdowns/combobox/SearchDropDown';
import UserPreferenceApi from '../../../services/UserPreference';

const SettingsDialog = ({
  isOpen,
  sources,
  categories,
  setModalVisible,
  className,
  ...divProps
}) => {

  const [userSelectedCategories, setUserSelectedCategories] = useState([]);
  const [userSelectedSources, setUserSelectedSources] = useState([]);

  const [newSelectedSources, setNewSelectedSources] = useState([]);
  const [newSelectedCategories, setNewSelectedCategories] = useState([]);

  useEffect(() => {
    populateSelectedData()
  }, [])

  function populateSelectedData(){
    UserPreferenceApi.getUserPreferences().then((response) => {
      const categories = response?.preferences?.preferred_categories
      const sources = response?.preferences?.preferred_sources
      setUserSelectedCategories(categories?.map((item) => { return {id: item.id, name: item.name}}))
      setUserSelectedSources(sources?.map((item) => { return {id: item.id, name: item.name}}))
    }).catch((error) => {
      console.log(error)
    })
  }

  function updateNewCategoriesSelection(data){
    setNewSelectedCategories(data)
  }

  function updateNewSourcesSelection(data){
    setNewSelectedSources(data)
  }

  const saveUserPreference = () => {
    const formData = {
      source_ids: newSelectedSources,
      category_ids: newSelectedCategories
    }

    UserPreferenceApi.saveUserPreferences(formData).then((response)=>{
    }).catch((error) => {
    })
  }

  return (
    <div {...divProps} className={`text-white ${className}`}>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={() => setModalVisible(false)}>
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
            <div className="flex min-h-full items-center justify-center pt-4 px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white pt-6 px-6 text-left align-middle transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900"
                  >
                    Preferences Setup
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">You can easily setup News Categories and Sources</p>
                  </div>
                  <div className="mt-2 py-4 flex flex-col justify-between h-[30rem]">
                    <div className='flex flex-col space-y-4'>
                      <div>
                        <h4>
                          Select News Sources
                        </h4>
                        <SearchDropDown 
                          placeholder={"Select Multiple Sources..."} 
                          className={'z-20'} 
                          comboboxItems={sources}
                          defaultSection={userSelectedSources}
                          onSelectItem={updateNewSourcesSelection}
                        />
                      </div>
                      <div>
                        <h4>
                          Select News Categories
                        </h4>
                        <SearchDropDown 
                          placeholder={"Select Multiple Categories..."} 
                          comboboxItems={categories}
                          defaultSection={userSelectedCategories}
                          onSelectItem={updateNewCategoriesSelection}
                        /> 
                      </div>
                    </div>
                    <div className='flex flex-row justify-end'>
                      <button 
                        type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-6 py-2 mr-2 mb-2 focus:outline-none"
                        onClick={saveUserPreference}
                      >
                        Save
                      </button>
                      <button 
                        type="button" 
                        class="py-2 px-6 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                        onClick={() => setModalVisible(false)}
                      >
                        Cancel
                      </button>
                    </div>
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

SettingsDialog.defaultProps = {
  isOpen: true,
  title: 'Crop Selected Image',
  titleHelperText: 'Make sure the cricle covers your full face!',
  setModalVisible: () => {},
};

SettingsDialog.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  titleHelperText: PropTypes.string,
  setModalVisible: PropTypes.func,
};

export default SettingsDialog;
