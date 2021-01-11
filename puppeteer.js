//Installation required
//1. npm i puppeteer
//2. npm i puppeteer-core
//run “node puppeteer.js BEQSSF” 



const puppeteer = require('puppeteer');
const fs = require('fs')

const scrape = async () =>{
    const browser = await puppeteer.launch({headless : false}); 
    const page = await browser.newPage();  
 
   await page.goto('https://codequiz.azurewebsites.net/', {waitUntil : 'domcontentloaded'}) // navigate to url and wait until page loads completely
   await page.click('input');
   await page.goto('https://codequiz.azurewebsites.net/', {waitUntil : 'domcontentloaded'})
  

   const recordList = await page.$$eval('table tbody tr',(trows)=>{
        let rowList = []    
        trows.forEach(row => {
                let record = {'FundName' : '','Nav' :'', 'Bid' : '','Offer':'','Change':''}
                const tdList = Array.from(row.querySelectorAll('td'), column => column.innerText); // getting textvalue of each column of a row and adding them to a list.
                record.FundName=tdList[0];     
                record.Nav = tdList[1];        
                record.Bid = tdList[2];    
                record.Offer = tdList[3];        
                record.Change = tdList[4];      
                if(tdList.length >= 2){         
                    rowList.push(record)
                }
            });
        return rowList;
    })


    const result = recordList.find(({FundName})=>FundName===process.argv[2])
    console.log(result.Nav)
    // Commented out screen shot here
    // await page.screenshot({ path: 'screenshots/wikipedia.png' }); //screenshot 
    browser.close();

    // Store output
    /*
    fs.writeFile('Fund_NAV.json',JSON.stringify(recordList, null, 2),(err)=>{
        if(err){console.log(err)}
        else{console.log('Saved Successfully!')}
    })
    */
};
scrape();