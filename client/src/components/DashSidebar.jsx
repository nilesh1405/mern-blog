import React from 'react'
import {Sidebar} from 'flowbite-react'
import {HiUser,HiArrowSmRight} from 'react-icons/hi'
import { useEffect, useState } from 'react';
import { useLocation ,Link} from 'react-router-dom';

function DashSidebar() {
    const location = useLocation();
    const [tab , setTab] = useState('');
    useEffect(()=>{
        const urlPramas = new URLSearchParams(location.search);
        const tabFromUrl = urlPramas.get('tab');
        if(tabFromUrl){
            setTab(tabFromUrl);
        }
    }, [location.search]);
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Sidebar.Item active={tab==='profile'} href="/dashboard?tab=profile" icon={HiUser} label={"User"} labelColor='dark'>
                    Profile
                </Sidebar.Item>
                <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer'>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar