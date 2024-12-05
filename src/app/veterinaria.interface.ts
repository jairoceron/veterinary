import { IMAGE_JPEG } from "./service/constants";

export interface IEspecie {
  idEspecie: string,
  name: string
}

export interface Pqrs {
  objectid: number;
  radicado: string;

  asunto_radicacion: string;
  razon_social_establecimiento?: string;
  sector_reportado: string;
  localidad: string;
  entidad_de_control?: string;


  // shape?: string; 

}

export interface IImagen {
  'idVetMascota': {
    'S': string
  }, 'image': {
    'S': string
  }, 'order': {
    'S': string
  }
}

export interface IRazasGen {
  'idRaza': string,
  'especie': string,
  'nombre': string
}

export interface IEnfermedad {
  'idVetEnfermedad': string,
  'especie': string,
  'nombre': string,
}

export interface IMascotaGen {

  'idVetMascota': string,
  'image': string,
  'nombreMascota': string,
  'especie': string,
  'sexo': string,
  'raza': string,
  'color': string,
  'fechaNacimiento': string,
  'peso': string,
  'idVeterinaria': string,
  'idPersonaDueno': string,
  'nombreTabla'?: string,
  'nombreDueno': string,
  'cedulaDueno': string,

}

export interface IAnamnesicoGen {
  'idVetAnamnesico': string,
  'idVetMascota': string,
  'idVeterinaria': string,
  'alimentacion': string,
  'enfermedAnterior': string,
  'evaluacion': string,
  'fechaDesparacitacion': string,
  'fechaUltParto': string,
  'fechaVacuna': string,
  'historiaReproductiva': string,
  'vacuna': string,
  'tratamiento': string
}

// idVetMascota,"alimentacion","enfermedAnterior","evaluacion","fechaDesparacitacion","fechaUltParto","fechaVacuna","historiaReproductiva","tratamiento","vacuna"

export interface IAnamnesico {

  'idVetAnamnesico': {
    'S': string
  },
  'idVetMascota': {
    'S': string
  }, 'alimentacion': {
    'S': string
  }, 'enfermedAnterior': {
    'S': string
  }, 'idVeterinaria': {
    'S': string
  }, 'evaluacion': {
    'S': string
  }, 'fechaDesparacitacion': {
    'S': string
  }, 'fechaUltParto': {
    'S': string
  }, 'fechaVacuna': {
    'S': string
  }, 'historiaReproductiva': {
    'S': string
  }, 'vacuna': {
    'S': string
  }, 'tratamiento': {
    'S': string
  }
}

export interface IMascota {
  'idPersonaDueno': {
    'S': string
  }, 'idVetMascota': {
    'S': string
  }, 'nombreMascota': {
    'S': string
  }, 'raza': {
    'S': string
  }, 'idVeterinaria': {
    'S': string
  }, 'sexo': {
    'S': string
  }, 'especie': {
    'S': string
  }, 'color': {
    'S': string
  }, 'peso': {
    'S': string
  }, 'fechaNacimiento': {
    'S': string
  }, 'nombreDueno': {
    'S': string
  }, 'cedulaDueno': {
    'S': string
  }
}


export interface IDynamoPersonaDueno00 {
  'idPersonaDueno': {
    'S': string
  }, 'idVeterinario': {
    'S': string
  }
  , 'apellidos': {
    'S': string
  },
  'nombres': {
    'S': string
  },
  'identificacion': {
    'S': string
  },
  'ciudad': {
    'S': string
  },
  'localidad': {
    'S': string
  },
  'direccion': {
    'S': string
  },
  'telefono': {
    'S': string
  },
  'correoelectronico': {
    'S': string
  }
}

export interface IDynamoPersonaDueno {
  idPersonaDueno: {
    S: string
  },
  apellidos: {
    S: string
  },
  nombres: {
    S: string
  }
}

export interface IDynamoTableName {
  tableName: string
}

export interface IItemDynamo {
  idIDynamoPersonaDueno: IDynamoPersonaDueno,
  iDynamoTableName: IDynamoTableName,
}

/*
export interface IDynamoPersonaDueno {
  'idPersonaDueno': {
    'S': '006'
  }, 'apellidos': {
    'S': 'SPENCER'
  },
  'nombres': {
    'S': 'PABLO DE TARSO'
  }
}
*/



export interface PersonaDueno {
  idPersonaDueno: number;
  identificacion: string;
  nombres: string;
  apellidos: string;
  ciudad: string;
  localidad: string;
  direccion: string;
}

export interface Pais {
  country: string;
}

export interface IVeterinaria {
  idVeterinaria: string,
  nombreTabla: string,
  idPersonaDueno?: string,
  idMascota?: string,
  idVetMascota?: string,
}

