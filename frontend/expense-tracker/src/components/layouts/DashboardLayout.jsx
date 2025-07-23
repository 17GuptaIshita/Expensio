import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import Navbar from './Navbar'
import SideMenu from './SideMenu'

import PaymentModal from '../PaymentModal';


const DashboardLayout = ({children, activeMenu}) => {
  const { user, updateUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(true);

  // Only show modal and blur if user exists and hasPaid is false
  const shouldBlur = user && user.hasPaid === false;

  const handlePaymentSuccess = () => {
    // Update user context to hasPaid: true
    updateUser({ ...user, hasPaid: true });
    setShowModal(false);
  };

  return (
    <div>
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className="flex">
          <div className='max-[1080px]:hidden'>
            <SideMenu activeMenu={activeMenu}/>
          </div>
          <div className={`grow mx-5 ${shouldBlur ? 'filter blur-sm pointer-events-none' : ''}`}>{children}</div>
          {shouldBlur && showModal && (
            <PaymentModal
              onPay={handlePaymentSuccess}
              onClose={() => setShowModal(false)}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default DashboardLayout;