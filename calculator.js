
/*
 * UK EV Charging and Electricity Tariff Calculator
 * Educational example for Home Running Costs
 *
 * https://homerunningcosts.com/
 */

// Calculate the cost of charging an electric vehicle
function calculateEVChargingCost(
  batteryKWh,
  startPercent,
  endPercent,
  chargingLossPercent,
  pricePencePerKWh
) {
  if (
    batteryKWh <= 0 ||
    startPercent < 0 ||
    endPercent > 100 ||
    endPercent <= startPercent ||
    chargingLossPercent < 0 ||
    chargingLossPercent >= 100 ||
    pricePencePerKWh < 0 ||
    ![batteryKWh, startPercent, endPercent,
      chargingLossPercent, pricePencePerKWh]
      .every(Number.isFinite)
  ) {
    throw new Error("Please enter valid charging values.");
  }

  const energyAdded =
    batteryKWh * (endPercent - startPercent) / 100;

  const energyFromGrid =
    energyAdded / (1 - chargingLossPercent / 100);

  const totalCost =
    energyFromGrid * pricePencePerKWh / 100;

  return {
    energyKWh: Number(energyFromGrid.toFixed(2)),
    costGBP: Number(totalCost.toFixed(2))
  };
}

// Example: 60 kWh battery, 20% to 80% charge
const evExample = calculateEVChargingCost(
  60, 20, 80, 10, 30
);

console.log("EV Charging Example:");
console.log(evExample);
// Expected: { energyKWh: 40, costGBP: 12 }


// Compare Economy 7 with a standard tariff
function compareElectricityTariffs(
  annualKWh,
  nightUsagePercent,
  dayRatePence,
  nightRatePence,
  standardRatePence
) {
  if (
    ![annualKWh, nightUsagePercent, dayRatePence,
      nightRatePence, standardRatePence]
      .every(Number.isFinite) ||
    annualKWh < 0 ||
    nightUsagePercent < 0 ||
    nightUsagePercent > 100 ||
    dayRatePence < 0 ||
    nightRatePence < 0 ||
    standardRatePence < 0
  ) {
    throw new Error("Please enter valid tariff values.");
  }

  const nightKWh =
    annualKWh * nightUsagePercent / 100;

  const dayKWh = annualKWh - nightKWh;

  const economy7Cost =
    (dayKWh * dayRatePence +
      nightKWh * nightRatePence) / 100;

  const standardCost =
    annualKWh * standardRatePence / 100;

  return {
    economy7GBP: Number(economy7Cost.toFixed(2)),
    standardGBP: Number(standardCost.toFixed(2)),
    differenceGBP: Number(
      (economy7Cost - standardCost).toFixed(2)
    )
  };
}

// Example: 3,400 kWh annual usage, 20% at night
const tariffExample = compareElectricityTariffs(
  3400, 20, 30, 16, 26
);

console.log("Electricity Tariff Comparison:");
console.log(tariffExample);
// Expected:
// economy7GBP: 924.80
// standardGBP: 884.00
// differenceGBP: 40.80

// Note: Standing charges are excluded from
// the tariff comparison above.
