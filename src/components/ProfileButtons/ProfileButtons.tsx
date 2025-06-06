'use client'
import ProfileButton from "@/components/profile-page/reports/ProfileButton"
import Link from 'next/link'
import { motion } from "framer-motion"
import { childNav, parentDiv } from "../ParentAndChildAnimation"


export default function ProfileButtons() {
  return (
    <div className="flex w-full">
      <div className="flex-1 flex justify-end mt-4 gap">
        <motion.div
          variants={parentDiv}
          initial='hidden'
          whileInView='visible'
          className="flex items-center gap-3">
          <motion.div
            variants={childNav}
          >
            <Link href='/profile/reports'>
              <ProfileButton text="My Reports" />
            </Link>
          </motion.div>
          <motion.div
            variants={childNav}
          >
            <Link href='/my-appointments'>
              <ProfileButton text="My Appointments" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
