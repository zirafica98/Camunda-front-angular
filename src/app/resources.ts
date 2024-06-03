interface inputResources {
    [key: string]: {
        label: string;
        placeholder: string;
        error: string;
        tooltip:string;
    };
}
export const inputResource:inputResources={
    phone:{
        label:"Broj mobilnog telefona",
        placeholder:"Unesite svoj broj mobilnog telefona",
        error:"Neispravan broj telefona",
        tooltip:"Prikazan broj telefona je vaš registrovani broj u banci. Ukoliko ste izmenili broj telefona molimo Vas da pre nastavka procesa izmenite broj telefona."
    },
    email:{
        label:"E-mail adresa",
        placeholder:"Unesite svoju e-mail adresu",
        error:"Molimo upišite validnu e-mail adresu.",
        tooltip:"Molimo Vas unesite Vašu e-mail adresu."
    },
    name:{
        label:"Vaše ime",
        placeholder:"Unesite svoje ime",
        error:"Neispravno ime",
        tooltip:""
    },
    lastname:{
        label:"Prezime",
        placeholder:"Unesite svoje prezime",
        error:"Neispravno prezime",
        tooltip:""
    },
    ssn:{
        label:"Vaš JMBG",
        placeholder:"Unesite Vaš JMBG",
        error:"JMBG mora biti validan",
        tooltip:""
    },
    verification:{
        label:"Verifikacioni kod",
        placeholder:"Unesite verifikacioni kod",
        error:"Molimo upišite verifikacioni kod.",
        tooltip: "Unesite kod koji ste dobili putem SMS poruke."
    },
    municipality:{
        label:"Opština",
        placeholder:"Unesite opštinu",
        error:"Polje je obavezno.",
        tooltip:"Izaberite opštinu na kojoj stanujete."
    },
    place:{
        label:"Mesto",
        placeholder:"Unesite mesto",
        error:"Polje je obavezno.",
        tooltip:"Izaberite mesto opštine na kojoj stanujete."
    },
    street:{
        label:"Ulica",
        placeholder:"Unesite ulicu",
        error:"Polje je obavezno.",
        tooltip:"Izaberite ulicu u kojoj stanujete."
    },
    houseNumber:{
        label:"Kućni broj",
        placeholder:"Unesite kućni broj",
        error:"Polje je obavezno.",
        tooltip:"Unesite kućni broj, ulice u kojoj stanujete."
    },
    apartmentNumber:{
        label:"Broj stana",
        placeholder:"Unesite broj stana",
        error:"",
        tooltip:"Unesite broj stana."
    },
    onThisAddress:{
        label:"Živim na ovoj adresi u poslednjih",
        placeholder:"",
        error:"Polje je obavezno.",
        tooltip:""
    },
    status:{
        label:"Status",
        placeholder:"",
        error:"Polje je obavezno.",
        tooltip:""
    }
}

interface selectResources{
    [key: string]: {
        label: string;
        placeholder: string;
        error: string;
        tooltip:string;
        options:string[];
    };
}

export const selectResources:selectResources={
    addressDiff:{
        label:"Adresa u ličnoj karti se razlikuje od adrese stanovanja",
        placeholder:"",
        error:"Polje je obavezno.",
        tooltip:"Ukoliko se adresa na kojoj stanujete razlikuje od adrese iz Vaše lične karte, biće potreban unos adrese iz lične karte na narednom ekranu.",
        options:["Da","Ne"]
    },
    accounts:{
        label:"Račun sa koga će sredstva biti oročena",
        placeholder:"Izaberite račun",
        error:"Molimo Vas odaberite račun.",
        tooltip:"",
        options:[]
    }
}

interface checkboxResources{
    [key:string]:{
        text:string;
        link:string;
    };
}

export const checkboxResources:checkboxResources={
    checkbox1:{
        text:"Slažem se da moji podaci budu obrađeni.",
        link:"https://raiffeisenbank.rs/"
    },
    checkbox2:{
        text:"Slažem se da komunikaciju sa mnom banka vrši elektronskim putem.",
        link:"https://raiffeisenbank.rs/"
    }
}


interface textResources{
    [key:string]:{
        text:string;
    };
}

export const textResources:textResources={
    verification:{
        text:"Verifikacija broja telefona omogućava nastavak zahteva u slučaju prekida i elektronski potpis ugovora na kraju, na sličan način. Molimo Vas da upišete verifikacioni kod koji dobijete u SMS poruci."
    }
}


interface actionResources{
    [key:string]:{
        text:string;
        actionText:string
    };
}

export const actionResources:actionResources={
    verification:{
        text:"Još uvek niste dobili ništa?",
        actionText:"Ponovo pošalji verifikacioni kod"
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
        title:"Unos JMBG",
        text:"Potreban nam je Vaš JMBG.",
    },
    BasicDataForm:{
        title:"Provera podataka",
        text:"Molimo proverite svoje podatke koje imamo u sistemu.",
    },
    AddressForm:{
        title:"Adresa stanovanja",
        text:"Molimo, unesite podatke o adresi stanovanja. Nakon unosa prvih nekoliko karaktera, odaberite svoju opštinu, mesto i ulicu iz liste.",
    },
    PhoneVerificationForm:{
        title:"Verifikacija broja telefona",
        text:"",
    },
    CodeBookService:{
        title:"Molimo Vas sačekajte",
        text:"Slanje podataka...",
    },
    popupVerification:{
        title:"Verifikacioni kod poslat",
        text:"Na Vaš broj mobilnog telefona ponovo smo poslali verifikacioni kod.",
    },
    popupSendCode:{
        title:"Ponovo pošalji verifikacioni kod",
        text:"Novi kod biće poslat na broj telefona +381641234567. Molimo, potvrdite da li želite da Vam ponovo pošaljemo SMS kod.",
    },
    popupStartProcess:{
        title:"Podnesi zahtev online",
        text:"U narednim koracima oročićete iznos koji ste izabrali na kalkulatoru. Ukoliko želite da izaberete drugi iznos vratite se korak unazad.",
    }
}

interface buttonResources {
    [key: string]: {
        text: string;
    };
}

export const buttonResources:buttonResources={
    ok:{
        text:"U redu"
    },
    send:{
        text:"Pošalji"
    },
    cancel:{
        text:"Otkaži"
    },
    next:{
        text:"Nastavi"
    },
    back:{
        text:"Nazad"
    },
    confirm:{
        text:"Potvrdi"
    }
}

interface welcomeResources {
    [key: string]: {
        text: string;
    };
}
export const welcomeResources:welcomeResources={
    upperTitle:{
        text:"Onlajn oročena štednja nikada do sada nije bila ovako brza i jednostavna!"
    },
    upperText:{
        text:"Oročite sredstva bez odlaska u filijalu u samo par koraka!"
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
        text:"Ukoliko niste menjali lični dokument nije Vam potrebna nikakva dokumentacija"
    },
    infoTitle3:{
        text:"100% online"
    },
    infoText3:{
        text:"Realizujte štednju bez odlaska u filijalu u samo par koraka."
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
    iznosOrocenja:{
        text:"Iznos oročenja"
    },
    periodOrocenja:{
        text:"Period oročenja"
    },
    racunOrocenja:{
        text:"Račun sa koga će sredstva biti oročena"
    }
}