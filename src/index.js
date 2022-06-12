import tdist from "@stdlib/stats-base-dists-t";

export function cor(x, y) {
  if (!x || !y || x.length === 0 || x.length !== y.length) {
    throw "Expecting arrays with the equal length for x and y";
  }
  const n = x.length;
	const df = n - 2;
	const mx = x.reduce((a, b) => a + b, 0) / n;
	const my = y.reduce((a, b) => a + b, 0) / n;
  const dx = x.map(xe => xe - mx);
  const dy = y.map(ye => ye - my);
  const numerator = dx.map((element, i) => dx[i] * dy[i]).reduce((sum, value) => sum + value, 0);
  const dxsq = dx.map(xe => Math.pow(xe, 2)).reduce((sum, value) => sum + value, 0);
  const dysq = dy.map(ye => Math.pow(ye, 2)).reduce((sum, value) => sum + value, 0);
  const denominator = Math.sqrt(dxsq) * Math.sqrt(dysq);
  const r = numerator / denominator;
  const t = r * Math.sqrt((n - 2) / (1 - Math.pow(r, 2)));
	const p = 2 * (1 - tdist.cdf(Math.abs(t), df));
  return { r, t, df, p };
}

export function lm(x, y) {
  if (!x || !y || x.length === 0 || x.length !== y.length) {
    throw "Expecting arrays with the equal length for x and y";
  }
  const n = x.length;
  const df = n - 2;
	const mx = x.reduce((a, b) => a + b, 0) / n;
	const my = y.reduce((a, b) => a + b, 0) / n;
  const dx = x.map(xe => xe - mx);
  const dy = y.map(ye => ye - my);
  const dxsq = dx.map(xe => Math.pow(xe, 2)).reduce((sum, value) => sum + value, 0);
  const numerator = dx.map((element, i) => dx[i] * dy[i]).reduce((sum, value) => sum + value, 0);
  const slope = numerator / dxsq;
  const intercept = my - slope * mx;
  const ssr = x.map((element, i) => y[i] - (intercept + x[i] * slope)).map(e => Math.pow(e, 2)).reduce((sum, value) => sum + value, 0);
  const rse = Math.sqrt(ssr / df);
	const slope_se = rse / Math.sqrt(dxsq);
	const slope_t = slope / slope_se;
	const slope_p = 2 * (1 - tdist.cdf(Math.abs(slope_t), df));
  const xss = x.map(xe => Math.pow(xe, 2)).reduce((sum, value) => sum + value, 0);
  const intercept_se = rse / Math.sqrt(dxsq) / Math.sqrt(n) * Math.sqrt(xss);
  const intercept_t = intercept / intercept_se;
	const intercept_p = 2 * (1 - tdist.cdf(Math.abs(intercept_t), df));
  return { slope, intercept, df, rse, slope_se, slope_t, slope_p, intercept_se, intercept_t, intercept_p };
}