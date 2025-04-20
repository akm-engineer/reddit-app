import { UserAvatar } from "@/components/common/user-avatar"
import { UserButton } from "@/components/common/user-button"

export const Navbar = () => {
  const user = {
    avatarUrl: "",
    name: "Lalitya Sahu",
  }
  return (
    <header className="sticky top-0 z-10 shadow-sm">
      <div className="w-full mx-auto flex flex-row-reverse sm:flex-row justify-end sm:justify-center items-center flex-wrap gap-2 sm:gap-5 py-3">
        <div className="flex flex-col items-start">
          <h1 className="text-lg sm:text-xl lg:text-2xl text-white font-semibold">
            Hii {user?.name}
          </h1>
          <p className="text-[#808080] text-xs sm:text-sm lg:text-base">
            Let&apos;s create new today!
          </p>
        </div>
        <UserButton className="hidden sm:ms-auto sm:block" />
        <UserAvatar
          avatarUrl={user?.avatarUrl}
          name={user?.name}
          size={44}
          className="flex sm:hidden"
        />
      </div>
    </header>
  )
}
