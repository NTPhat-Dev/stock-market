import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../app.routes';

describe('Practice routes', () => {
  it('opens the template and reactive exercises with their headings and initial form state', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/labs/3');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Bài 3');
    expect(harness.routeNativeElement?.querySelector('input[name="code"]')?.classList).toContain(
      'ng-pristine',
    );
    await harness.navigateByUrl('/labs/4');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Bài 4');
    expect(harness.routeNativeElement?.textContent).toContain('INVALID');
  });
});
