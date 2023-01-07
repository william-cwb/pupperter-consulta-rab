import puppeteer, { Browser, Page } from "puppeteer"

interface Rab {
    owner: string,
    cpf_cnpj: string,
    operator: string,
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

    const browser: Browser = await puppeteer.launch({});
    const page: Page = await browser.newPage();

    await new Promise((r) => setTimeout(r, 1000));

    await page.goto(url);

    return await page.evaluate(() => {
      const columns: Array<string>  = [];
      const data: Rab = {
        owner: "",
        cpf_cnpj: "",
        operator: "",
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

    //   const th: Array<HTMLElement> = Array.from(document.querySelectorAll(".table.table-hover th"));
    //   th.map((t: HTMLElement) => columns.push(t.innerText));
      const td: Array<HTMLElement> = Array.from(document.querySelectorAll(".table.table-hover td"));

      const values = td.map((t) => t.innerText);

      data.owner = values[0];
      data.cpf_cnpj = values[1];
      data.operator = values[2];
      data.manufacturer = values[3];
      data.year = values[4];
      data.model = values[5];
      data.serial_number = values[6];
      data.icao = values[7];
      data.type_habilitation = values[8];
      data.class_aircraft = values[9];
      data.max_weight = values[10];
      data.max_passengers = values[11];
      data.type_authorized = values[12];
      data.status_operation = values[15];
      data.issuance_date = values[18];

      return data;
    });    
}