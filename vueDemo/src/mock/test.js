
const vacationDays = ()=>{
    const repairDays = Math.floor(Math.random(365)*100);
    console.log(repairDays);
    
    debugger
    const alreadyDays = Math.floor(Math.random() * repairDays);
    console.log(alreadyDays);
    debugger
    const residueDays = repairDays - alreadyDays;
    
    return {
        repairDays,
        alreadyDays,
        residueDays
    }
    
}
vacationDays()
 