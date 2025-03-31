import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../contex/AppContext'

const Header = () => {
    const {removeBg} = useContext(AppContext)

  return (
    <div className='flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20'>
        {/*left*/}
        <div >
            <h1 className='text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight'>
                Remove the <br className='max-md:hidden' /> <span className='bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent'>background</span> from <br className='max-md:hidden'/> images for free.
            </h1>
            <p className='my-6 text-[15px] text-gray-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br className='max-sm:hidden'/> Saepe blanditiis delectus modi velit eum nostrum sint quasi, porro exercitationem nulla.</p>
            <div>
                <input onChange={e => removeBg(e.target.files[0])} type="file" accept='image/*' id="upload1" hidden/>
                <label className='inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700' htmlFor="upload1">
                    <img width={20} src={assets.upload_btn_icon} alt="" />
                    <p className='text-white text-sm'>Upload your image</p>
                </label>
            </div>
        </div>

        {/*Right*/}
        <div className='w-full max-w-md'>
            <img src={assets.header_img} alt="" />
        </div>
    </div>
  )
}

export default Header