import { classArr } from "./constants"

export interface projectInfo  {
    name: string
    organization: string
    floorsNumber: number
    id: string
    projectPackage: string
    totalTime: number
    qaTime: number
    takenTime: string

}

const useInfo = () => {

    async function getDataFromWebPage() {
      const table = document.getElementById("logs-container");
      let takenTime: string;
      const rows = table.querySelectorAll("tr");
      for (let i = 0; i < rows.length; i++) {
          if (rows[i].innerHTML.includes("[assign]") && rows[i + 1]) {
            const time = rows[i + 1]
              .querySelectorAll("td")[1]
              .innerHTML.slice(11, 16);
            takenTime = time;
            break;
          }
        }
      const paragraphs = document.querySelectorAll("p");
      const name = paragraphs[0].innerHTML.slice(1, -110).trim();
      let org = paragraphs[2].innerHTML.slice(35, -98).trim();
      org =
      classArr.filter((item) => item === org).length === 1
        ? "Quicken Loans"
        : org;
    const projectPackage = getPackage(org, classArr);
    const floors =
    document.getElementById("floors-tab").querySelectorAll("h4 .btn-group")
      .length / 2;
      const idReg = /(?<=project=).{10}/g;
      const projectId = window.location.toString().match(idReg)[0]
      const time = getTime();

      const info:projectInfo = {
        name,
        organization: org,
        floorsNumber: floors,
        id: projectId,
        projectPackage,
        totalTime: time.totalTime,
        qaTime: time.qaTime,
        takenTime
      }

    return info
    }

    function getPackage(org: string, arr: string[]): string {
        if (org === "Quicken Loans") {
          return "Simple Inspection";
        } else if (org.includes("Progress")) {
          return "Standard";
        } else {
          return document.querySelector(".panel-heading h3 b").innerHTML;
        }
      }

      function getTime () {
        let qaTime: number;
        let totalTime: number = 0;
        const modal = document.querySelectorAll('.modal-body .col-xs-12 .row');
        if (modal.length > 0) {
            for (let i = 0; i < modal.length; i++) {
              if (modal[i].children[0].innerHTML.trim() === 'qa') {
                qaTime = +modal[i].children[7].innerHTML.trim()
              }
              
            }
            for (let i = 1; i < modal.length; i++) {
              if (modal[i].querySelector('.col-xs-2').innerHTML.trim() === 'asset_tool') break;
              totalTime += +(modal[i].querySelectorAll('.col-xs-1')[5].innerHTML.trim())
            }
          } else {
            qaTime = undefined;
            totalTime = undefined
          }
          return {qaTime, totalTime}
      }


    return {getDataFromWebPage}
  
}

export default useInfo