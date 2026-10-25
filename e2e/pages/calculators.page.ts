import { expect, Page } from '@playwright/test';

export class CalculatorsPage {
  constructor(private page: Page) {}

  // helper methods
  number = (label: string) => this.page.getByRole('spinbutton', { name: label });
  slider = (label: string) => this.page.getByRole('slider', { name: label });
  formula = this.page.getByTestId('formula-panel');
  
  // formula test helper
  async expectFormula(texts: string[]) {
    for (const t of texts) await expect(this.formula).toContainText(t);
  }

  // ========== BTU ==========
  // selectors
  total = this.page.getByTestId('total-btu');
  activeCard = this.page.getByTestId('recommended-space');

  // navigation
  gotoBTU = async () => {
    await this.page.goto('/BTUCalculator', { waitUntil: 'networkidle' });
  }

  // set values
  async setBTUValues(o: { area?: string; people?: string; windows?: string; sun?: string }) {
    if (o.area) await this.number('room area (sq m)').fill(o.area);
    if (o.people) await this.number('people').fill(o.people);
    if (o.windows) await this.number('windows').fill(o.windows);
    if (o.sun) await this.page.getByText(o.sun).click();
  }

  // expect outputs
  async expectBTUOutputs(o: { total: string; hp: string; ton: string; kw: string; w: string }) {
    await expect(this.total).toHaveText(o.total);
    await expect(this.page.getByTestId('hp')).toHaveText(`${o.hp} hp`);
    await expect(this.page.getByTestId('ton')).toHaveText(`${o.ton} Ton`);
    await expect(this.page.getByTestId('kw & w')).toHaveText(`${o.kw} kw ${o.w} w`);
  }
  
  // ========== Duct ==========
  // selectors
  statusCard = this.page.getByTestId('status-card');
  recRows = this.page.getByTestId('rectangular-size-item');
  
  // navigation
  gotoDuct = async () => {
    await this.page.goto('/DuctSizer', { waitUntil: 'networkidle' });
  }

  // set values
  async setDuctValues(o: { cfm?: string; fpm?: string }) {
    if (o.cfm) await this.number('AIRFLOW (CFM)').fill(o.cfm);
    if (o.fpm) await this.number('Velocity (FPM)').fill(o.fpm);
  }

  // expect outputs
  async expectDuctOutputs(o: { diameter: string; ductAreaIn2: string, status: string}) {
    await expect(this.page.getByTestId('equivalent-diameter')).toHaveText(o.diameter);
    await expect(this.page.getByTestId('duct-area')).toHaveText(`${o.ductAreaIn2} in2`);
    await expect(this.statusCard).toContainText(o.status);
  }
}
