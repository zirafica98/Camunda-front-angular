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
        text:"Vaše prezime",
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
        title:"Unos ličnih podataka",
        text:"Apliciranje za Online kreditnu karticu je jednostavno i može da se završi u nekoliko koraka. Kao prvo, moramo da se upoznamo: unesite svoje lične podatke i nakon klika na dugme <b>Nastavi</b> poslaćemo Vam SMS poruku sa verifikacionim kodom.",
    },
    AddressForm:{
        title:"Adresa stanovanja",
        text:"Molim, unesite podatke o adresi stanovanja. Nakon unosa prvih nekoliko karaktera, odaberite svoju opštinu, mesto i ulicu iz liste. Na ovu adresu će Vam biti poslata kreditna kartica.",
    },
    PhoneVerificationForm:{
        title:"Verifikacija broja telefona",
        text:"",
    }
}