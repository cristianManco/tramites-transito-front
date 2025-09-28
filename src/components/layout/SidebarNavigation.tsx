"use client";

import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { SidebarNavigationProps } from "../types/sidebar";

export const SidebarNavigation = ({
  isOpen,
  filteredMenu,
  toggleSubmenu,
  handleLinkClick,
  isItemActive,
  isSubItemActive,
  isMenuExpanded,
  isLinkActive,
}: SidebarNavigationProps) => {
  return (
    <nav className="mt-4 h-[calc(100vh-170px)] overflow-y-auto navbar-custom">
      <ul className="space-y-2">
        {filteredMenu.map((item) => (
          <li key={item.href ?? item.title}>
            {item.submenu ? (
              <div>
                {isOpen ? (
                  <button
                    type="button"
                    onClick={() => toggleSubmenu(item.title)}
                    className={`flex items-center w-full px-4 py-2 text-[11px] font-medium transition-colors duration-150 hover:bg-gray-800 cursor-pointer ${
                      isItemActive(item) ? "bg-gray-800" : ""
                    }`}
                    aria-expanded={isMenuExpanded(item.title)}
                  >
                    <item.icon className="size-4" />
                    <span className="ml-2">{item.title}</span>
                    <ChevronDown
                      className={`ml-auto h-4 w-4 transform transition-transform duration-200 ${
                        isMenuExpanded(item.title) ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => toggleSubmenu(item.title)}
                    className={`flex items-center justify-center w-full px-4 py-2 text-[11px] font-medium transition-colors duration-150 hover:bg-gray-800 cursor-pointer ${
                      isItemActive(item) ? "bg-gray-800" : ""
                    }`}
                    title={item.title}
                    aria-label={item.title}
                  >
                    <item.icon className="size-4" />
                  </button>
                )}

                {isOpen && isMenuExpanded(item.title) && (
                  <ul className="bg-gray-800 py-2">
                    {item.submenu.map((subItem) => (
                      <li key={subItem.href ?? subItem.title}>
                        <Link
                          href={subItem.href}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLinkClick?.();
                          }}
                          className={`block pl-11 pr-4 py-2 text-[11px] transition-colors duration-150 hover:bg-gray-700 cursor-pointer ${
                            isSubItemActive(subItem)
                              ? "bg-gray-700 text-white"
                              : "text-gray-300"
                          }`}
                        >
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Link
                href={item.href}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLinkClick?.();
                }}
                className={`flex items-center px-4 py-2 text-[11px] font-medium transition-colors duration-150 hover:bg-gray-800 cursor-pointer ${
                  isLinkActive(item.href) ? "bg-gray-800" : ""
                } ${isOpen ? "" : "justify-center"}`}
                title={!isOpen ? item.title : undefined}
              >
                <item.icon className="size-4" />
                {isOpen && <span className="ml-2">{item.title}</span>}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
