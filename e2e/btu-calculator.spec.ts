import { test, expect } from '@playwright/test';
import { CalculatorsPage } from './pages/calculators.page';

test.describe('BTU Calculator', () => {
  let btu: CalculatorsPage;
  
  test.beforeEach(async ({ page }) => {
    btu = new CalculatorsPage(page);
    await btu.gotoBTU();
  });

  test('Default values', async () => {
    await btu.expectBTUOutputs({ total: '5,900', hp: '0.74', ton: '0.49', kw: '1.73', w: '1729' });
  });

  test('Change area', async () => {
    await btu.setBTUValues({ area: '100' });
    await btu.expectBTUOutputs({ total: '44,600', hp: '5.58', ton: '3.72', kw: '13.07', w: '13072' });
  });

  test('Slider updates number', async () => {
    await btu.slider('room area (sq m)').fill(`50`);
    await expect(btu.number('room area (sq m)')).toHaveValue(`50`);
  });

  test('Complex scenario + FORMULA', async () => {
    await btu.setBTUValues({ area: '50', people: '4', windows: '3', sun: 'Medium Sun x 1.2' });
    await btu.expectBTUOutputs({ total: '31,800', hp: '3.98', ton: '2.65', kw: '9.32', w: '9320' });
    await btu.expectFormula(['50 x 430 = 21,500', 'sub = 24,500 x 1.2 = 29,400']);
  });

  test('Validation', async () => {
    await btu.number('room area (sq m)').fill(`999999`);
    await expect(btu.number('room area (sq m)')).toHaveValue(`200`);
    
    const area = btu.number('room area (sq m)');
    await area.fill(`5`); 
    await area.blur();
    await expect(area).toHaveValue(`10`);
  });
});

// Boundaries best practice: each case in its own test
test.describe('Recommendations - Boundaries', () => {
  const cases = [
    { people: '3', total: '11,400', space: 'Small office' },
    { people: '4', total: '12,000', space: 'Bedroom' },
    { people: '14', total: '18,000', space: 'Large bedroom'},
  ];

  for (const c of cases) {
    test(`${c.total} BTU → ${c.space}`, async ({ page }) => {
      const btu = new CalculatorsPage(page);
      await btu.gotoBTU();
      await btu.setBTUValues({ area: '20', people: c.people });
      await expect(btu.total).toHaveText(c.total);
      await expect(btu.activeCard).toContainText(c.space);
    });
  }
});