import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import { Link, usePage } from "@inertiajs/react";

type MenuNode = {
  key: string;
  name: string;
  icon: string | null;
  route: string | null;
  children: MenuNode[];
};

const resolveHref = (routeName: string | null): string => {
  if (!routeName) {
    return "/#";
  }
  try {
    return route(routeName);
  } catch {
    return "/#";
  }
};

const containsPath = (node: MenuNode, pathname: string): boolean => {
  if (node.route && resolveHref(node.route) === pathname) {
    return true;
  }
  return node.children.some((child) => containsPath(child, pathname));
};

/**
 * Renders the business-module sidebar (modules + RBAC) built from the `auth.menu`
 * tree shared by HandleInertiaRequests. Mirrors Velzon's menu markup/classes so it
 * matches the theme's CSS, but with simpler, generic open/close state instead of
 * the template's one-boolean-per-item generator (see LayoutMenuData.tsx).
 */
const DynamicMenu = () => {
  const { auth }: any = usePage().props;
  const menu: MenuNode[] = auth?.menu ?? [];
  const pathname = window.location.pathname;

  const [openKey, setOpenKey] = useState<string | null>(
    () => menu.find((item) => containsPath(item, pathname))?.key ?? null
  );

  if (menu.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <li className="menu-title">
        <span data-key="t-menu">Menu</span>
      </li>
      {menu.map((item) => {
        if (item.children.length === 0) {
          const isActive = item.route !== null && resolveHref(item.route) === pathname;

          return (
            <li className="nav-item" key={item.key}>
              <Link href={resolveHref(item.route)} className={`nav-link menu-link${isActive ? " active" : ""}`}>
                {item.icon ? <i className={item.icon}></i> : null} <span>{item.name}</span>
              </Link>
            </li>
          );
        }

        const isOpen = openKey === item.key;

        return (
          <li className="nav-item" key={item.key}>
            <Link
              href="/#"
              data-bs-toggle="collapse"
              aria-expanded={isOpen}
              className={`nav-link menu-link${isOpen ? " active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setOpenKey(isOpen ? null : item.key);
              }}
            >
              {item.icon ? <i className={item.icon}></i> : null} <span>{item.name}</span>
            </Link>
            <Collapse className="menu-dropdown" in={isOpen}>
              <div>
                <ul className="nav nav-sm flex-column">
                  {item.children.map((child) => {
                    const childActive = child.route !== null && resolveHref(child.route) === pathname;

                    return (
                      <li className="nav-item" key={child.key}>
                        <Link href={resolveHref(child.route)} className={`nav-link${childActive ? " active" : ""}`}>
                          {child.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Collapse>
          </li>
        );
      })}
    </React.Fragment>
  );
};

export default DynamicMenu;
