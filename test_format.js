import { formatNumber, formatCurrency } from './src/services/formatService.js';

function runTests() {
    console.log("Iniciando testes de formatação...\n");

    const tests = [
        {
            name: "Formata número simples (10.5)",
            value: 10.5,
            expected: "10,50",
            fn: formatNumber
        },
        {
            name: "Formata número inteiro (100)",
            value: 100,
            expected: "100,00",
            fn: formatNumber
        },
        {
            name: "Formata número com milhar (1234.56)",
            value: 1234.56,
            expected: "1.234,56",
            fn: formatNumber
        },
        {
            name: "Formata moeda (10.5)",
            value: 10.5,
            expected: "10,50",
            fn: formatCurrency
        },
        {
            name: "Trata valor não numérico",
            value: "abc",
            expected: "0,00",
            fn: formatNumber
        }
    ];

    let passedCount = 0;

    tests.forEach((test, index) => {
        const result = test.fn(test.value);
        const passed = result === test.expected;
        
        if (passed) {
            console.log(`✅ [Teste ${index + 1}] ${test.name}: Passou! (Resultado: ${result})`);
            passedCount++;
        } else {
            console.log(`❌ [Teste ${index + 1}] ${test.name}: Falhou! (Esperado: ${test.expected}, Recebido: ${result})`);
        }
    });

    console.log(`\nResumo: ${passedCount}/${tests.length} testes passaram.`);

    if (passedCount === tests.length) {
        console.log("\n✨ Todos os testes de formatação foram concluídos com sucesso!");
    } else {
        process.exit(1);
    }
}

runTests();
