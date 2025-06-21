'use client'

import { Tab } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NeighborhoodTabs({ neighborhoods, onNeighborhoodChange }) {
  const formatNeighborhood = (neighborhood) => {
    return neighborhood
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <Tab.Group onChange={onNeighborhoodChange}>
      <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6 overflow-x-auto">
        {neighborhoods.map((neighborhood) => (
          <Tab
            key={neighborhood}
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 px-4 text-sm font-medium leading-5 whitespace-nowrap',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white text-blue-700 shadow'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
              )
            }
          >
            {formatNeighborhood(neighborhood)}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  )
}
