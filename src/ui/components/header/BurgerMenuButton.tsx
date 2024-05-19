export default function BurgerMenuButton() {
  return (
    <div
      data-cy="burger-menu-button"
      className="relative
        h-12 w-12
        before:absolute
        after:absolute
        before:content-['']
        after:content-['']
        before:h-[0.3rem] before:w-2 before:bg-stone-50
        after:h-[0.3rem] after:w-8 after:bg-stone-100
        before:top-3 before:left-1/2 before:-translate-x-1/2
        after:bottom-3 after:left-0 
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
          h-[0.3rem] 
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
