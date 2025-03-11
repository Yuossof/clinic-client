import AddReview from '@/components/Doctor/AddReview';
import GetDoctor from '@/components/Doctor/GetDoctor';
import MainContent from '@/components/Doctor/MainContent';
import ShowMessageDialog from '@/components/Doctors/ShowMessageDialog';
import { GetUser } from '@/lib/services/auth/GetUser';
import { Params } from '@/types/Params';
import React from 'react'

export default async function Doctor({ params }: { params: Params }) {
  const {id} = params;
  const user = await GetUser();
  return (
    <>
      <GetDoctor id={id}/>
      <ShowMessageDialog />
      <div className='container h-full px-[5px] md:px-[20px] lg:px-[80px] xl:px-[130px]'>
        <MainContent user={user}/>
        <AddReview id={id}/>
      </div>
    </>
  )
}
