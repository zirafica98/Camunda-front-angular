interface inputResources {
    [key: string]: {
        text: string;
        placeholder: string;
        error: string;
    };
}
export const inputResource:inputResources={
    phone:{
        text:"Broj mobilnog telefona",
        placeholder:"Unesite svoj broj mobilnog telefona",
        error:"Neispravan broj telefona"
    },
    email:{
        text:"E-mail adresa",
        placeholder:"Unesite svoju e-mail adresu",
        error:"Neispravna e-mail adresa"
    },
    name:{
        text:"Vaše ime",
        placeholder:"Unesite svoje ime",
        error:"Neispravno ime"
    },
    lastname:{
        text:"Prezime",
        placeholder:"Unesite svoje prezime",
        error:"Neispravno prezime"
    },
    ssn:{
        text:"Vaš JMBG",
        placeholder:"Unesite Vaš JMBG",
        error:"JMBG mora biti validan"
    },
    verification:{
        text:"Verifikacioni kod",
        placeholder:"Unesite verifikacioni kod",
        error:"Verifikacioni kod nije validan"
    },
    municipality:{
        text:"Opština",
        placeholder:"Unesite opštinu",
        error:"Obavezno polje"
    },
    place:{
        text:"Mesto",
        placeholder:"Unesite mesto",
        error:"Obavezno polje"
    },
    street:{
        text:"Ulica",
        placeholder:"Unesite ulicu",
        error:"Obavezno polje"
    },
    houseNumber:{
        text:"Kućni broj",
        placeholder:"Unesite kućni broj",
        error:"Obavezno polje"
    },
    apartmentNumber:{
        text:"Broj stana",
        placeholder:"Unesite broj stana",
        error:""
    },
    onThisAddress:{
        text:"Živim na ovoj adresi u poslednjih",
        placeholder:"",
        error:"Obavezno polje"
    },
    status:{
        text:"Status",
        placeholder:"",
        error:"Obavezno polje"
    },
    addressDiff:{
        text:"Adresa u ličnoj karti se razlikuje od adrese stanovanja",
        placeholder:"",
        error:"Obavezno polje"
    },
    accounts:{
        text:"Račun sa koga će sredstva biti oročena",
        placeholder:"",
        error:"Molimo Vas izaberite račun"
    }
}

interface formResources {
    [key: string]: {
        title: string;
        text: string;
    };
}
export const formResources:formResources={
    SSNForm:{
        title:"Upit u kreditni biro",
        text:"U narednim koracima, dok popunjavate potrebne informacije, mi ćemo uraditi brzu proveru kroz Kreditni biro. Za tu svrhu biće nam potreban Vaš JMBG. U samo nekoliko minuta ćemo Vam reći da li zadovoljavate uslove za kreditnu karticu.",
    },
    BasicDataForm:{
        title:"Lični podaci",
        text:"Proverite svoje podatke koje imamo u sistemu",
    },
    AddressForm:{
        title:"Adresa stanovanja",
        text:"Molimo, unesite podatke o adresi stanovanja. Nakon unosa prvih nekoliko karaktera, odaberite svoju opštinu, mesto i ulicu iz liste.",
    },
    PhoneVerificationForm:{
        title:"Verifikacija broja telefona",
        text:"",
    }
}

interface welcomeResource {
    [key: string]: {
        text: string;
    };
}
export const welcomeResource:welcomeResource={
    upperTitle:{
        text:"Online oročena štednja nikada do sada nije bila ovako brza i jednostavna!"
    },
    upperText:{
        text:"Oročite sredstva bez odlaska u filijalu u samo par koraka"
    },
    infoTitle1:{
        text:"Oročenje za nekoliko minuta"
    },
    infoText1:{
        text:"Oročite sredstva online za samo nekoliko minuta."
    },
    infoTitle2:{
        text:"Bez dokumentacije"
    },
    infoText2:{
        text:"Dovoljan je jedan lični dokument, pasoš ili lična karta."
    },
    infoTitle3:{
        text:"100% online"
    },
    infoText3:{
        text:"Podnesite Zahtev bez odlaska u filijalu u samo par koraka."
    },
    inputTitle:{
        text:"Želim oročenje u iznosu od:"
    },
    inputTitle2:{
        text:"Želim da oročim na:"
    },
    buttonText:{
        text:"Podnesi zahtev online"
    },
    bottomTitle:{
        text:"Reprezentativni primer"
    },
    bottomText:{
        text:"U nastavku je reprezentativni primer za odabrane vrednosti."
    },
    tableCol11:{
        text:"Oročena štednja:"
    },
    tableCol12:{
        text:"Kamatna stopa:"
    },
    tableCol13:{
        text:"Efektivna kamatna stopa:"
    },
    tableCol14:{
        text:"Iznos kamate:"
    },
    tableCol15:{
        text:"Iznos poreza:"
    },
    tableCol16:{
        text:"Ukupan iznos nakon oročenja:"
    },
    tableCol21:{
        text:"100.000 EUR, period oročenja 24 meseca"
    },
    tableCol22:{
        text:"3,30%"
    },
    tableCol23:{
        text:"3,00%"
    },
    tableCol24:{
        text:"6.600,00 EUR"
    },
    tableCol25:{
        text:"600,00 EUR"
    },
    tableCol26:{
        text:"106.000,00 EUR"
    },
}