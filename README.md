# Sistema de Composição de Trens
Este projeto em Node.js simula um sistema de composição de trens, onde diferentes tipos de carros (locomotivas, vagões de carga, vagões de passageiros, etc.) podem ser gerenciados em uma garagem e atribuídos a composições de trens de acordo com regras específicas. A aplicação permite a criação de uma garagem de veículos ferroviários, a formação de composições de trens e a verificação de restrições como potência e capacidade.

## Funcionalidades
- Garagem de Carros: Carrega carros a partir de um arquivo CSV e os organiza em uma garagem.
- Formação de Composições de Trens: Permite que uma locomotiva seja o carro inicial de um trem, ao qual vagões de carga ou passageiros podem ser engatados seguindo restrições.
- Gestão de Carros e Regras: Aplica regras de potência, restrições para vagões de passageiros e locáveis, além de outras especificações de vagões.

## Classes Principais
- Garagem: Gerencia os carros ferroviários, permitindo adicionar e retirar carros conforme necessário.
- Trem: Gerencia os carros engatados em uma composição de trem e verifica as restrições de potência e capacidade antes de engatar novos vagões.
- Hierarquia de Carros: Inclui diferentes tipos de carros ferroviários, como:
- Locomotiva
- VagaoCarga
- VagaoPassageiro
- VagaoCargaRefrigerado (implementa interface Refrigerado)
- VagaoPassageiroLocavel (implementa interface Locável e Refrigerado)
  
## Regras de Engate
- Potência: A locomotiva deve ter potência suficiente para arrastar os vagões.
- Ordem dos Vagões: Vagões de passageiros não podem ser engatados após vagões de carga.
-Locáveis: No máximo dois vagões locáveis por composição.
-Refrigerados: Vagões refrigerados requerem mais potência para serem engatados.

## Estrutura do Projeto
-Garagem: Responsável por carregar carros a partir do arquivo Carros.csv.
-Trem: Responsável pela composição de trens e validação de regras de engate.
-HierarquiaElemTrem.js: Contém a definição dos diferentes tipos de carros e implementações das interfaces.

## Instalação e Uso
1 - Clone o repositório e instale as dependências:

```bash
npm install
```
2 - Certifique-se de que o arquivo Carros.csv está presente e contém os dados dos carros. O formato esperado é:

```csv
id,tipo,potencia/carga,passageiros,tempMin,valLocacao
```
3 - Execute o programa:

```bash
node <nome_do_arquivo_principal>
```
A interface de terminal exibirá as opções para listar carros na garagem, inserir carros no trem, remover o último carro do trem e encerrar a sessão.

## Tecnologias Utilizadas
- Node.js
- Módulos Nativos: fs, prompt-sync
- Biblioteca Externa: bycontract para validação de tipos e contratos

## Exemplo de Uso
Após iniciar o programa, selecione as opções para listar carros na garagem, engatar novos carros ao trem ou remover o último carro engatado. O sistema valida cada operação de acordo com as regras de composição e exibe mensagens de erro quando necessário.
