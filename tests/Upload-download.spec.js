const exceljS = require('exceljs')
const {test,expect}=require('@playwright/test');

async function WriteExcel(searchtext,Replacetext,change,path) {
    
    const workbook = new exceljS.Workbook();
    await workbook.xlsx.readFile(path);
    const worksheet = workbook.getWorksheet('Sheet1');

  const output= await ReadExcel(worksheet,searchtext);
   const cell= worksheet.getCell(output.row,output.column+change.colchange);
   cell.value=Replacetext;
  await workbook.xlsx.writeFile(path);


}

async function ReadExcel(worksheet,searchtext){
    let output={row:-1,column:-1};
worksheet.eachRow((row,rowNumber) => {

        row.eachCell((cell,colNumber) => {
            if(cell.value===searchtext)
            {
                output.row=rowNumber;
                output.column=colNumber;

                
            }

        })


    })

return output;
}


    test('upload download excel validation',async({ page })=>{
        const textsearch="Mango";
        const valuesno="100";

        await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
       const downloadresponse= page.waitForEvent('download');
       await page.getByRole('button',{name:'Download'}).click();

       const filePath = "D:\\download.xlsx";

        const dl = await downloadresponse;
         await dl.saveAs(filePath);
        WriteExcel(textsearch,"100",{rowchange:0,colchange:2},filePath);
       await page.locator("#fileinput").click();

       await page.locator("#fileinput").setInputFiles(filePath);

       const gettext=page.getByText(textsearch);

       const desiredvalue=await page.getByRole('row').filter({has:gettext});

      await expect(desiredvalue.locator("#cell-4-undefined")).toContainText(valuesno);
      

    })