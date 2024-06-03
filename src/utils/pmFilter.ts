let tableAssignedHtml;
let tablePausedHtml;
let teamList = {
    ua: {
        assignedProjects: 0,
        pausedProjects: 0,
        classAmount: 0,
    },
    utah: {
        assignedProjects: 0,
        pausedProjects: 0,
        classAmount: 0,
    },
    serbia: {
        assignedProjects: 0,
        pausedProjects: 0,
        classAmount: 0,
    },
};

export function getAssignedHtml() {
    if (document.URL.includes('static-pm-page')) {
        tableAssignedHtml = document.querySelectorAll("#operator_assigned tr");
        if (tableAssignedHtml.length === 0) {
            setTimeout(() => {
                getAssignedHtml();
            }, 1000);
        } else {
            for (let i = 0; i < tableAssignedHtml.length; i++) {
                let singleRaw = tableAssignedHtml[i].querySelectorAll("td");
                if (singleRaw[1] !== undefined) {
                    const teamName = singleRaw[1].innerText;
                    const packageName = singleRaw[10].innerText;
                    sortAssignedProjects(teamName, packageName);
                }
            }
            getPausedHtml();
            showInfo(teamList);
        }
    }
    
    function getPausedHtml() {
        tablePausedHtml = document.querySelectorAll("#operator_paused tr");
        for (let i = 0; i < tablePausedHtml.length; i++) {
            let singleRaw = tablePausedHtml[i].querySelectorAll("td");
            if (singleRaw[1] !== undefined) {
                const teamName = singleRaw[1].innerText;
                sortPausedProjects(teamName);
            }
        }
    }
    
    function sortPausedProjects(team) {
        if (team === "Utah") {
            teamList.utah.pausedProjects += 1;
        }
        if (team === "Ukraine") {
            teamList.ua.pausedProjects += 1;
        }
        if (team === "Serbia") {
            teamList.serbia.pausedProjects += 1;
        }
    }
    
}

function sortAssignedProjects(team, packageName) {
    if (team === "Utah") {
        teamList.utah.assignedProjects += 1;
        teamList.utah.classAmount += isPackageClass(packageName);
    }
    if (team === "Ukraine") {
        teamList.ua.assignedProjects += 1;
        teamList.ua.classAmount += isPackageClass(packageName);
    }
    if (team === "Serbia") {
        teamList.serbia.assignedProjects += 1;
        teamList.serbia.classAmount += isPackageClass(packageName);
    }
}

function isPackageClass(packageName) {
    return packageName === "Quicken Loans" ||
    packageName === "Class Valuation" ||
    packageName === "Scanner Onboarding" ||
    packageName === "Guild Mortgage" ||
    packageName === "Class Inspection Stage" ||
    packageName === "ServiceLink"
        ? 1
        : 0;
}

function showInfo(obj) {
    const header = document.querySelector(".tab-buttons");
    const infoDiv = document.createElement("div");
    infoDiv.style.display = 'flex';
    infoDiv.style.justifyContent = 'space-around'
    infoDiv.innerHTML = `
                            <div>UA : в роботi - ${obj.ua.assignedProjects} (з них классiв - ${obj.ua.classAmount}) в паузi - ${obj.ua.pausedProjects}</div>
                            <div>UTAH : в роботi - ${obj.utah.assignedProjects} (з них классiв - ${obj.utah.classAmount}) в паузi - ${obj.utah.pausedProjects}</div>
                            <div>SERBIA : в роботi - ${obj.serbia.assignedProjects} (з них классiв - ${obj.serbia.classAmount}) в паузi - ${obj.serbia.pausedProjects}</div>
                        `;
    header.parentNode.insertBefore(infoDiv, header.nextSibling);
}
