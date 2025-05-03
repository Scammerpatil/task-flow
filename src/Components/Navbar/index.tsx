"use client";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";
import {
  IconChevronDown,
  IconPresentationAnalytics,
} from "@tabler/icons-react";

const Header = () => {
  return (
    <>
      <div className="navbar px-10 py-2 bg-base-300">
        <div className="navbar-start">
          <Link
            href="/"
            className="text-2xl font-bold flex items-center px-4 py-2 rounded-lg hover:bg-base-200 transition-colors duration-300 gap-3"
          >
            <IconPresentationAnalytics size={50} className="text-primary" />
            <div className="w-full flex flex-col items-start gap-1">
              <div className="flex items-baseline gap-[2px]">
                <span className="text-primary font-extrabold text-xl">
                  Task
                </span>
                <span className="text-accent font-semibold text-xl">Flow</span>
              </div>
              <hr className="w-full border border-base-content" />
              <span className="text-sm text-base-content/70 italic">
                Streamline. Collaborate. Succeed.
              </span>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-base text-base-content">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/features">Features</Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end space-x-3">
          <Link href="/login" className="btn btn-accent">
            Login
          </Link>
          <div className="dropdown dropdown-end">
            <span
              tabIndex={0}
              className="flex items-center justify-center gap-3 h-full w-full btn btn-accent"
            >
              Sign Up <IconChevronDown />
            </span>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-base-content"
            >
              <li>
                <Link href="/signup" className="btn btn-ghost">
                  Admin
                </Link>
              </li>
              <li>
                <Link href="/signup/manager-signup" className="btn btn-ghost">
                  Manager
                </Link>
              </li>
              <li>
                <Link
                  href="/signup/team-member-signup"
                  className="btn btn-ghost"
                >
                  Team Member
                </Link>
              </li>
            </ul>
          </div>
          <ThemeToggler />
        </div>
      </div>
    </>
  );
};

export default Header;
