import ToursInsightsStats from '../../components/stats/ToursInsightsStats'

const ToursInsights = () => {
  return (
    <>
      <h1 className="h1">Tours Insights</h1>
      <h2 className="h2 text-center px-4">Tours Difficulty Statistics</h2>
      <div
        className="p-4
          my-4
          mx-auto 
          max-w-screen-lg 
          bg-stone-100 
          shadow-xl 
          rounded-lg
        "
      >
        <ToursInsightsStats />
      </div>
    </>
  )
}

export default ToursInsights
