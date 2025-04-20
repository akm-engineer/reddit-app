import { UserButton } from "@/components/common/user-button"

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 shadow-sm">
      <div className="w-full mx-auto flex justify-center items-center flex-wrap gap-5 px-5 py-3">
        <div className="border size-8 bg-yellow-50" />
        <UserButton className="sm:ms-auto" />
      </div>
    </header>
  )
}
