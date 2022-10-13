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

import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {ExclamationCircleIcon} from '@heroicons/react/solid';
import BlackButton from "@/components/general/buttons/BlackButton";
import {getDefaultMethod, updateSubscription} from "@/services/stripe-store";
import {useAuth} from "@/libs/auth";
import ChoosePlan from "@/components/create-team/ChoosePlan";
import {useTeam} from "@/libs/team";
import BlueButton from "@/components/general/buttons/BlueButton";

export default function ChangePlanModal(props: { open: boolean, close: any, cid: string, update?: Function }) {
  const {token} = useAuth()
  const {active} = useTeam()

  const closeModal = useCallback(() => {
    props.close();
  }, [props]);

  const [plan, setPlan] = useState("")
  const [defaultMethod, setDefaultMethod] = useState()
  useEffect(() => {
    getDefaultMethod(token, props.cid).then((res) => {
      setDefaultMethod(res.data?.method)
    })
  }, [props.cid, token])

  const [loading, setLoading] = useState(false)

  const handleChange = () => {
    setLoading(true)
    if (!plan) {
      closeModal()
      setLoading(false)
      return
    }

    let updateValues: any = {
      cid: props.cid,
      productId: plan,
      paymentMethod: defaultMethod
    }

    if (active.type == 'team') {
      updateValues['teamId'] = active.id
    }

    updateSubscription(token, updateValues).then(() => {
      if (props.update) {
        props.update(true)
      }
      closeModal()
      setLoading(false)
    })
  }

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={closeModal}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
              {
                !defaultMethod ?
                  <div>
                    <div>
                      <div
                        className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                        <ExclamationCircleIcon className="h-6 w-6 text-red-600" aria-hidden="true"/>
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                          No default payment method detected
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Please ensure that you have a payment method added and that it is selected as default before
                            continuing
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6">
                      <div className="mx-1">
                        <BlackButton width="full" click={closeModal}>
                          Okay! Let&apos;s Try Again
                        </BlackButton>
                      </div>
                    </div>
                  </div>
                  :
                  <div>
                    <ChoosePlan cid={props.cid} type={active.type == 'user' ? 'plan' : 'team'}
                                update={(update: any) => setPlan(update.plan)}/>

                    <div className="mt-12">
                      <BlueButton click={() => handleChange()} width={"full"} disabled={loading}>
                        {loading ? "Changing your plan..." : "Change Plan"}
                      </BlueButton>
                    </div>
                  </div>
              }
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
