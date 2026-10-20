// The project list. To add a project, copy one block and edit it.
// status: "live" (repo is public, shows a link), "building" or "planned" (no link).
// Set a project to "building" until its repo is actually public, so the site
// never links to a page that does not exist.
// RULE: everything after the "=" must stay valid JSON (see translations.js).
window.PROJECTS = [
  {
    "repo": "whatsapp-order-parser",
    "status": "live",
    "stack": "Python, regex, openpyxl, pytest",
    "summary": {
      "en": "Reads an exported WhatsApp sales-group chat in Portuguese and produces an Excel buy list: what to buy, how many, for which customer. Replaced copying orders by hand, and flags the matches it is unsure about instead of guessing.",
      "pt": "Lê a conversa exportada de um grupo de vendas no WhatsApp e gera uma lista de compras em Excel: o que comprar, quantos e para qual cliente. Substituiu a cópia manual dos pedidos, e marca para revisão o que não tem certeza em vez de chutar.",
      "es": "Lee el chat exportado de un grupo de ventas de WhatsApp en portugués y genera una lista de compras en Excel: qué comprar, cuántos y para qué cliente. Reemplazó la copia manual de pedidos, y marca para revisión lo que no tiene claro en lugar de adivinar."
    }
  },
  {
    "repo": "luggage-packing-optimizer",
    "status": "live",
    "stack": "Python, dynamic programming, pytest",
    "summary": {
      "en": "Chooses which products go in which suitcase to maximize profit on a buying trip, packs pre-sold items first, and says when an extra bag costs more than it earns. Solves the knapsack problem and is verified against brute force.",
      "pt": "Escolhe quais produtos vão em cada mala para maximizar o lucro de uma viagem de compras, coloca primeiro os itens já vendidos e avisa quando uma mala extra custa mais do que rende. Resolve o problema da mochila e é verificado contra força bruta.",
      "es": "Elige qué productos van en cada maleta para maximizar la ganancia de un viaje de compras, empaca primero lo ya vendido y avisa cuando una maleta extra cuesta más de lo que rinde. Resuelve el problema de la mochila y se verifica contra fuerza bruta."
    }
  },
  {
    "repo": "cambio-alert-bot",
    "status": "live",
    "stack": "Python, REST API, GitHub Actions, Discord, Telegram",
    "summary": {
      "en": "Watches USD, JPY, EUR, CNY and HKD against the Brazilian real and sends an alert when a rate reaches a buying target. Runs by itself every weekday on GitHub Actions, with secrets kept out of the code.",
      "pt": "Acompanha USD, JPY, EUR, CNY e HKD em relação ao real e envia um alerta quando a cotação chega ao alvo de compra. Roda sozinho todo dia útil no GitHub Actions, com os segredos fora do código.",
      "es": "Vigila USD, JPY, EUR, CNY y HKD frente al real brasileño y envía una alerta cuando el tipo de cambio llega al objetivo de compra. Se ejecuta solo cada día hábil en GitHub Actions, con los secretos fuera del código."
    }
  },
  {
    "repo": "landed-cost-calculator",
    "status": "live",
    "stack": "Python, argparse, pytest, CI",
    "summary": {
      "en": "Command-line tool that works out what an imported product really costs once it reaches Brazil (store price, freight per kg, partner commission, tax) and the sale price needed for a target margin.",
      "pt": "Ferramenta de linha de comando que calcula quanto um produto importado realmente custa ao chegar ao Brasil (preço na loja, frete por kg, comissão, imposto) e o preço de venda necessário para a margem desejada.",
      "es": "Herramienta de línea de comandos que calcula cuánto cuesta realmente un producto importado al llegar a Brasil (precio en tienda, flete por kg, comisión, impuesto) y el precio de venta necesario para el margen deseado."
    }
  },
  {
    "repo": "esp32-warehouse-monitor",
    "status": "planned",
    "stack": "C++, ESP32, sensors",
    "summary": {
      "en": "Temperature and humidity monitor with a web dashboard and alerts, for a warehouse that stores cosmetics and snacks in a hot climate.",
      "pt": "Monitor de temperatura e umidade com painel web e alertas, para um depósito que guarda cosméticos e snacks em clima quente.",
      "es": "Monitor de temperatura y humedad con panel web y alertas, para un almacén que guarda cosméticos y snacks en clima cálido."
    }
  }
];
