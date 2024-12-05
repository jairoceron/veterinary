export interface IAfiliado {
    'idcontrato': {
        'S': string
    }, 'modalidad': {
        'S': string
    }, 'regimen': {
        'S': string
    }, 'numero': {
        'S': string
    }, 'eps': {
        'S': string
    }
}

export interface IContrato {
    'idcontrato': string,
    'modalidad': string,
    'regimen': string,
    'numero': string
    'eps': string
}

export interface IdataPost  {
            
    nombreTabla: string
    
  }

  export interface Regimen 
    { value: string, viewValue: string }
    ;