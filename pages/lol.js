import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UserList from '@/components/user/UserList';

const Header = () => {
  return (
    <>
      <UserList
        users={[{ name: 'mario', code: '12312313', email: 'mario@mario.com' }]}
      />
    </>
  );
};

export default Header;
