import React, { FC, useState } from 'react';
import Typography from '@mui/material/Typography';
import { User } from '../pages/Account/Account';
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import styles from './UserCard.module.scss'
import { DeleteUserModal } from '../DeleteUserModal/DeleteUserModal';
import { EditUserModal } from '../EditUserModal/EditUserModal';


interface UserCardProps {
  user: User
}

export const UserCard: FC<UserCardProps> = ({ user }) => {
  const [hover, setHover] = useState<boolean>(false);

  const handleMouseIn: () => void = () => {
    setHover(() => true);
  };

  const handleMouseOut: () => void = () => {
    setHover(() => false);
  };

  return (
    <div className={styles.userCard} onMouseOver={handleMouseIn} onMouseOut={handleMouseOut}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={user.name} src={`https://avatars.dicebear.com/api/${user.gender}/${user.name}.svg`} />
        </ListItemAvatar>
        <ListItemText
          primary={user.name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {user.major}
              </Typography>
              {` — ${user.location}`}
            </React.Fragment>
          }
        />
        {hover &&
          <>
            <EditUserModal user={user} />
            <DeleteUserModal user={user} />
          </>}
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
}