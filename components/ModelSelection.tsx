'use client'

import { useId } from 'react'
import Select from 'react-select'
import useSWR from 'swr'
import { Data } from '../pages/api/getModels'

const fetcher = () => fetch('/api/getModels').then((res) => res.json())

function ModelSelection() {
   const id = useId()

   const { data: models } = useSWR<Data>('models', fetcher)
   const { data: model, mutate: setModel } = useSWR('model', {
      fallbackData: 'text-davinci-003',
   })

   return (
      <div>
         <Select
            instanceId={`${id}-select`}
            className='mt-2'
            styles={{
               control: (provided) => ({
                  ...provided,
                  backgroundColor: '#434654',
                  border: '1px solid #434654',
               }),
            }}
            value={model}
            options={models?.modelOptions}
            placeholder={model}
            isSearchable
            menuPosition='fixed'
            classNames={{ control: () => 'bg-[#434654] border-[#434654]' }}
            onChange={(e) => setModel(e.value)}
         />
      </div>
   )
}

export default ModelSelection
