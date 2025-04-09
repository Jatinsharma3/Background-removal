import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../contex/AppContext'

const Header = () => {
    const { removeBg } = useContext(AppContext)

    return (
        <div className='flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20'>
            {/*left*/}
            <div >
                <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-extrabold text-gray-800 leading-tight tracking-tight">
                    Effortless <br className="max-md:hidden" />
                    <span className="bg-gradient-to-r from-purple-600 to-fuchsia-500 bg-clip-text text-transparent">
                        Background Removal
                    </span>
                    <br className="max-md:hidden" /> in Seconds
                </h1>
                <p className="my-6 text-[16px] text-gray-500">
                    Instantly remove backgrounds from your images with AI. <br className="max-sm:hidden" />
                    No design skills needed — just upload and download, it's that simple.
                </p>
                <div>
                    <input onChange={e => removeBg(e.target.files[0])} type="file" accept='image/*' id="upload1" hidden />
                    <label className='inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700' htmlFor="upload1">
                        <img width={20} src={assets.upload_btn_icon} alt="" />
                        <p className='text-white text-sm'>Upload your image</p>
                    </label>
                </div>
            </div>

            {/*Right*/}
            {/* <div className='w-full max-w-md'>
                <img src={assets.header_img} alt="" />
            </div> */}
            <div className="w-80 max-w-md rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                <img src={assets.header_img} alt=""  />
            </div>
        </div>
    )
}

export default Header