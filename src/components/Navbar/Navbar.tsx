import { UserButton } from "@clerk/nextjs";
import Logo from "../Logo/Logo";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-between p-4 px-8 h-[60px]">
      <Logo />
      <div className="flex gap-4 items-center">
        <UserButton afterSignOutUrl="/sign-in" />
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Navbar;
