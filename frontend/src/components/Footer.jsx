import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'

function Footer() {
  return (
    <>
    <section className="relative overflow-hidden py-10 border border-t-2 border-t-black">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className='pb-5 md:pt-7'>
                                <Logo width="200px"/>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-800">
                                    &copy; Airbnb, inc. &#183; Privacy &#183; Terms &#183; Sitemap &#183; Company details
                                </p>
                            </div>
                        </div>
                    </div>
                        <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                            <div className="h-full">
                                <h3 className="tracking-px mb-5  text-xs font-semibold uppercase text-gray-500">
                                Support
                                </h3>
                                <ul>
                                    <li className="mb-4">
                                        <Link
                                            className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Help Center
                                        </Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link
                                            className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            AirCover
                                        </Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link
                                            className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Cancellation options
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Anti-discrimination
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                            <div className="h-full">
                                <h3 className="tracking-px mb-5  text-xs font-semibold uppercase text-gray-500">
                                    Hosting
                                </h3>
                                <ul>
                                    <li className="mb-4">
                                        <Link
                                            className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Airbnb your home
                                        </Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link
                                            className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Hosting resources
                                        </Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link
                                            className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Community forum
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Join a free Hosting class
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                            <div className="h-full">
                                <h3 className="tracking-px mb-5  text-xs font-semibold uppercase text-gray-500">
                                    Airbnb
                                </h3>
                                <ul>
                                    <li className="mb-4">
                                        <Link
                                            className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Newsroom
                                        </Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link
                                            className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            New features
                                        </Link>
                                    </li>
                                    <li className='mb-4'>
                                        <Link
                                            className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Investors
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Airbnb.org emergency stays
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    </>
  )
}

export default Footer