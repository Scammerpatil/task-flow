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
          <Link href="/signup" className="btn btn-accent">
            Sign Up
          </Link>
          <ThemeToggler />
        </div>
      </div>
    </>
  );
};

export default Header;
