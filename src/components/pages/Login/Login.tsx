import { Button } from '@mui/material';
import React, { FC, useState } from 'react';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import styles from './Login.module.scss'

export const Login: FC = () => {
  const [inputData, setInputData] = useState<string>('');

  return (
    <div className={styles.login_page_contaiter}>
      <div className={styles.login_page_contaiter__dialog}>
        welcome, stranger
      </div>
      <div className={styles.login_page_contaiter__form}>
        <div className={styles.login_page_contaiter__form__name_input}>
          <input size={40} value={inputData} placeholder='enter your name' onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInputData(event.target.value)}/>
        </div>
        <div className={styles.login_page_contaiter__form__login_button}>
          <Button component={Link}
                  to="/account"
                  color="warning"
                  disabled={!Boolean(inputData)}
                  onClick={() => Cookies.set('name', inputData)}
                  >log in</Button>
        </div>
      </div>
      <div className={styles.login_page_contaiter__login_button}>

      </div>
    </div>
  )
}