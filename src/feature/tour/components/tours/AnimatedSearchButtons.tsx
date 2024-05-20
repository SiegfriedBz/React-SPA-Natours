import { AnimatePresence, motion } from 'framer-motion'

import ModalProvider from '../../../../ui/components/modal/Modal'
import { FilterToursForm } from '../forms/searchForms/FilterToursForm'
import { DistancesToToursForm } from '../forms/searchForms/DistancesToToursForm'
import { ToursWithinDistanceForm } from '../forms/searchForms/ToursWithinDistanceForm'
import type { TDistancesToTours } from '../../pages/tours'
import { useShowSearchFormsButtons } from '../../store/useShowSearchFormsButtons'

type THomeSearchFormsProps = {
  setDistancesToTours: React.Dispatch<React.SetStateAction<TDistancesToTours>>
}

const AnimatedSearchButtons = ({
  setDistancesToTours
}: THomeSearchFormsProps) => {
  const { searchFormsButtonsVisible, showSearchFormsButtons } =
    useShowSearchFormsButtons()

  return (
    <AnimatePresence key="search-forms-buttons">
      {searchFormsButtonsVisible ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex w-full max-md:justify-between md:justify-around"
        >
          <motion.div
            initial={{ translateY: '-200%', opacity: 0 }}
            animate={{ translateY: '0%', opacity: 1 }}
            exit={{ translateY: '-100%', opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.35 }}
          >
            <ModalProvider>
              <ModalProvider.OpenButton
                windowNameToOpen="distances-to-tours-form"
                className="whitespace-nowrap max-sm:w-28 sm:w-36 btn-sm btn-primary"
              >
                Get Distances
              </ModalProvider.OpenButton>
              <ModalProvider.Window windowNameToOpen="distances-to-tours-form">
                <DistancesToToursForm
                  setDistancesToTours={setDistancesToTours}
                />
              </ModalProvider.Window>
            </ModalProvider>
          </motion.div>

          <motion.div
            initial={{ translateX: '-100%', opacity: 0 }}
            animate={{ translateX: '0%', opacity: 1 }}
            exit={{ translateX: '100%', opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.35, delay: 0.3 }}
            className="max-w-64"
          >
            <ModalProvider>
              <ModalProvider.OpenButton
                windowNameToOpen="filter-tours-form"
                className="whitespace-nowrap max-sm:w-28 sm:w-36 btn-sm btn-primary"
              >
                Filter Tours
              </ModalProvider.OpenButton>
              <ModalProvider.Window windowNameToOpen="filter-tours-form">
                <FilterToursForm />
              </ModalProvider.Window>
            </ModalProvider>
          </motion.div>

          <motion.div
            initial={{ translateX: '-100%', opacity: 0 }}
            animate={{ translateX: '0%', opacity: 1 }}
            exit={{ translateX: '100%', opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.35, delay: 0.6 }}
            className="max-w-64"
          >
            <ModalProvider>
              <ModalProvider.OpenButton
                windowNameToOpen="tours-within-distance-form"
                className="whitespace-nowrap max-sm:w-28 sm:w-36 btn-sm btn-primary"
              >
                Tours Within
              </ModalProvider.OpenButton>
              <ModalProvider.Window windowNameToOpen="tours-within-distance-form">
                <ToursWithinDistanceForm />
              </ModalProvider.Window>
            </ModalProvider>
          </motion.div>
        </motion.div>
      ) : (
        <motion.button
          data-cy="hero-search-button"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          onClick={showSearchFormsButtons}
          className="btn btn-primary"
        >
          Search Tours
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default AnimatedSearchButtons
