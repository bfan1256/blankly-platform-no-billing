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

import {ReactElement} from "react";
import ProjectSettingsLayout from "@/components/layouts/ProjectSettingsLayout";
import {useRouter} from "next/router";
import DeleteTeamCard from "@/components/teams/general-details/DeleteTeamCard";

function Advanced() {
  const router = useRouter();
  const {projectId} = router.query;
  return (
    <div className="mt-12">

      <h1 className="text-3xl font-medium">Advanced</h1>
      <DeleteTeamCard />
    </div>
  )
}

Advanced.getLayout = function getLayout(page: ReactElement) {
  return <ProjectSettingsLayout>{page}</ProjectSettingsLayout>;
};

export default Advanced
