if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
}

const slider = document.getElementById('orderSlider');
const orderDisplay = document.getElementById('orderDisplay');
const simGMV = document.getElementById('simGMV');
const simRevenue = document.getElementById('simRevenue');
const simProfit = document.getElementById('simProfit');
const simOpEx = document.getElementById('simOpEx');
const simPayback = document.getElementById('simPayback');
const simROI = document.getElementById('simROI');

if (slider && orderDisplay && simGMV && simRevenue && simProfit && simOpEx && simPayback && simROI) {
    const aov = 158;
    const revPerOrder = 56;
    const fixedOpEx = 104000;
    const initialCapEx = 164000;

    function updateSimulation(orders) {
        orderDisplay.textContent = Number(orders).toLocaleString('en-IN') + ' Orders';

        const gmv = orders * aov;
        const revenue = orders * revPerOrder;
        const variableCost = orders * 4;
        const totalOpEx = fixedOpEx + variableCost;
        const netProfit = revenue - totalOpEx;
        const paybackMonths = (initialCapEx / Math.max(netProfit, 1)).toFixed(1);
        const roiPct = ((netProfit / initialCapEx) * 100).toFixed(1);

        simGMV.textContent = '₹' + gmv.toLocaleString('en-IN');
        simRevenue.textContent = '₹' + revenue.toLocaleString('en-IN');
        simProfit.textContent = '₹' + netProfit.toLocaleString('en-IN');
        simOpEx.textContent = '₹' + totalOpEx.toLocaleString('en-IN');

        if (netProfit > 0) {
            simPayback.textContent = paybackMonths + ' Months';
            simROI.textContent = roiPct + '% Monthly Return on CapEx';
        } else {
            simPayback.textContent = 'Scale orders to achieve profit';
            simROI.textContent = 'Negative Return';
        }
    }

    slider.addEventListener('input', (e) => {
        updateSimulation(e.target.value);
    });

    updateSimulation(slider.value);
}