export interface IDuenoMascota {
  idVeterinario: string,
  nombreTabla: string,
  apellidos: string
}


const ELEMENT_DATA: Element[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', test: 'test', test1: 'test1', test2: 'text2', test3: 'text3', test4: 'text4', test5: 'text5', test6: 'text6', test7: 'text7', test8: 'text8' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', test: 'test', test1: 'test1', test2: 'text2', test3: 'text3', test4: 'text4', test5: 'text5', test6: 'text6', test7: 'text7', test8: 'text8' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', test: 'test', test1: 'test1', test2: 'text2', test3: 'text3', test4: 'text4', test5: 'text5', test6: 'text6', test7: 'text7', test8: 'text8' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', test: 'test', test1: 'test1', test2: 'text2', test3: 'text3', test4: 'text4', test5: 'text5', test6: 'text6', test7: 'text7', test8: 'text8' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', test: 'test', test1: 'test1', test2: 'text2', test3: 'text3', test4: 'text4', test5: 'text5', test6: 'text6', test7: 'text7', test8: 'text8' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', test: 'test', test1: 'test1', test2: 'text2', test3: 'text3', test4: 'text4', test5: 'text5', test6: 'text6', test7: 'text7', test8: 'text8' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', test: 'test', test1: 'test1', test2: 'text2', test3: 'text3', test4: 'text4', test5: 'text5', test6: 'text6', test7: 'text7', test8: 'text8' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', test: 'test', test1: 'test1', test2: 'text2', test3: 'text3', test4: 'text4', test5: 'text5', test6: 'text6', test7: 'text7', test8: 'text8' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', test: 'test', test1: 'test1', test2: 'text2', test3: 'text3', test4: 'text4', test5: 'text5', test6: 'text6', test7: 'text7', test8: 'text8' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', test: 'test', test1: 'test1', test2: 'text2', test3: 'text3', test4: 'text4', test5: 'text5', test6: 'text6', test7: 'text7', test8: 'text8' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na', test: 'test', test1: 'test1', test2: 'text2', test3: 'text3', test4: 'text4', test5: 'text5', test6: 'text6', test7: 'text7', test8: 'text8' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg', test: 'test', test1: 'test1', test2: 'text2', test3: 'text3', test4: 'text4', test5: 'text5', test6: 'text6', test7: 'text7', test8: 'text8' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al', test: 'test', test1: 'test1', test2: 'text2', test3: 'text3', test4: 'text4', test5: 'text5', test6: 'text6', test7: 'text7', test8: 'text8' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si', test: 'test', test1: 'test1', test2: 'text2', test3: 'text3', test4: 'text4', test5: 'text5', test6: 'text6', test7: 'text7', test8: 'text8' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P', test: 'test', test1: 'test1', test2: 'text2', test3: 'text3', test4: 'text4', test5: 'text5', test6: 'text6', test7: 'text7', test8: 'text8' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S', test: 'test', test1: 'test1', test2: 'text2', test3: 'text3', test4: 'text4', test5: 'text5', test6: 'text6', test7: 'text7', test8: 'text8' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl', test: 'test', test1: 'test1', test2: 'text2', test3: 'text3', test4: 'text4', test5: 'text5', test6: 'text6', test7: 'text7', test8: 'text8' }
];

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  test: string;
  test1: string;
  test2: string;
  test3: string;
  test4: string;
  test5: string;
  test6: string;
  test7: string;
  test8: string;
}

export interface proMascota {
  Items: ItemsPersonaDueno[]
}

export interface listMascota {
  Items: IMascotaGen[]
}

/*
export interface ItemsMascotaX {
  idPersonaDueno: string,
  nombreMascota: string,
  idVeterinaria: string,
  raza: string,
  idVetMascota: string

}
  */

export const MASCOTACONST: IMascotaGen = {

  'idVetMascota': '',
  'image': IMAGE_JPEG,
  'nombreMascota': '',
  'especie': '',
  'sexo': '',
  'raza': '',
  'color': '',
  'fechaNacimiento': '',
  'peso': '',
  'idVeterinaria': '',
  'idPersonaDueno': '',
  'nombreDueno': '',
'cedulaDueno': ''
}



export interface ItemsPersonaDueno {

  identificacion: string,
  nombres: string,
  apellidos: string,
  ciudad: string,
  localidad: string,
  direccion: string,
  idPersonaDueno: string,
  idVeterinario: string,
  telefono: string,
  correoelectronico: string,
  image: string

}

export interface VetImages {
  // tabla vet_images
  idVetMascota: string,
  image: string,
  order: string
}


