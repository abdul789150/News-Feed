import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';

const SearchDropDown = ({
  comboboxItems,
  onSelectItem,
  defaultSection,
  placeholder,
  className,
  ...divProps
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setSelectedItems(defaultSection)
  }, [defaultSection])

  useEffect(() => {
    if (selectedItems?.length > 0 ){
      const data_ids = [];
      for(const element of selectedItems){
        data_ids.push(element.id)
      }
      onSelectItem(data_ids);
    }
  }, [selectedItems])

  const filteredItems =
    query === ''
      ? comboboxItems
      : comboboxItems.filter((item) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );


  function updateSelection(data) {
    const items = [...selectedItems]

    for(const item of data){
      const el_id = selectedItems.map(el => el.id).indexOf(item.id)
      if(el_id === -1){
        items.push(item)
      }
    }

    setSelectedItems(items);
  }

  return (
    <div {...divProps} className={`text-black relative ${className}`}>
      <div className="w-full">
        <Combobox value={selectedItems} onChange={updateSelection} multiple>
          <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-md bg-gray-100 border text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm">
              <Combobox.Input
                className="w-full border-none py-2 pl-3 pr-10 text-sm capitalize leading-5 text-black bg-gray-100 focus:ring-0"
                displayValue={(items) => items?.map((item) => item.name).join(',')}
                placeholder={placeholder}
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon
                  className="h-5 w-5 text-black"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery('')}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-100 py-1 text-base ring-1 ring-slate-600 ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredItems?.length === 0 && query !== '' ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-black">
                    Nothing found.
                  </div>
                ) : (
                  filteredItems?.map((item) => (
                    <Combobox.Option
                      key={item.id}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-indigo-600 text-white' : 'text-black'
                        }`
                      }
                      value={item}
                    >
                      {({ selected, active }) => {
                        return ( <>
                            <span
                              className={`block truncate capitalize ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {item.name}
                            </span>
                            
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? 'text-white' : 'text-rajah'
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>)
                      }}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    </div>
  );
};

SearchDropDown.propTypes = {
  comboboxItems: PropTypes.array,
};

export default SearchDropDown;
