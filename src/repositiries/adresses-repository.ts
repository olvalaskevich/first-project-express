const adresses=[{id:'1', value:'Pobedy'}, {id:'2', value:'Raduznaja'}, {id:'3', value:'Nzavicimosty'}]

export const adressesRepo={
    findAdresses(value:string|undefined){
        if (value){
            return adresses.filter((p) => p.value.includes(value))
        }
        else{
            return adresses
        }
    },
    findAdress(value){
        return adresses.find((p)=>p.value===value)
    },
    deleteAdress(adressId){
        let adress= adresses.find((p)=>p.id===adressId)
        if (adress){
            let indexAdress=adresses.indexOf(adress)
            adresses.splice(indexAdress,1)
            return adresses
        }
        else {
            return adress
        }
    },
    createAdress(newAdress){
        if (newAdress){
            adresses.push(newAdress)
            return newAdress
        }
    },
    updateAdress(adressBody){
        let adressUpdate=adresses.find((p)=>p.id===adressBody.id)
        if (adressUpdate){
            let index=adresses.indexOf(adressUpdate)
            adresses.splice(index,1,adressBody)
            return adresses[index]
        }
    }
}