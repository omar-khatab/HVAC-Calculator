import { test, expect } from '@playwright/test';
import { CalculatorsPage } from './pages/calculators.page';


test.describe('Duct Sizer', () => {
  let duct: CalculatorsPage;

  test.beforeEach(async ({ page }) => {
    duct = new CalculatorsPage(page);
    await duct.gotoDuct();
  });

  test('Default values', async () => {
    await duct.expectDuctOutputs({ diameter: '9.0"/ 229 mm', ductAreaIn2: '64', status: 'Low velocity' });
  });

  test('Change CFM', async () => {
    await duct.setDuctValues({ cfm: '900' });
    await duct.expectDuctOutputs({ diameter: '13.5"/ 344 mm', ductAreaIn2: '144', status: 'Low velocity' });
  });

  test('Change Velocity from slider', async () => {
    await duct.slider('Velocity (FPM)').fill(`1000`);
    await expect(duct.number('Velocity (FPM)')).toHaveValue(`1000`);
  });

  test('Complex scenario', async () => {
    await duct.setDuctValues({ cfm: '900', fpm: '1000' });
    await duct.expectDuctOutputs({ diameter: '12.8"/ 326 mm', ductAreaIn2: '130', status: 'Medium velocity' });
    await duct.expectFormula(['900 / 1000 = 0.90 ft²', '= 129.6 in² • 836.13 cm²']);
  });

  test.describe('Status based on velocity', () => {
    const cases: [string, string, string][] = [
      ['900', 'Low velocity', 'Medium velocity'],
      ['950', 'Medium velocity', 'Low velocity'],
      ['1500', 'High velocity', 'Medium velocity'],
    ];
    for (const [fpm, shown, hidden] of cases) {
      test(`${fpm} FPM → ${shown}`, async () => {
        await duct.number('Velocity (FPM)').fill(fpm);
        await expect(duct.statusCard).toContainText(shown);
        await expect(duct.statusCard).not.toContainText(hidden);
      });
    }
  });

  test('validation', async () => {
    await duct.number('CFM').fill(`999999`);
    await expect(duct.number('CFM')).toHaveValue(`10000`);
    await duct.number('fpm').fill(`999999`);
    await expect(duct.number('fpm')).toHaveValue(`3000`);
    await duct.number('CFM').fill(`5`);
    await duct.number('CFM').blur();
    await expect(duct.number('CFM')).toHaveValue(`100`);
    await duct.number('fpm').fill(`5`);
    await duct.number('fpm').blur();
    await expect(duct.number('fpm')).toHaveValue(`100`);
  });

  test.describe('Suggested Rectangular Sizes', () => {
    test('Default: 2 rows', async () => {
      await expect(duct.recRows).toHaveCount(2);
      await expect(duct.recRows.nth(0)).toContainText('8" x 8" / 203 mm x 203 mm');
    });
    
    test('Change values to see difference', async () => {
      await duct.setDuctValues({ cfm: '1000', fpm: '700' });
      await expect(duct.recRows).toHaveCount(4);
      await expect(duct.recRows.nth(0)).toContainText('14" x 14" / 356 mm x 356 mm');
      await expect(duct.recRows.nth(0)).toContainText('196 in2 - Ratio 1:1 • Closest to square');
    });
  });
});