"use client";
import React from "react";
import Link from "next/link";
function Header() {
  return (
    <header>
      <nav>
        <div className="navbar justify-between bg-base-300">
          <Link href="/" className="btn btn-ghost text-lg">
            <p>Emart</p>
          </Link>
          <ul className="flex">
            <li>
              <Link className="btn btn-ghost rounded-btn" href="/cart">
                Cart
              </Link>
            </li>
            <li>
              <Link className="btn btn-ghost rounded-btn" href="/my-page">
                My page
              </Link>
            </li>
            <li>
              <Link className="btn btn-ghost rounded-btn" href="/maker">
                Maker
              </Link>
            </li>
            <li>
              <Link className="btn btn-ghost rounded-btn" href="/admin">
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
