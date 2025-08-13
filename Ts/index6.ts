import * as readlineSync from "readline-sync";

//pede um numero

let valorStr: string = readlineSync.question("digite um numero inteiro");
let valor: number = parseInt(valorStr);

if (Number.isInteger(valor)) {
  console.log("O valor é :" + valor);
} else {
  console.log("O valor é :" + valor);
}
