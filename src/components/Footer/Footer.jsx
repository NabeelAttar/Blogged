import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
import imageLogo from '../../assets/logo.png'

function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-[#1a1a1a] via-[#1c1c1c] to-[#1a1a1a] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="-m-6 flex flex-wrap text-white/80">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center justify-center">
                <img src={imageLogo} alt="Blogged Logo" className='w-[220px] bg-blend-overlay' />
              </div>
              <div>
                <p className="text-sm text-white/50 text-center">
                  &copy; Copyright {new Date().getFullYear()}. All rights reserved.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-white/60">
                Company
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-white/80 hover:text-white"
                    to="/"
                  >
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-white/80 hover:text-white"
                    to="/"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-white/80 hover:text-white"
                    to="/"
                  >
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-base font-medium text-white/80 hover:text-white"
                    to="/"
                  >
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-white/60">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-white/80 hover:text-white"
                    to="/"
                  >
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-white/80 hover:text-white"
                    to="/"
                  >
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-white/80 hover:text-white"
                    to="/"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-base font-medium text-white/80 hover:text-white"
                    to="/"
                  >
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-white/60">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-white/80 hover:text-white"
                    to="/"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-white/80 hover:text-white"
                    to="/"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-base font-medium text-white/80 hover:text-white"
                    to="/"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer