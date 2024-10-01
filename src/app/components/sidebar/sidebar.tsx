"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import logo from "@/public/assets/logo.png";
import {
  // faCapsules,
  // faChartBar,
  // faCog,
  faFile,
  // faHospital,
  faRightFromBracket,
  // faUsers,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { signOut } from "next-auth/react"; // Import signOut function
import { usePathname } from "next/navigation";

interface SidebarItem {
  href?: string;
  icon: IconDefinition;
  label: string;
  list?: { href: string; label: string }[];
}

const sidebarItems: SidebarItem[] = [
  // { href: "/dashboard", icon: faChartBar, label: "Dashboard" },
  // {
  //   icon: faFile,
  //   label: "Document",
  //   list: [
  //     { label: "BO Info", href: "/document/bo-info" },
  //     { label: "Dokumen Legal", href: "/document/dokumen-legal" },
  //   ],
  // },
  {
    href: "/document",
    icon: faFile,
    label: "Document",
  },
];

export default function Sidebar() {
  // State to manage dropdown visibility for each item
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleDropdown = (key: string) => {
    setDropdownOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const pathname = usePathname();

  return (
    <div className="bg-primary">
      <div className="drawer lg:drawer-open shadow h-full z-20">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex flex-col justify-between h-full w-80 p-4 bg-primary rounded-lg">
            {/* Sidebar Content */}
            <div>
              <div className="mb-5">
                <Image src={logo} alt="Logo" />
              </div>
              <hr className="mb-5" />

              <ul className="menu">
                {sidebarItems.map((item) => (
                  <li key={item.label} className="mb-3">
                    {/* If there is a list, show dropdown. Else, link to href directly */}
                    {item.list ? (
                      <div
                        className="flex justify-between items-center text-white text-lg hover:bg-secondary hover:rounded-lg duration-100 cursor-pointer"
                        onClick={() => toggleDropdown(item.label)}
                        aria-expanded={dropdownOpen[item.label]}
                      >
                        <div className="flex items-center gap-5">
                          <FontAwesomeIcon
                            className="text-lg"
                            icon={item.icon}
                            width={20}
                            height={20}
                          />
                          <span>{item.label}</span>
                        </div>
                        <span className="text-sm ml-auto">
                          {dropdownOpen[item.label] ? "▲" : "▼"}
                        </span>
                      </div>
                    ) : (
                      <Link
                        href={item.href || "#"}
                        className={`hover:bg-secondary hover:rounded-lg duration-100 ${
                          pathname === item.href ? "bg-secondary" : ""
                        }`}
                      >
                        <div className="flex items-center gap-5 text-white text-lg">
                          <FontAwesomeIcon
                            className="text-lg"
                            icon={item.icon}
                            width={20}
                            height={20}
                          />
                          <span>{item.label}</span>
                        </div>
                      </Link>
                    )}

                    {/* Dropdown menu */}
                    {item.list && dropdownOpen[item.label] && (
                      <ul className="mt-2">
                        {item.list.map((subItem) => (
                          <li key={subItem.href} className="mb-2">
                            <Link
                              href={subItem.href}
                              className={`text-white text-lg hover:bg-secondary hover:rounded-lg p-2 block ${
                                pathname === subItem.href ? "bg-secondary" : ""
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Logout button at the bottom */}
            <div className="mt-auto mb-3">
              <button
                onClick={() =>
                  signOut({ redirect: true, callbackUrl: "/login" })
                }
                className="w-full px-6 text-lg text-white hover:bg-secondary hover:rounded-lg duration-100 flex items-center gap-5 p-2"
              >
                <FontAwesomeIcon
                  className="text-lg"
                  icon={faRightFromBracket}
                />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
