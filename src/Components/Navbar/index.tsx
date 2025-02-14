"use client";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";
import Image from "next/image";
import {
  IconChevronDown,
  IconMenu,
  IconPresentationAnalytics,
} from "@tabler/icons-react";

const Header = () => {
  return (
    <>
      <div className="navbar bg-base-100 px-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <IconMenu size={24} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {[
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Services", path: "/services" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="text-base-content text-base hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
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
          <ul className="menu menu-horizontal px-1">
            {[
              { name: "About", path: "/about" },
              { name: "Contact", path: "/contact" },
              { name: "Services", path: "/services" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className="text-base-content text-base hover:text-primary hidden lg:block"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end space-x-3">
          {[{ name: "Sign In", link: "/login", color: "btn-secondary" }].map(
            (item) => (
              <Link
                key={item.name}
                href={item.link}
                className={`btn ${item.color} hidden lg:flex items-center justify-center`}
              >
                {item.name}
              </Link>
            )
          )}
          <div className="btn btn-primary dropdown dropdown-end">
            <span
              tabIndex={0}
              className="flex items-center justify-center gap-3 h-full w-full"
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
