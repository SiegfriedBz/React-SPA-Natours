import { useRef, useState } from 'react'
import HomeHero from '../components/tours/HomeHero'
import AllTours from '../components/tours/AllTours'
import Pagination from '../../../ui/components/pagination/Pagination'
import type { TDistance } from '../../../service/tour.service'
import type { TDistanceUnitOption } from '../components/forms/searchForms/distanceUnitOptions'

export type TDistancesToTours = {
  distances: TDistance[]
  unit: TDistanceUnitOption['value']
}

const Tours = () => {
  const scrollTargetRef = useRef<HTMLDivElement>(null)
  const [distancesToTours, setDistancesToTours] = useState<TDistancesToTours>({
    distances: [],
    unit: 'mi'
  })

  const handleScrollToTours = () => {
    scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="w-full h-full">
      <section>
        <HomeHero
          handleScrollToTours={handleScrollToTours}
          setDistancesToTours={setDistancesToTours}
        />
      </section>

      <section>
        <AllTours ref={scrollTargetRef} distancesToTours={distancesToTours} />
      </section>

      <section data-cy="pagination">
        <Pagination handleScrollToTours={handleScrollToTours} />
      </section>
    </div>
  )
}

export default Tours
