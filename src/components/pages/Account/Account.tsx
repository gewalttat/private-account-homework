import React, { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/configureStore';
import { getUsers, selectUsers } from '../../../redux/usersReducer';
import { UserCard } from '../../UserCard/UserCard';
import { SearchAppBar } from '../../SearchAppBar/SearchAppBar';
import { List } from '@mui/material';
import Cookies from 'js-cookie';
import styles from './Account.module.scss';
import { EmptyState } from '../../EmptyState/EmptyState';
import { AddUserModal } from '../../AddUserModal/AddUserModal';

export interface User {
  id: string,
  name: string,
  major: string,
  location: string,
  gender: string
}

export const Account: FC = () => {
  const { users } = useSelector(selectUsers);
  const dispatch = useDispatch<AppDispatch>();
  const strangerName = Cookies.get('name');

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch])

  return (
    <>
      {strangerName &&
        <>
          <SearchAppBar />
          <List sx={{ width: '100%', maxWidth: '100%' }}>
            {users?.map((i: User, index: number) => <UserCard user={i} key={index} />)}
          </List>
          <AddUserModal/>
        </>}
      {!strangerName && <div className={styles.empty_state}><EmptyState/></div>}
    </>
  )
}