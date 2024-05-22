export default function BurgerMenuButton() {
  return (
    <div
      data-cy="burger-menu-button"
      className="relative
        max-sm:h-8 max-sm:w-8
        sm:h-12 sm:w-12
        before:absolute
        after:absolute
        before:content-['']
        after:content-['']
        max-sm:before:h-[0.2rem] sm:before:h-[0.3rem] before:w-2 before:bg-stone-50
        max-sm:after:h-[0.2rem] sm:after:h-[0.3rem] after:w-8 after:bg-stone-100
        max-sm:before:top-[16%] sm:before:top-3 before:left-1/2 before:-translate-x-1/2
        max-sm:after:bottom-[16%] sm:after:bottom-3 after:left-0 
        before:rounded-xl
        after:rounded-xl
        before:animate-pulse
        after:animate-pulse
      "
    >
      <span
        className="
          inline-block 
          absolute 
          top-1/2 -translate-y-1/2 
          -translate-x-1/2 
          max-sm:h-[0.2rem] 
          sm:h-[0.3rem] 
          w-4 
          mx-auto 
          animate-pulse 
          rounded-xl
          u-bg-gradient-primary-light
        "
      ></span>
    </div>
  )
}
