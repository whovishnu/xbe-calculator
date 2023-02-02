import "./styles.css";
import { useEffect, useState } from "react";
export default function App() {
  const [step, setStep] = useState(1);
  const [milesHour, setMilesHour] = useState(0);
  const [milesGallon, setMilesGollon] = useState(0);
  const [gallonPerHour, setGallonPerHour] = useState(0);
  const [basicPricePerHour, setBasicPricePerHour] = useState(0);
  const [zeroInterceptCostPerGallon, setzeroInterceptCostPerGallon] = useState(
    0
  );
  const [zeroInterceptRatio, setzeroInterceptRatio] = useState(0);
  const [
    zeroInterceptDollarsPerHour,
    setzeroInterceptDollarsPerHour
  ] = useState(0);
  const [hours, setHours] = useState(0);
  const [Gallons, setGallons] = useState(0);
  const [costPerGallons, setCostPerGallons] = useState(0);
  const [baseRevenue, setBaseRevenues] = useState(0);
  const [adjustmentPercentage, setAdjustmentPercentage] = useState(0);
  const [adjustment, setAdjustment] = useState(0);

  useEffect(() => {
    if (milesHour > 0 && milesGallon > 0) {
      setGallonPerHour((milesHour / milesGallon).toFixed(2));
    } else {
      setGallonPerHour(0);
    }
  }, [milesGallon, milesHour]);

  useEffect(() => {
    if (zeroInterceptCostPerGallon > 0) {
      setzeroInterceptDollarsPerHour(
        (zeroInterceptCostPerGallon * gallonPerHour).toFixed(2)
      );
    } else {
      setzeroInterceptDollarsPerHour(0);
    }
  }, [zeroInterceptCostPerGallon, gallonPerHour]);

  useEffect(() => {
    if (hours) {
      setGallons(parseInt((hours * milesHour) / milesGallon));
      setBaseRevenues(hours * basicPricePerHour);
    }
  }, [hours, milesHour, milesGallon, basicPricePerHour]);

  useEffect(() => {
    if (costPerGallons) {
      setAdjustmentPercentage(
        (costPerGallons / zeroInterceptCostPerGallon - 1) * zeroInterceptRatio
      );
    }
  }, [costPerGallons, zeroInterceptCostPerGallon, zeroInterceptRatio]);

  useEffect(() => {
    if (adjustmentPercentage) {
      setAdjustment(((adjustmentPercentage * baseRevenue) / 100).toFixed(2));
    }
  }, [adjustmentPercentage]);

  return (
    <div className="App">
      <h1>XBE Calculator</h1>
      <div className="container">
        <div className="steps">
          <div
            onClick={() => setStep(1)}
            className={`stepBtn ${step === 1 ? "selected" : ""}`}
          >
            Step 1
          </div>
          <div
            onClick={() => setStep(2)}
            className={`stepBtn ${step === 2 ? "selected" : ""}`}
          >
            Step 2
          </div>
          <div
            onClick={() => setStep(3)}
            className={`stepBtn ${step === 3 ? "selected" : ""}`}
          >
            Step 3
          </div>
          <div
            onClick={() => setStep(4)}
            className={`stepBtn ${step === 4 ? "selected" : ""}`}
          >
            Result
          </div>
        </div>

        <div className={`inputs ${step === 1 ? "" : "hide"}`} id="step1">
          <label>Miles per Hour</label>
          <input onChange={(e) => setMilesHour(e.target.value)} type="number" />
          <label>Miles per Gallon</label>
          <input
            onChange={(e) => setMilesGollon(e.target.value)}
            type="number"
          />
          <label>Gallons Per Hour</label>
          <input disabled type="text" value={gallonPerHour} />
          <label>Base Price Per Hour (in $)</label>
          <input
            onChange={(e) => setBasicPricePerHour(e.target.value)}
            type="number"
          />
        </div>

        <div className={`inputs ${step === 2 ? "" : "hide"}`} id="step2">
          <label>Zero-Intercept Cost Per Gallon (in $)</label>
          <input
            onChange={(e) => setzeroInterceptCostPerGallon(e.target.value)}
            type="text"
          />
          <label>Zero-Intercept Ratio (in %)</label>
          <input
            onChange={(e) => setzeroInterceptRatio(e.target.value)}
            type="text"
          />
          <label>Zero-Intercept Dollars Per Hour (in $)</label>
          <input
            disabled
            type="text"
            value={zeroInterceptDollarsPerHour + " $"}
          />
          {/* Implied	Over-Recovery % of Adjustment
	
  11.22%	40.94% */}
          <label>Implied</label>
          <input
            disabled
            type="text"
            value={(
              (zeroInterceptDollarsPerHour / basicPricePerHour) *
              100
            ).toFixed(2)}
          />
          <label>Over-Recovery % of Adjustment</label>
          <input
            disabled
            type="text"
            value={(
              (1 -
                ((zeroInterceptDollarsPerHour / basicPricePerHour) * 100) /
                  zeroInterceptRatio) *
              100
            ).toFixed(2)}
          />
        </div>

        <div className={`inputs ${step === 3 ? "" : "hide"}`} id="step3">
          <label>Hours</label>
          <input onChange={(e) => setHours(e.target.value)} type="text" />
          <label>Gallons</label>
          <input disabled value={Gallons} type="text" />
          <label>Cost Per Gallon</label>
          <input
            onChange={(e) => setCostPerGallons(e.target.value)}
            type="text"
          />
        </div>

        <div className={`inputs ${step === 4 ? "" : "hide"}`} id="step4">
          <label>Base Revenue</label>
          <input value={baseRevenue} disabled type="text" />
          <label>Adjustment %</label>
          <input
            value={adjustmentPercentage?.toFixed(2)}
            disabled
            type="text"
          />
          <label>Adjustment</label>
          <input value={adjustment} disabled type="text" />
          <label>Total Revenue</label>
          <input
            value={parseInt(adjustment) + baseRevenue}
            disabled
            type="text"
          />
          <label>Cost Change</label>
          <input
            value={(
              (costPerGallons - zeroInterceptCostPerGallon) *
              Gallons
            )?.toFixed(2)}
            disabled
            type="text"
          />
          <label>Over-Recovery</label>
          <input
            value={(
              parseInt(adjustment) -
              (costPerGallons - zeroInterceptCostPerGallon) * Gallons
            )?.toFixed(2)}
            disabled
            type="text"
          />
          <label>Over-Recovery % of Revenue</label>
          <input
            value={(
              ((
                parseInt(adjustment) -
                (costPerGallons - zeroInterceptCostPerGallon) * Gallons
              )?.toFixed(2) /
                (parseInt(adjustment) + baseRevenue)) *
              100
            )?.toFixed(2)}
            disabled
            type="text"
          />
        </div>

        {step !== 4 ? (
          <div className="bottom">
            <button onClick={() => setStep(step + 1)}>Next</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
