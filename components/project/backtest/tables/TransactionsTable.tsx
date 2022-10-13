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

import {useState, useEffect} from 'react';
import {processEpoch} from "@/utils/date";
import {classNames, splitAndCapitalize} from "@/utils/general";
import {TrendingDownIcon, TrendingUpIcon} from "@heroicons/react/solid";
import ContentLoader from "react-content-loader";
import {getPrice, lookupOrderType, roundByExchange} from '@/libs/trade-utils';
import TradeAnnotation from './TradeAnnotation';

const loadingList = ["", "", "", "", "", "", "", "", "", "", ""];

export default function PastTransactionsTable(props: any) {
  const trades = props.trades;
  const [loading, setLoading] = useState(true);

  function positionCSS(type: any) {
    if (type == "buy") {
      return (
        <div className="flex">
          <TrendingUpIcon className="w-5 h-5 text-green-400"/>
          <div className=" ml-2 text-sm text-green-400">BUY</div>
        </div>
      );
    }
    return (
      <div className="flex">
        <TrendingDownIcon className="w-5 h-5 text-red-400"/>
        <div className=" ml-2 text-sm text-red-400">SELL</div>
      </div>
    );
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200)
  }, [])

  return (
    <div className="flex flex-col roboto">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-3 lg:px-8">
          <div className="overflow-hidden border border-gray-200 sm:rounded-md">
            <table id="dataTable" className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="pl-5 pr-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Side
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Symbol
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Order Type
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Filled Price
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total Funds
                </th>

                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Limit Price
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Filled At
                </th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {
                loading ?
                  <>
                    {loadingList?.map((loading, index: number) => (
                      <tr id="tableDataRow" key={index}
                          className={classNames("bg-white")}>
                        <td className="pl-5 pr-3 py-4 whitespace-nowrap">
                          <ContentLoader
                            speed={2}
                            viewBox="0 0 100 50"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                          >
                            <rect x="0" y="0" rx="5" ry="5" width="90" height="40"/>
                          </ContentLoader>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <ContentLoader
                            speed={2}
                            viewBox="0 0 70 30"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                          >
                            <rect x="0" y="4" rx="5" ry="5" width="60" height="18"/>
                          </ContentLoader>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <ContentLoader
                            speed={2}
                            viewBox="0 0 70 30"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                          >
                            <rect x="0" y="7" rx="5" ry="5" width="45" height="13"/>
                          </ContentLoader>
                        </td>
                        <td className="py-4 px-3 whitespace-nowrap">
                          <ContentLoader
                            speed={2}
                            viewBox="0 0 70 30"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                          >
                            <rect x="0" y="5" rx="5" ry="5" width="50" height="17"/>
                          </ContentLoader>
                        </td>
                        <td className="py-4 px-3 whitespace-nowrap">
                          <ContentLoader
                            speed={2}
                            viewBox="0 0 70 30"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                          >
                            <rect x="0" y="6" rx="5" ry="5" width="60" height="14"/>
                          </ContentLoader>
                        </td>
                        <td className="py-4 px-3 whitespace-nowrap">
                          <ContentLoader
                            speed={2}
                            viewBox="0 0 70 30"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                          >
                            <rect x="0" y="6" rx="5" ry="5" width="60" height="14"/>
                          </ContentLoader>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <ContentLoader
                            speed={2}
                            viewBox="0 0 70 30"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                          >
                            <rect x="0" y="4" rx="5" ry="5" width="60" height="16"/>
                          </ContentLoader>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <ContentLoader
                            speed={2}
                            viewBox="0 0 100 50"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                          >
                            <rect x="0" y="5" rx="5" ry="5" width="90" height="27"/>
                          </ContentLoader>
                        </td>
                      </tr>
                    ))}
                  </>
                  :
                  <>
                    {trades?.map((transaction: any, index: number) => (
                      <tr id="tableDataRow" key={transaction.id} onClick={() => props.handleClick(index)}
                          className={classNames(index == props.activeTrade ? "bg-gray-100" : "bg-white", "hover:bg-gray-100 cursor-pointer transition-all")}>
                        <td className="pl-5 pr-3 py-4 whitespace-nowrap">
                          {positionCSS(transaction.side)}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-semibold">
                            {transaction.symbol}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {lookupOrderType(transaction?.type)}
                          </div>
                        </td>
                        <td className="py-4 px-3 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {Math.round(transaction.size * 100) / 100}
                          </div>
                        </td>
                        <td className="py-4 px-3 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {roundByExchange(getPrice(transaction), transaction.symbol)}
                          </div>
                        </td>
                        <td className="py-4 px-3 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {/*@ts-ignore*/}
                            {roundByExchange(getPrice(transaction) * transaction.size, transaction.symbol)}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {roundByExchange(getPrice(transaction), transaction.symbol)}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center justify-between">
                            {transaction.time && transaction.status == "done" ? processEpoch(transaction.time, 'lll') :
                              transaction.executed_at ? processEpoch(transaction.executed_at, 'lll') : 'Not Executed'}
                            {
                              transaction.annotation ? (
                                <TradeAnnotation annotation={transaction.annotation}/>
                              ) : null
                            }
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
