/*******************************************************************/
/*                                                                 */
/*                  BLANKLY FINANCE CONFIDENTIAL                   */
/*                   _ _ _ _ _ _ _ _ _ _ _ _ _                     */
/*                                                                 */
/* Copyright 2022 Blankly Finance Incorporated                     */
/* All Rights Reserved.                                            */
/*                                                                 */
/* NOTICE:  All information contained herein is, and remains the   */
/* property of Blankly Finance Incorporated and its suppliers, if  */
/* any.  The intellectual and technical concepts contained         */
/* herein are proprietary to Blankly Finance Incorporated and its  */
/* suppliers and may be covered by U.S. and Foreign Patents,       */
/* patents in process, and are protected by trade secret or        */
/* copyright law.  Dissemination of this information or            */
/* reproduction of this material is strictly forbidden unless      */
/* prior written permission is obtained from Blankly Finance       */
/* Incorporated.                                                   */
/*                                                                 */
/*******************************************************************/

import {useAuth} from '@/libs/auth';
import type {NextPage} from 'next'
import styles from '../styles/Home.module.css'
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import { useFormik } from 'formik';

// TODO move this elsewhere
export const LoadingSpinner = ({text}: { text: string }) => {
    return <div className={styles.container}>
        <div className="flex flex-col justify-center items-center py-32">
            <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
            </div>
            <p className="inconsolata">{text}</p>
        </div>
    </div>;
}

const Home: NextPage = () => {
    const password = 'Blankly.iskingduh'
    const {user, loading} = useAuth();
    const formik = useFormik({
        initialValues: {
          password: '',
        },
        onSubmit: (values) => {
          if (values.password === password) {
            if (!user) {
                            router.push('/auth/signin');
                        } else {
                            router.push(`/${user.uid}`); // route to user ID project
                        }
          }
        },
      });
    const router = useRouter();
    return (
        <div className='h-screen flex-col flex items-center max-w-sm justify-center mx-auto gap-5'>
            <h1 className="font-bold text-lg">Please Enter Dev Password</h1>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter Password"
              onChange={formik.handleChange}
              value={formik.values.password}
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
            <button
            onClick={formik.submitForm}
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md font-medium shadow-sm text-md text-white bg-gray-900 hover:bg-gray-800"
            >
            Validate
            </button>
        </div>
    );
}


export default Home;
