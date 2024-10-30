import { validate, typedef } from "bycontract";

export class Carro {
    #id;

    constructor(id) {
        validate(id, "Number");
        if (id <= 0) {
            throw new Error(`Identificador invalido: ${id}`);
        }
        this.#id = id;
    }

    get id() {
        return this.#id;
    }

    toString() {
        let str = `id: ${this.#id}`;
        return str;
    }
}

export class Locomotiva extends Carro {
    #potencia;

    constructor(id, potencia) {
        validate(id, "number");
        validate(potencia, "number");
        super(id);
        if (potencia <= 0) throw new Error('Potencia invalida');
        this.#potencia = potencia;
    }

    get potencia() {
        return this.#potencia;
    }

    toString() {
        return 'Locomotiva - ' +
            super.toString() +
            `, potencia: ${this.potencia}`;
    }
}

export class VagaoCarga extends Carro {
    #capCarga;

    constructor(id, capCarga) {
        validate(id, "number");
        validate(capCarga, "number");
        super(id);
        if (capCarga <= 0) throw new Error('Capacidade de carga invalida');
        this.#capCarga = capCarga;
    }

    get capCarga() {
        return this.#capCarga;
    }

    toString() {
        return 'Vagao carga - ' +
            super.toString() +
            `, capacidade: ${this.capCarga}`;
    }
}

export class VagaoPassageiro extends Carro {
    #qtdadePassageiros;

    constructor(id, qtdadePassageiros) {
        validate(id, "number");
        validate(qtdadePassageiros, "number");
        super(id);
        if (qtdadePassageiros <= 0) throw new Error('Quantidade de passageiros invalida');
        this.#qtdadePassageiros = qtdadePassageiros;
    }

    get qtdadePassageiros() {
        return this.#qtdadePassageiros;
    }

    toString() {
        return 'Vagao passageiros - ' +
            super.toString() +
            `, passageiros: ${this.qtdadePassageiros}`;
    }
}

// ----------------
// Interface refrigerado
typedef("#Refrigerado",
        {
            tempMinima:'number'
        });

export function isRefrigerado(obj){
    return 'tempMinima' in obj;
}

// Interface Locavel
typedef("#Locavel",
        {
            valorLocacao:'number'
        });

export function isLocavel(obj){
    return 'valorLocacao' in obj;
}
// ----------------

export class VagaoCargaRefrigerado extends VagaoCarga{
    #tempMin;

    constructor(id,capCarga,tempMin){
        validate(arguments,["number","number","number"]);
        super(id,capCarga);
        this.#tempMin = tempMin;
    }

    // Implementa Refrigerado
    get tempMinima(){
        return this.#tempMin;
    }

    toString(){
        return super.toString() + `, temp minima: ${this.tempMinima}`;
    }
}

export class VagaoPassageiroLocavel extends VagaoPassageiro{
    #tempMin;
    #valorLocacao;

    constructor(id,qtdadePassageiros,tempMin,valLoc){
        validate(arguments,["number","number","number","number"]);
        super(id,qtdadePassageiros);
        this.#tempMin = tempMin;
        this.#valorLocacao = valLoc;
    }

    // Implementa Refrigerado
    get tempMinima(){
        return this.#tempMin;
    }

    // Implementa Locacavel
    get valorLocacao(){
        return this.#valorLocacao;
    }

    toString(){
        return super.toString() + 
        `, temp minima: ${this.tempMinima}`+
        `, valor locação: ${this.valorLocacao}`;
    }
}
