const STOCKS = [
    { sym: 'NBIS', tv: 'NASDAQ:NBIS', name: 'Nebius Group' },
    { sym: 'CIFR', tv: 'NASDAQ:CIFR', name: 'Cipher Mining' },
    { sym: 'CORZ', tv: 'NASDAQ:CORZ', name: 'Core Scientific' },
    { sym: 'IREN', tv: 'NASDAQ:IREN', name: 'Iris Energy' },
    { sym: 'SLNH', tv: 'NASDAQ:SLNH', name: 'Soluna Holdings' },
    { sym: 'WULF', tv: 'NASDAQ:WULF', name: 'TeraWulf Inc.' },
    { sym: 'GOOGL', tv: 'NASDAQ:GOOGL', name: 'Alphabet Inc.' },
    { sym: 'AMZN', tv: 'NASDAQ:AMZN', name: 'Amazon.com' },
    { sym: 'RDW', tv: 'NYSE:RDW', name: 'Redwire Corp' },
    { sym: 'RGTI', tv: 'NASDAQ:RGTI', name: 'Rigetti Computing' },
    { sym: 'KOR', tv: 'EURONEXT:KOR', name: 'Amundi Korea' }
];

let marketData = [];
let sortDirection = -1; // -1 for Descending (Pos to Neg)
let activeSymbol = 'IREN';

// 1. DATA SCRAPER ENGINE
async function refreshData() {
    const symbols = STOCKS.map(s => s.sym).join(',');
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`;
    
    // Using AllOrigins as the data bridge (Reliable for GitHub)
    try {
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
        const json = await response.json();
        const data = JSON.parse(json.contents).quoteResponse.result;

        marketData = data.map(item => ({
            sym: item.symbol,
            price: item.regularMarketPrice,
            pct: item.regularMarketChangePercent,
            high: item.regularMarketDayHigh,
            low: item.regularMarketDayLow,
            name: STOCKS.find(s => s.sym === item.symbol).name
        }));

        document.getElementById('nodeStatus').classList.add('active');
        document.getElementById('nodeLabel').innerText = "Global Node: Connected";
        
        updateTable();
    } catch (err) {
        document.getElementById('nodeStatus').classList.add('error');
        document.getElementById('nodeLabel').innerText = "Global Node: Link Error";
    }
}

// 2. INTERACTIVE TABLE LOGIC
function updateTable() {
    const container = document.getElementById('tableBody');
    container.innerHTML = '';

    // Automatically sort based on percentage
    marketData.sort((a, b) => (a.pct > b.pct ? 1 : -1) * sortDirection);

    marketData.forEach(stock => {
        const isPos = stock.pct >= 0;
        const color = isPos ? 'text-[#089981]' : 'text-[#f23645]';
        
        // Calculate Bar Percentage (Relative position between High and Low)
        const range = stock.high - stock.low;
        const currentPos = ((stock.price - stock.low) / range) * 100;

        const row = document.createElement('div');
        row.className = `stock-row grid grid-cols-4 px-6 py-4 items-center border-b border-[#2a2e39] ${stock.sym === activeSymbol ? 'active' : ''}`;
        row.onclick = () => selectStock(stock.sym);

        row.innerHTML = `
            <div class="flex flex-col">
                <span class="font-bold text-white text-sm">${stock.sym}</span>
                <span class="text-[9px] text-gray-500 uppercase tracking-tighter">${stock.name}</span>
            </div>
            <div class="text-right mono text-xs text-white">$${stock.price.toFixed(2)}</div>
            <div class="text-right mono text-xs font-bold ${color}">${isPos ? '+' : ''}${stock.pct.toFixed(2)}%</div>
            <div class="perf-bar-bg">
                <div class="perf-bar-fill ${isPos ? 'bg-green-500' : 'bg-red-500'}" style="width: ${Math.max(currentPos, 5)}%"></div>
            </div>
        `;
        container.appendChild(row);
    });
}

// 3. SELECTION & CHARTING
function selectStock(sym) {
    activeSymbol = sym;
    const stock = marketData.find(d => d.sym === sym);
    const config = STOCKS.find(s => s.sym === sym);

    document.getElementById('activeSym').innerText = sym;
    document.getElementById('activeName').innerText = stock.name;
    document.getElementById('activePrice').innerText = `$${stock.price.toFixed(2)}`;
    document.getElementById('activePct').innerText = `${stock.pct >= 0 ? '+' : ''}${stock.pct.toFixed(2)}%`;
    document.getElementById('activePct').className = `text-sm font-bold ${stock.pct >= 0 ? 'text-green-500' : 'text-red-500'}`;

    // Re-render table to update active highlight
    updateTable();

    // Inject TradingView Node
    document.getElementById('chartContainer').innerHTML = '';
    new TradingView.widget({
        "autosize": true,
        "symbol": config.tv,
        "interval": "D",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "container_id": "chartContainer",
        "backgroundColor": "#131722",
        "gridColor": "rgba(42, 46, 57, 0.5)"
    });
}

function sortData(key) {
    sortDirection *= -1;
    updateTable();
}

// 4. MARKET CLOCKS
function updateClocks() {
    const now = new Date();
    document.getElementById('localTime').innerText = now.toLocaleTimeString();

    const est = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
    const hours = est.getHours();
    const mins = est.getMinutes();

    const label = document.getElementById('marketLabel');
    const clock = document.getElementById('marketClock');

    if (hours >= 9 && (hours > 9 || mins >= 30) && hours < 16) {
        label.innerText = "US Market: OPEN";
        clock.innerText = "LIVE";
        clock.className = "mono text-lg font-bold text-green-500";
    } else {
        label.innerText = "US Market: CLOSED";
        clock.innerText = "OFF-HOURS";
        clock.className = "mono text-lg font-bold text-red-500";
    }
}

// STARTUP
setInterval(refreshData, 15000); // Refresh every 15 seconds
setInterval(updateClocks, 1000);
refreshData();
updateClocks();
// Initialize chart with IREN after data loads
setTimeout(() => selectStock('IREN'), 2000);