import puppeteer, { Browser, Page } from "puppeteer"

interface Rab {
    owner: string,
    document_owner: string,
    operator: string,
    document_operator: string,
    manufacturer: string,
    year: string,
    model: string,
    serial_number: string,
    icao: string,
    type_habilitation: string,
    class_aircraft: string,
    max_weight: string,
    max_passengers: string,
    type_authorized: string,
    status_operation: string,
    issuance_date: string,
}

export default async function AircraftRabSearch(registration: string): Promise<Rab>{

    const url = `https://sistemas.anac.gov.br/aeronaves/cons_rab_resposta.asp?textMarca=${registration}&selectHabilitacao=&selectIcao=&selectModelo=&selectFabricante=&textNumeroSerie=`;
    console.log(">>>>>>AAAAAA>>>>>>>>")

    const browser: Browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.CHROMIUM_PATH,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });
    const page: Page = await browser.newPage();

    await new Promise((r) => setTimeout(r, 1000));

    await page.goto(url);

    return await page.evaluate(() => {

      const columns: Array<string>  = [];

      const data: Rab = {
        owner: "",
        document_owner: "",
        operator: "",
        document_operator: "",
        manufacturer: "",
        year: "",
        model: "",
        serial_number: "",
        icao: "",
        type_habilitation: "",
        class_aircraft: "",
        max_weight: "",
        max_passengers: "",
        type_authorized: "",
        status_operation: "",
        issuance_date: "",
      };

    
      const td: Array<HTMLElement> = Array.from(document.querySelectorAll(".table.table-hover td"));

      const values = td.map((t) => t.innerText);

      data.owner = values[0];
      data.document_owner = values[1];
      data.operator = values[2];
      data.document_operator = values[3];
      data.manufacturer = values[4];
      data.year = values[5];
      data.model = values[6];
      data.serial_number = values[7];
      data.icao = values[8];
      data.type_habilitation = values[9];
      data.class_aircraft = values[10];
      data.max_weight = values[11];
      data.max_passengers = values[12];
      data.type_authorized = values[13];
      data.status_operation = values[16];
      data.issuance_date = values[19];

      return data;
    });    
}