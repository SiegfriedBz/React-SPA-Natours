export default function BurgerMenuButton() {
  return (
    <div
      data-cy="burger-menu-button"
      className="relative
        max-sm:h-12 max-sm:w-12
        max-md:h-14 max-md:w-14
        md:h-16 md:w-16
        before:absolute
        after:absolute
        before:content-['']
        after:content-['']
        max-sm:before:h-[0.2rem] 
        sm:before:h-[0.3rem] 
        max-md:before:w-2 
        md:before:w-4 
        before:bg-stone-50
        max-sm:after:h-[0.2rem] 
        sm:after:h-[0.3rem]
        max-md:after:w-8 
        md:after:w-10 
        after:bg-stone-100
        max-sm:before:top-[24%] 
        max-md:before:top-3 
        md:before:top-4
        before:left-1/2 
        before:-translate-x-1/2
        max-sm:after:bottom-[24%] 
        max-md:after:bottom-3 
        md:after:bottom-4 
        max-sm:after:left-0
        sm:after:left-1/2 
        sm:after:-translate-x-1/2
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
          max-md:w-4 
          md:w-6
          mx-auto 
          animate-pulse 
          rounded-xl
          u-bg-gradient-primary-light
        "
      ></span>
    </div>
  )
}
