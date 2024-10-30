import { validate, typedef } from "bycontract";
import nReadlines from "n-readlines";

import * as Carros from "./HierarquiaElemTrem.js";

export class Garagem {
    #carros;

    constructor(narq) {
        validate(narq, "string");
        this.#carros = [];
        this.carregaDados(narq);
    }

    carregaDados(narq) {
        validate(narq, "string");
        let arq = new nReadlines(narq);
        let buf = "";
        let line = "";
        let dados = "";

        // Pula a primeira linha
        arq.next();
        // Enquanto houverem linhas (leitura síncrona)
        while (buf = arq.next()) {
            line = buf.toString('utf8');
            dados = line.split(",");
            let id = Number(parseInt(dados[0]));
            let tipo = dados[1];
            let potencia = Number(parseInt(dados[2]));
            let capCarga = Number(parseInt(dados[3]));
            let qtdadePass = Number(parseInt(dados[4]));
            let tempMin = Number(parseInt(dados[5]));
            let valLocacao = Number(parseInt(dados[6]));
            switch (tipo) {
                case 'LO':
                    let locomotiva = new Carros.Locomotiva(id, potencia);
                    this.#carros.push(locomotiva);
                    break;
                case 'VC':
                    let vagaoCarga = new Carros.VagaoCarga(id, capCarga);
                    this.#carros.push(vagaoCarga);
                    break;
                case 'VP':
                    let vagaoPass = new Carros.VagaoPassageiro(id, qtdadePass);
                    this.#carros.push(vagaoPass);
                    break;
                case 'VR':
                    let vagaoRefr = new Carros.VagaoCargaRefrigerado(id, capCarga, tempMin);
                    this.#carros.push(vagaoRefr);
                    break;
                case 'VL':
                    let vagaoLoc = new Carros.VagaoPassageiroLocavel(id, qtdadePass, tempMin, valLocacao);
                    this.#carros.push(vagaoLoc);
                    break;
                default:
                    throw new Error('Elemento invalido')
            }
        }
    }

    get carrosNaGaragem() {
        return this.#carros.values();
    }    

    entra(carro){
        validate(carro, Carros.Carro);
        this.#carros.push(carro);
    }

    retira(id) {
        validate(id, "Number");
        let v = undefined;
        if (this.#carros.length > 0) {
            for (let i = 0; i < this.#carros.length; i++) {
                if (this.#carros[i].id === id) {
                    v = this.#carros.splice(i, 1)[0];
                    break;
                }
            }
        }
        return v;
    }
}

export class Trem {
    #carros;

    constructor(locomotiva) {
        validate(locomotiva, Carros.Locomotiva);
        this.#carros = [];
        this.#carros.push(locomotiva);
    }

    get carrosNoTrem() {
        return this.#carros.values();
    }

    potenciaRestante(){
        // 2 vagoes a cada 100 HP
        let pot = (this.#carros[0].potencia / 100)*2;
        // Desconta 2 por vagao refrigerado
        for(let v of this.#carros){
            if (Carros.isRefrigerado(v)){
                pot-=2;
            }else{
                pot--
            }
        }
        return pot;
    }

    qtdadeLocaveis(){
        let ql = 0;
        for(let v of this.#carros){
            if (Carros.isLocavel(v)){
                ql++;
            }
        }
        return ql;
    }

    engata(carro){
        validate(carro, Carros.Carro);
        // Não pode engatar locomotiva
        if (carro instanceof Carros.Locomotiva){
            throw new Error("Não pode engatar outra locomotiva");
        }
        // Verifica se tem potencia para mais vagoes
        let pot = this.potenciaRestante();
        if (pot === 0) throw new Error("Capacidade da locomotiva esgotada");
        if (Carros.isRefrigerado(carro)){
            if (pot < 2) throw new Error("Capacidade da locomotiva esgotada para refrigerados");
        }
        // Verifica se não esta inserindo passageiro depois de carga
        let ultimo = this.#carros[this.#carros.length-1];
        if (carro instanceof Carros.VagaoPassageiro &&
            ultimo instanceof Carros.VagaoCarga){
                throw new Error("Não pode engatar vagao de passageiro depois de vagao de carga");
            }
        // Verifica se não tem mais de dois locaveis
        if (this.qtdadeLocaveis() >= 2 && Carros.isLocavel(carro)){
            throw new Error("No máximo 2 locaveis por trem");
        }
        // Pode engatar
        this.#carros.push(carro);
    }

    // Desengata o último vagao
    desengata() {
        // Não pode retirar a locomotiva
        if (this.#carros.length <= 1){
            throw new Error("Não pode desengatar a locomotiva");
        }
        let i = this.#carros.length-1
        return this.#carros.splice(i, 1)[0];
    }

    static decodCarro(carro){
        if (carro instanceof Carros.VagaoPassageiroLocavel) return 'VL';
        if (carro instanceof Carros.VagaoCargaRefrigerado) return 'VR';
        if (carro instanceof Carros.VagaoPassageiro) return 'VP';
        if (carro instanceof Carros.VagaoCarga) return 'VC';
        if (carro instanceof Carros.Locomotiva) return 'LO';
        return undefined;
    }

    toString(){
        let str = "";
        for(let carro of this.#carros){
            str += `[${Trem.decodCarro(carro)}:${carro.id}]`;
        }
        return str;
    }
}




