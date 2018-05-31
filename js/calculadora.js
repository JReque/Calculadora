{

	let calculadora={

		buttonCalculPulsado: '',
		valorAcumulado: 0,

		domCalculadora:function () {
			let c = ["CE", "<=", "%", "+", "7", "8", "9", "-", "4", "5", "6", "x", "1", "2", "3", "/", "0", "+-", ".", "="];

			//Creamos la caja que contiene la calculadora
			let caja = document.createElement("div");			
			caja.setAttribute('id', 'contentCalculadora');
			caja.style.width="300px";
			caja.style.height="400px";
			caja.style.backgroundColor="#343C49";
			caja.style.padding="20px";
			document.body.appendChild(caja);

			//creamos el input
			let input = document.createElement("input");
			calculadora.input = document.getElementById('input');
			input.setAttribute('type', 'text');
			input.setAttribute('id', 'input');
			input.setAttribute('disabled', '');
			input.style.width="99%";
			input.style.height="20%";
			input.style.marginBottom="10px";
			input.style.textAlign="right";
			caja.appendChild(input);
			input.value = '0';

			//Pintamos todos los botones con este for
			for (i = 0; i < c.length; i++) {
				let btn = document.createElement("BUTTON");
				btn.style.width="21%";
				btn.style.height="50px";
				btn.style.margin="5px";
				let t = document.createTextNode(c[i]);                
				btn.appendChild(t);
				btn.addEventListener('click', calculadora.clickButtoncalculadora, false);
				caja.appendChild(btn);
			}		
		},
		//Métodos para realizar las operaciones
		sumar: (n1, n2) => {
			return n1 + n2;
		},
		restar: (n1, n2) => {
			return n1 - n2;
		},
		multiplicar: (n1, n2) => {
			return n1 * n2;
		},
		dividir: (n1, n2) => {
			return n1 / n2;
		},

		//Método para almecenar el acumulado cuando se realiza una operación
		resAcumulado: (resultado) => {

			switch (calculadora.buttonCalculPulsado) {
				case '+':
					return calculadora.sumar(parseFloat(calculadora.valorAcumulado), parseFloat( input.value));
				case '-':
					return calculadora.restar(parseFloat(calculadora.valorAcumulado), parseFloat( input.value));
				case 'x':
					return calculadora.multiplicar(parseFloat(calculadora.valorAcumulado), parseFloat( input.value));
				case '/':
					return calculadora.dividir(parseFloat(calculadora.valorAcumulado), parseFloat( input.value));
			}
		},

		
		clickButtoncalculadora: function () {
			let simbol = this.innerText;

			if (simbol==='CE') {
				input.value = '0';
				calculadora.buttonCalculPulsado = '';
				calculadora.valorAcumulado = 0;
			}
			else if (simbol==='<=') {
				let nBorrado = input.value.slice(0, input.value.length - 1);
				if (nBorrado == 0 || input.value.split('').indexOf('-') !== -1) {
					input.value = 0;
				} else {
					input.value = nBorrado;
				}
			}                    
			else if (simbol==='%') {
				if (input.value !== ''){
					input.value = parseFloat(input.value) / 100;
				}
			}
			else if (simbol==='+' || simbol==='-' || simbol==='x' || simbol==='/') {
				simOper = true;	
				
				if (input.value !== '') {
					if (calculadora.buttonCalculPulsado !== '') {
						calculadora.valorAcumulado = calculadora.resAcumulado(calculadora.input);
						calculadora.buttonCalculPulsado = simbol;
						input.value = calculadora.valorAcumulado;
					}else{
						calculadora.valorAcumulado = parseFloat(input.value);
						calculadora.buttonCalculPulsado = simbol;
						input.value = calculadora.valorAcumulado;
					}
				}
			}
			else if (simbol==='+-') {
				if (input.value !== '' && input.value !== '0') {
					let primerCaracter = input.value.slice(0, 1);
					if (primerCaracter == '-'){
						input.value = input.value.replace('-', '');
					}else{
						input.value = '-' + input.value;
					}
				}
			}
			else if (simbol==='.') {
				if(input.value.indexOf('.')<0){
					input.value +=  '.';
				}
			}
			else if (simbol==='=') {
				if (calculadora.buttonCalculPulsado !== '' && input.value.length > 0) {
					calculadora.valorAcumulado = calculadora.resAcumulado(calculadora.input);
					input.value = calculadora.valorAcumulado;
					calculadora.buttonCalculPulsado = '=';
				}else{
					calculadora.buttonCalculPulsado = '';
					input.value = calculadora.valorAcumulado;
				}
			}else {
				if (calculadora.buttonCalculPulsado != '' && simOper===true){
					input.value = simbol;					
					simOper = false;
				}else if(input.value === '0'){
					input.value = simbol;		
				}else if(calculadora.buttonCalculPulsado==='='){
					input.value = simbol;
					calculadora.buttonCalculPulsado='';
				}
				else{
					input.value += simbol;
				}
			}
		}
	};
	calculadora.domCalculadora();
}
